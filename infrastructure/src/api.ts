import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { config } from './config';
import { environment } from '../../apps/api/src/env/environment';

export interface ApiStackProps {
  vpc: ec2.Vpc;
  apiSecurityGroup: ec2.SecurityGroup;
  databaseSecret: secretsmanager.ISecret;
}

export class ApiStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    { vpc, apiSecurityGroup, databaseSecret }: ApiStackProps
  ) {
    super(scope, id);

    // Retreive the ECR repository
    const repository = ecr.Repository.fromRepositoryName(
      this,
      config.ECR_REPOSITORY_ID,
      config.ECR_REPOSITORY_ID
    );

    // Create an ECS cluster in the VPC
    const cluster = new ecs.Cluster(this, config.API_CLUSTER_ID, {
      vpc: vpc
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
      resources: [databaseSecret.secretArn]
    });
    taskDefinition.addToTaskRolePolicy(secretAccessPolicyStatement);

    // Create the task definition
    taskDefinition.addContainer(config.API_CONTAINER_ID, {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      environment: environment as unknown as { [key: string]: string },
      portMappings: [
        {
          containerPort: 3001
        }
      ],
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
        subnets: vpc.publicSubnets
      },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2()
    });
    cluster.connections.addSecurityGroup(apiSecurityGroup);

    // Create a fargate service
    const fargateService = new ecs.FargateService(this, config.API_SERVICE_ID, {
      cluster,
      taskDefinition,
      assignPublicIp: true
    });

    // Create an application load balancer
    const loadBalancer = new elbv2.ApplicationLoadBalancer(
      this,
      config.API_LOAD_BALANCER_ID,
      {
        vpc: vpc,
        internetFacing: true
      }
    );

    // Create a target group for the load balancer
    const targetGroup = new elbv2.ApplicationTargetGroup(
      this,
      config.API_TARGET_GROUP_ID,
      {
        vpc: vpc,
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

    // Create a listener for the load balancer
    loadBalancer.addListener(config.API_LISTENER_ID, {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      defaultTargetGroups: [targetGroup]
    });

    // Output the DNS name of the load balancer
    new cdk.CfnOutput(this, config.API_LOAD_BALANCER_DNS_ID, {
      value: loadBalancer.loadBalancerDnsName
    });
  }
}
