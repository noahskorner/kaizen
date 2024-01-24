import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { config } from './config';

export class EcrStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new ecr.Repository(this, config.ECR_REPOSITORY_ID, {
      repositoryName: config.ECR_REPOSITORY_ID
    });
  }
}
