import { CfnOutput, Stack, App, Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

const STACK_ID = 'kaizen-stack';
const VPC_ID = 'kaizen-vpc';
const DATABASE_ENGINE = rds.PostgresEngineVersion.VER_15_4;
const DATABASE_ID = 'kaizen-db';
const DATABASE_NAME = 'kaizen';
const DATABASE_USERNAME = 'kaizen_dbadmin';
const DATABASE_CREDENTIALS_ID = 'kaizen-db-credentials';
const DATABASE_PARAMETER_GROUP_ID = 'kaizen-db-parameter-group';
const DATABASE_SECURITY_GROUP_ID = 'kaizen-db-security-group';
const DATABASE_SUBNET_GROUP_ID = 'kaizen-db-subnet-group';

export class KaizenStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // VPC
    const vpc = new ec2.Vpc(this, VPC_ID);
    const allAll = ec2.Port.allTraffic();
    // const tcp5432 = ec2.Port.tcpRange(5432, 5432);

    // DATABASE
    const dbsg = new ec2.SecurityGroup(this, DATABASE_SECURITY_GROUP_ID, {
      vpc: vpc,
      allowAllOutbound: true,
      description: id + 'Database',
      securityGroupName: id + 'Database'
    });

    dbsg.addIngressRule(dbsg, allAll, 'all from self');
    dbsg.addEgressRule(ec2.Peer.ipv4('0.0.0.0/0'), allAll, 'all out');

    const dbSubnetGroup = new rds.SubnetGroup(this, DATABASE_SUBNET_GROUP_ID, {
      vpc: vpc,
      description: id + 'subnet group',
      vpcSubnets: {
        subnets: vpc.privateSubnets
      },
      subnetGroupName: id + 'subnet group'
    });

    const postgresSecret = new secretsmanager.Secret(
      this,
      DATABASE_CREDENTIALS_ID,
      {
        secretName: DATABASE_CREDENTIALS_ID,
        description: DATABASE_CREDENTIALS_ID,
        generateSecretString: {
          excludeCharacters: '"@/\\ \'',
          generateStringKey: 'password',
          passwordLength: 30,
          secretStringTemplate: JSON.stringify({ username: DATABASE_USERNAME })
        }
      }
    );

    const postgresCredentials = rds.Credentials.fromSecret(
      postgresSecret,
      DATABASE_USERNAME
    );

    const dbParameterGroup = new rds.ParameterGroup(
      this,
      DATABASE_PARAMETER_GROUP_ID,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: DATABASE_ENGINE
        })
      }
    );

    const postgresInstance = new rds.DatabaseInstance(this, DATABASE_ID, {
      databaseName: DATABASE_NAME,
      instanceIdentifier: DATABASE_ID,
      credentials: postgresCredentials,
      engine: rds.DatabaseInstanceEngine.postgres({
        version: DATABASE_ENGINE
      }),
      backupRetention: Duration.days(7),
      allocatedStorage: 20,
      securityGroups: [dbsg],
      allowMajorVersionUpgrade: true,
      autoMinorVersionUpgrade: true,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpcSubnets: {
        subnets: vpc.privateSubnets
      },
      vpc: vpc,
      removalPolicy: RemovalPolicy.DESTROY,
      storageEncrypted: true,
      monitoringInterval: Duration.seconds(60),
      enablePerformanceInsights: true,
      parameterGroup: dbParameterGroup,
      subnetGroup: dbSubnetGroup,
      publiclyAccessible: false
    });
    postgresInstance.addRotationSingleUser();

    // OUTPUTS
    new CfnOutput(this, 'PostgresEndpoint', {
      exportName: 'PostgresEndPoint',
      value: postgresInstance.dbInstanceEndpointAddress
    });

    new CfnOutput(this, 'PostgresUserName', {
      exportName: 'PostgresUserName',
      value: DATABASE_USERNAME
    });

    new CfnOutput(this, 'PostgresDbName', {
      exportName: 'PostgresDbName',
      value: DATABASE_USERNAME
    });
  }
}

const app = new App();
new KaizenStack(app, STACK_ID);
