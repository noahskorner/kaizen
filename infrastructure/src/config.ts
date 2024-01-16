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
  API_STACK_ID: 'kaizen-api-stack',
  API_CLUSTER_ID: 'kaizen-api-cluster',
  API_TASK_DEFINITION_ID: 'kaizen-api-task-definition',
  API_CONTAINER_ID: 'kaizen-api-container',
  API_SECURITY_GROUP_ID: 'kaizen-api-security-group',
  API_SCALING_GROUP_CAPACITY_ID: 'kaizen-api-scaling-group-capacity',
  API_SERVICE_ID: 'kaizen-api-service'
};
