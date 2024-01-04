import * as rds from 'aws-cdk-lib/aws-rds';

// TODO: Declare these in an environment file
export const config = {
  STACK_ID: 'kaizen-stack',
  VPC_STACK_ID: 'kaizen-vpc-stack',
  VPC_ID: 'kaizen-vpc',
  DATABASE_ENGINE: rds.PostgresEngineVersion.VER_15_4,
  DATABASE_STACK_ID: 'kaizen-db-stack',
  DATABASE_ID: 'kaizen-db',
  DATABASE_NAME: 'kaizen',
  DATABASE_USERNAME: 'kaizen_dbadmin',
  DATABASE_CREDENTIALS_ID: 'kaizen-db-credentials',
  DATABASE_PARAMETER_GROUP_ID: 'kaizen-db-parameter-group',
  DATABASE_SECURITY_GROUP_ID: 'kaizen-db-security-group',
  DATABASE_SUBNET_GROUP_ID: 'kaizen-db-subnet-group'
};
