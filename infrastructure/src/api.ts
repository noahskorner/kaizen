import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';
import { config } from './config';
import { environment } from '../../apps/api/src/env/environment';

export interface ApiStackProps {
  vpc: ec2.Vpc;
  databaseSecurityGroup: ec2.SecurityGroup;
}

export class ApiStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    { vpc, databaseSecurityGroup }: ApiStackProps
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

    // Create a task definition with the container
    const taskDefinition = new ecs.Ec2TaskDefinition(
      this,
      config.API_TASK_DEFINITION_ID
    );
    taskDefinition.addContainer(config.API_CONTAINER_ID, {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      memoryLimitMiB: 512,
      environment: environment,
      portMappings: [
        {
          containerPort: 3000
        }
      ]
    });

    // Create a security group for the EC2 instance
    const apiSecurityGroup = new ec2.SecurityGroup(
      this,
      config.API_SECURITY_GROUP_ID,
      { vpc: vpc }
    );
    apiSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
    apiSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));

    // Create a t3.micro EC2 instance and add it to the cluster
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
    cluster.connections.addSecurityGroup(databaseSecurityGroup);

    // Start the task on the instance
    const ec2Service = new ecs.Ec2Service(this, config.API_SERVICE_ID, {
      cluster,
      taskDefinition
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
        targetType: elbv2.TargetType.INSTANCE,
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

    // Associate the target group with the EC2 service
    targetGroup.addTarget(ec2Service);

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
