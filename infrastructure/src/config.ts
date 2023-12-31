import * as rds from 'aws-cdk-lib/aws-rds';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export const config = {
  STACK_ID: 'kaizen-stack',
  VPC_STACK_ID: 'kaizen-vpc-stack',
  VPC_ID: 'kaizen-vpc',
  VPC_PRIVATE_SUBNET_NAME: 'kaizen-vpc-private-subnet',
  DATABASE_ENGINE: rds.PostgresEngineVersion.VER_15_4,
  DATABASE_STACK_ID: 'kaizen-db-stack',
  DATABASE_ID: 'kaizen-db',
  DATABASE_NAME: 'kaizen',
  DATABASE_USERNAME: 'kaizen_db_admin',
  DATABASE_PASSWORD: 'CX6qLd2k7MqPew22ark5Lfen',
  DATABASE_CREDENTIALS_ID: 'kaizen-db-credentials',
  DATABASE_PARAMETER_GROUP_ID: 'kaizen-db-parameter-group',
  DATABASE_SECURITY_GROUP_ID: 'kaizen-db-security-group',
  DATABASE_SUBNET_GROUP_ID: 'kaizen-db-subnet-group',
  SERVER_APP_DIR: 'C://_git//kaizen//apps//api//dist',
  SERVER_STACK_ID: 'kaizen-server-stack',
  SERVER_NODE_VERSION: lambda.Runtime.NODEJS_20_X,
  SERVER_API_GATEWAY_ID: 'kaizen-api',
  SERVER_API_GATEWAY_NAME: 'Kaizen API',
  SERVER_LAMBDA_ID: 'kaizen-lambda'
};
