import { config } from './config';
import { VpcStack } from './vpc';
import { DatabaseStack } from './database';
import { ApiStack } from './api';
import { FrontendStack } from './frontend';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

export class KaizenStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpcStack = new VpcStack(this, config.VPC_STACK_ID, {
      ...props,
      stackName: config.VPC_STACK_ID
    });

    new FrontendStack(this, config.FRONTEND_STACK_ID, {
      ...props,
      stackName: config.FRONTEND_STACK_ID
    });

    const databaseStack = new DatabaseStack(this, config.DATABASE_STACK_ID, {
      ...props,
      stackName: config.DATABASE_STACK_ID,
      vpc: vpcStack.vpc
    });

    new ApiStack(this, config.API_STACK_ID, {
      ...props,
      stackName: config.API_STACK_ID,
      vpc: vpcStack.vpc,
      databaseSecret: databaseStack.secret
    });

    // Allow the API to connect to the database
    // const databaseSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
    //   this,
    //   config.DATABASE_SECURITY_GROUP_ID,
    //   databaseStack.securityGroup.securityGroupId
    // );
    // const apiSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
    //   this,
    //   config.API_SECURITY_GROUP_ID,
    //   apiStack.securityGroup.securityGroupId
    // );
    // databaseSecurityGroup.addIngressRule(
    //   apiSecurityGroup,
    //   ec2.Port.tcp(config.DATABASE_PORT),
    //   'Allow postgres from API'
    // );
  }
}
