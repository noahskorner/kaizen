import { App, StackProps } from 'aws-cdk-lib';
import { config } from './config';
import { EcrStack } from './ecr';
import { KaizenStack } from './stack';

const app = new App();
const props: StackProps = {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION
  }
};

// Deploy the image registry manually first
new EcrStack(app, config.ECR_STACK_ID, props);

// Deploy
new KaizenStack(app, config.KAIZEN_STACK_ID, props);
