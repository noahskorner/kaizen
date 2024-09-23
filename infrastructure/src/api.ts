import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Environment } from '../../apps/api/src/env/environment.interface';
import { Construct } from 'constructs';
import { config } from './config';

export interface ApiStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  databaseSecret: secretsmanager.ISecret;
}

export class ApiStack extends cdk.Stack {
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // Retreive the ECR repository
    const repository = ecr.Repository.fromRepositoryName(
      this,
      config.ECR_REPOSITORY_ID,
      config.ECR_REPOSITORY_ID
    );

    // Create an ECS cluster in the VPC
    const cluster = new ecs.Cluster(this, config.API_CLUSTER_ID, {
      vpc: props.vpc
    });

    // Create a log group
    const logGroup = new logs.LogGroup(this, config.API_LOG_GROUP_ID, {
      logGroupName: config.API_LOG_GROUP_ID,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // Create a task definition with the container
    const taskDefinition = new ecs.FargateTaskDefinition(
      this,
      config.API_TASK_DEFINITION_ID,
      {
        memoryLimitMiB: 512,
        cpu: 256
      }
    );

    // Allow the task to access the database secret
    const secretAccessPolicyStatement = new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [props.databaseSecret.secretArn]
    });
    taskDefinition.addToTaskRolePolicy(secretAccessPolicyStatement);

    // Create the task definition
    const environment: Environment = {
      NODE_ENV:
        (process.env.NODE_ENV as Environment['NODE_ENV']) ??
        ('DEVELOPMENT' as Environment['NODE_ENV']),
      DATABASE_URL: process.env.DATABASE_URL ?? '',
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? '',
      ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION ?? '',
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? '',
      REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION ?? '',
      REFRESH_TOKEN_COOKIE_DOMAIN:
        process.env.REFRESH_TOKEN_COOKIE_DOMAIN ?? '',
      UPDATE_EMAIL_SECRET: process.env.UPDATE_EMAIL_SECRET ?? '',
      UPDATE_EMAIL_EXPIRATION: process.env.UPDATE_EMAIL_EXPIRATION ?? '',
      API_PORT: process.env.API_PORT ?? '',
      API_DOMAIN: process.env.API_DOMAIN ?? '',
      FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN ?? '',
      PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID ?? '',
      PLAID_SECRET: process.env.PLAID_SECRET ?? '',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? '',
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
      AWS_REGION: process.env.AWS_REGION ?? '',
      AWS_DATABASE_SECRET_ID: process.env.AWS_DATABASE_SECRET_ID ?? '',
      FORGOT_PASSWORD_SECRET: process.env.FORGOT_PASSWORD_SECRET ?? '',
      FORGOT_PASSWORD_EXPIRATION: process.env.FORGOT_PASSWORD_EXPIRATION ?? '',
      OPEN_EXCHANGE_RATE_APP_ID: process.env.OPEN_EXCHANGE_RATE_APP_ID ?? ''
    };
    taskDefinition.addContainer(config.API_CONTAINER_ID, {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      portMappings: [
        {
          containerPort: 3001
        }
      ],
      environment: environment as unknown as { [key: string]: string },
      logging: ecs.LogDrivers.awsLogs({
        logGroup: logGroup,
        streamPrefix: config.API_LOG_GROUP_ID
      })
    });

    // Create a t3.micro ec2 instance and add it to the cluster
    cluster.addCapacity(config.API_SCALING_GROUP_CAPACITY_ID, {
      vpcSubnets: {
        // TODO: Making this public to save on NAT Gateway costs
        // subnets: vpc.privateSubnets
        subnets: props.vpc.publicSubnets
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2()
    });

    // Create a fargate service
    this.securityGroup = new ec2.SecurityGroup(
      this,
      config.API_SECURITY_GROUP_ID,
      { vpc: props.vpc }
    );
    this.securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(3001),
      'Load balancer to target'
    );
    const fargateService = new ecs.FargateService(this, config.API_SERVICE_ID, {
      cluster,
      taskDefinition,
      assignPublicIp: true
    });
    fargateService.connections.addSecurityGroup(this.securityGroup);

    // Create an application load balancer
    const loadBalancer = new elbv2.ApplicationLoadBalancer(
      this,
      config.API_LOAD_BALANCER_ID,
      {
        vpc: props.vpc,
        internetFacing: true
      }
    );

    // Create a target group for the load balancer
    const targetGroup = new elbv2.ApplicationTargetGroup(
      this,
      config.API_TARGET_GROUP_ID,
      {
        vpc: props.vpc,
        port: 80,
        targetType: elbv2.TargetType.IP,
        protocol: elbv2.ApplicationProtocol.HTTP,
        healthCheck: {
          path: '/',
          interval: cdk.Duration.seconds(30),
          timeout: cdk.Duration.seconds(5),
          healthyThresholdCount: 2,
          unhealthyThresholdCount: 2
        }
      }
    );

    // Associate the target group with the Fargate service
    targetGroup.addTarget(fargateService);

    // Get the certificate from ACM
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      config.CERTIFICATE_ID,
      process.env.AWS_CERTIFICATE_ARN_US_EAST_2 ?? ''
    );

    // Create a listener for HTTPS (port 443)
    loadBalancer.addListener(config.API_HTTPS_LISTENER_ID, {
      port: 443,
      protocol: elbv2.ApplicationProtocol.HTTPS,
      certificates: [certificate],
      defaultTargetGroups: [targetGroup]
    });

    // Create a listener for HTTP (port 80) to redirect to HTTPS
    loadBalancer.addListener(config.API_HTTP_LISTENER_ID, {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      defaultAction: elbv2.ListenerAction.redirect({
        protocol: 'HTTPS',
        port: '443',
        permanent: true
      })
    });

    // Create a Route 53 hosted zone
    const hostedZone = route53.HostedZone.fromLookup(
      this,
      config.HOSTED_ZONE_ID,
      {
        domainName: config.DOMAIN
      }
    );

    // Create an alias record for the load balancer
    new route53.ARecord(this, config.API_A_RECORD_ID, {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new targets.LoadBalancerTarget(loadBalancer)
      ),
      recordName: config.API_SUBDOMAIN
    });
  }
}
