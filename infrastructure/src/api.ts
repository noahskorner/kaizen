import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
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

    // Create a Lambda function from the Docker image in the ECR repository
    const lambdaFunction = new lambda.DockerImageFunction(
      this,
      config.SERVER_LAMBDA_ID,
      {
        code: lambda.DockerImageCode.fromEcr(repository),
        vpc: vpc,
        vpcSubnets: {
          subnets: vpc.privateSubnets
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
