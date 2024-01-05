import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as path from 'path';
import { Construct } from 'constructs';

interface ServerStackProps extends cdk.StackProps {
  appDir: string;
  vpc: ec2.Vpc;
  nodeVersion: lambda.Runtime;
}

export class ServerStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    { appDir, vpc, nodeVersion }: ServerStackProps
  ) {
    super(scope, id);

    // Create an API Gateway REST API
    const api = new apigateway.RestApi(this, 'ExpressApi', {
      restApiName: 'Express API',
      description: 'API for the Node.js Express app'
    });

    const lambdaHandler = new lambda.Function(this, 'ExpressLambda', {
      runtime: nodeVersion,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, appDir)),
      vpc: vpc
    });

    api.root.addMethod('GET', new apigateway.LambdaIntegration(lambdaHandler));
  }
}
