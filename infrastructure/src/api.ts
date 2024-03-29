import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import { config } from './config';
import { serverEnvironment } from '@kaizen/env-server';

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
      environment: serverEnvironment
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
    new ecs.Ec2Service(this, config.API_SERVICE_ID, {
      cluster,
      taskDefinition
    });
  }
}
