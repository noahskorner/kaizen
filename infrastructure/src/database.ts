import { Duration, RemovalPolicy, SecretValue, Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import { config } from './config';

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, vpc: ec2.Vpc) {
    super(scope, id);

    // Create the security group
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
    dbsg.addIngressRule(dbsg, ec2.Port.allTraffic(), 'all from self');

    // Create the subnet group
    const subnetGroup = new rds.SubnetGroup(
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

    // Create the parameter group
    const parameterGroup = new rds.ParameterGroup(
      this,
      config.DATABASE_PARAMETER_GROUP_ID,
      {
        engine: rds.DatabaseInstanceEngine.postgres({
          version: config.DATABASE_ENGINE
        })
      }
    );

    // Create the credentials
    const credentials = rds.Credentials.fromPassword(
      config.DATABASE_USERNAME,
      SecretValue.unsafePlainText(config.DATABASE_PASSWORD)
    );

    // Create the database
    new rds.DatabaseInstance(this, config.DATABASE_ID, {
      databaseName: config.DATABASE_NAME,
      instanceIdentifier: config.DATABASE_ID,
      credentials: credentials,
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
      parameterGroup: parameterGroup,
      subnetGroup: subnetGroup,
      publiclyAccessible: false
    });
  }
}
