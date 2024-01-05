import { App, Stack } from 'aws-cdk-lib';
import { VpcStack } from './vpc';
import { config } from './config';
import { DatabaseStack } from './database';
import { ServerStack } from './server';

class KaizenStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const vpcStack = new VpcStack(app, config.VPC_STACK_ID);
    new DatabaseStack(app, config.DATABASE_STACK_ID, vpcStack.vpc);
    new ServerStack(app, config.SERVER_STACK_ID, {
      vpc: vpcStack.vpc,
      appDir: config.SERVER_APP_DIR,
      nodeVersion: config.SERVER_NODE_VERSION
    });
  }
}

const app = new App();
new KaizenStack(app, config.STACK_ID);
