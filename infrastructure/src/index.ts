import { App } from 'aws-cdk-lib';
import { VpcStack } from './vpc';
import { config } from './config';
import { DatabaseStack } from './database';
import { ApiStack } from './api';

const app = new App();
const vpcStack = new VpcStack(app, config.VPC_STACK_ID);
new DatabaseStack(app, config.DATABASE_STACK_ID, vpcStack.vpc);
new ApiStack(app, config.SERVER_STACK_ID, vpcStack.vpc);
