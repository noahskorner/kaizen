import { CfnOutput, Stack, Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { config } from './config';

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, vpc: ec2.Vpc) {
    super(scope, id);

    const allAll = ec2.Port.allTraffic();

    const dbsg = new ec2.SecurityGroup(
      this,
      config.DATABASE_SECURITY_GROUP_ID,
      {
        vpc: vpc,
        allowAllOutbound: true,
        description: id + 'Database',
        securityGroupName: id + 'Database'
      }
    );

    dbsg.addIngressRule(dbsg, allAll, 'all from self');

    const dbSubnetGroup = new rds.SubnetGroup(
      this,
      config.DATABASE_SUBNET_GROUP_ID,
      {
        vpc: vpc,
        description: id + 'subnet group',
        vpcSubnets: {
          subnets: vpc.privateSubnets
        },
        subnetGroupName: id + 'subnet group'
      }
    );

    const postgresSecret = new secretsmanager.Secret(
      this,
      config.DATABASE_CREDENTIALS_ID,
      {
        secretName: config.DATABASE_CREDENTIALS_ID,
        description: config.DATABASE_CREDENTIALS_ID,
        generateSecretString: {
          excludeCharacters: '"@/\\ \'',
          generateStringKey: 'password',
          passwordLength: 30,
          secretStringTemplate: JSON.stringify({
            username: config.DATABASE_USERNAME
          })
        }
      }
    );

    const postgresCredentials = rds.Credentials.fromSecret(
      postgresSecret,
      config.DATABASE_USERNAME
    );

    const dbParameterGroup = new rds.ParameterGroup(
      this,
      config.DATABASE_PARAMETER_GROUP_ID,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: config.DATABASE_ENGINE
        })
      }
    );

    const postgresInstance = new rds.DatabaseInstance(
      this,
      config.DATABASE_ID,
      {
        databaseName: config.DATABASE_NAME,
        instanceIdentifier: config.DATABASE_ID,
        credentials: postgresCredentials,
        engine: rds.DatabaseInstanceEngine.postgres({
          version: config.DATABASE_ENGINE
        }),
        backupRetention: Duration.days(0),
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
      }
    );
    postgresInstance.addRotationSingleUser();

    // OUTPUTS
    new CfnOutput(this, 'PostgresEndpoint', {
      exportName: 'PostgresEndPoint',
      value: postgresInstance.dbInstanceEndpointAddress
    });

    new CfnOutput(this, 'PostgresUserName', {
      exportName: 'PostgresUserName',
      value: config.DATABASE_USERNAME
    });

    new CfnOutput(this, 'PostgresDbName', {
      exportName: 'PostgresDbName',
      value: config.DATABASE_USERNAME
    });
  }
}
