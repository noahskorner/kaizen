import * as rds from 'aws-cdk-lib/aws-rds';

export const config = {
  ECR_STACK_ID: 'kaizen-ecr-stack',
  ECR_REPOSITORY_ID: 'kaizen-ecr-repository',
  VPC_STACK_ID: 'kaizen-vpc-stack',
  VPC_ID: 'kaizen-vpc',
  VPC_PUBLIC_SUBNET_NAME: 'kaizen-vpc-public-subnet',
  VPC_PRIVATE_SUBNET_NAME: 'kaizen-vpc-private-subnet',
  DATABASE_ENGINE: rds.PostgresEngineVersion.VER_15_4,
  DATABASE_STACK_ID: 'kaizen-db-stack',
  DATABASE_ID: 'kaizen-db',
  DATABASE_NAME: 'kaizen',
  DATABASE_PORT: 5432,
  DATABASE_USERNAME: 'kaizen_db_admin',
  DATABASE_SECRET_ID: 'kaizen-db-secret',
  DATABASE_CREDENTIALS_ID: 'kaizen-db-credentials',
  DATABASE_PARAMETER_GROUP_ID: 'kaizen-db-parameter-group',
  DATABASE_SECURITY_GROUP_ID: 'kaizen-db-security-group',
  DATABASE_SUBNET_GROUP_ID: 'kaizen-db-subnet-group',
  DATABASE_ADDRESS_ID: 'kaizen-db-address',
  SERVER_STACK_ID: 'kaizen-server-stack',
  SERVER_LAMBDA_ID: 'kaizen-server-lambda',
  SERVER_API_GATEWAY_ID: 'kaizen-server-api-gateway'
};
