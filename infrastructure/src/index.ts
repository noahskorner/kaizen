import { App } from 'aws-cdk-lib';
import { VpcStack } from './vpc';
import { config } from './config';
import { DatabaseStack } from './database';
import { ApiStack } from './api';
import { EcrStack } from './ecr';
import { ApiSecurityGroupStack } from './api-security-group';

const app = new App();

// Deploy the image registry manually first
new EcrStack(app, config.ECR_STACK_ID);

// Deploy the VPC, database, and API
const vpcStack = new VpcStack(app, config.VPC_STACK_ID);
const apiSecurityGroupStack = new ApiSecurityGroupStack(
  app,
  config.API_SECURITY_GROUP_ID,
  { vpc: vpcStack.vpc }
);
const dbStack = new DatabaseStack(app, config.DATABASE_STACK_ID, {
  vpc: vpcStack.vpc,
  apiSecurityGroup: apiSecurityGroupStack.securityGroup
});
new ApiStack(app, config.API_STACK_ID, {
  vpc: vpcStack.vpc,
  apiSecurityGroup: apiSecurityGroupStack.securityGroup,
  databaseSecret: dbStack.secret
});
