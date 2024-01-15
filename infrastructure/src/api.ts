import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { serverEnvironment } from '@kaizen/env-server';
import { Construct } from 'constructs';
import { config } from './config';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, vpc: ec2.Vpc) {
    super(scope, id);

    // Create an ECR repository for your Docker image
    const repository = ecr.Repository.fromRepositoryName(
      this,
      config.SERVER_REPOSITORY_ID,
      config.SERVER_REPOSITORY_ID
    );

    // Obtain the DATABASE_URL
    const secret = secretsmanager.Secret.fromSecretNameV2(
      scope,
      config.DATABASE_SECRET_ID,
      config.DATABASE_SECRET_ID
    );
    const { username, password } = JSON.parse(secret.secretValue.toString());
    const databaseAddress = cdk.Fn.importValue(config.DATABASE_ADDRESS_ID);
    const databaseUrl = `postgres://${username}:${password}@${databaseAddress}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;
    const databaseSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      scope,
      config.DATABASE_SECURITY_GROUP_ID,
      config.DATABASE_SECURITY_GROUP_ID
    );

    // Create a Lambda function from the Docker image in the ECR repository
    const lambdaFunction = new lambda.DockerImageFunction(
      this,
      config.SERVER_LAMBDA_ID,
      {
        code: lambda.DockerImageCode.fromEcr(repository),
        vpc: vpc,
        vpcSubnets: {
          // TODO: Making this public to save on NAT Gateway costs
          // subnets: vpc.privateSubnets
          subnets: vpc.publicSubnets
        },
        securityGroups: [databaseSecurityGroup],
        environment: {
          ...serverEnvironment,
          DATABASE_URL: databaseUrl
        }
      }
    );

    // Create an API Gateway REST API that routes requests to the Lambda function
    const api = new apigateway.LambdaRestApi(
      this,
      config.SERVER_API_GATEWAY_ID,
      {
        handler: lambdaFunction
      }
    );

    // Output the URL of your Express API
    new cdk.CfnOutput(this, 'ExpressApiUrl', {
      value: api.url
    });
  }
}
