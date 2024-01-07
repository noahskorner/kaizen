import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { config } from './config';

interface ApiStackProps extends StackProps {
  appDir: string;
  nodeVersion: lambda.Runtime;
}

export class ApiStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    { appDir, nodeVersion }: ApiStackProps
  ) {
    super(scope, id);

    // Create an API Gateway REST API
    const api = new apigateway.RestApi(this, config.SERVER_API_GATEWAY_ID, {
      restApiName: config.SERVER_API_GATEWAY_NAME
    });

    // Create a Lambda function for the API Gateway
    const lambdaHandler = new lambda.Function(this, config.SERVER_LAMBDA_ID, {
      runtime: nodeVersion,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(appDir)
    });

    api.root.addMethod('GET', new apigateway.LambdaIntegration(lambdaHandler));
  }
}
