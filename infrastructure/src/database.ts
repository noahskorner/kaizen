import {
  Duration,
  RemovalPolicy,
  Stack,
  CfnOutput,
  StackProps
} from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { config } from './config';

export interface DatabaseStackProps extends StackProps {
  vpc: ec2.Vpc;
}

export class DatabaseStack extends Stack {
  public readonly secret: secretsmanager.ISecret;
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    // Create the security group
    this.securityGroup = new ec2.SecurityGroup(
      this,
      config.DATABASE_SECURITY_GROUP_ID,
      {
        vpc: props.vpc,
        allowAllOutbound: true
      }
    );

    // Allow the database to be accessed from itself
    this.securityGroup.addIngressRule(
      this.securityGroup,
      ec2.Port.tcp(config.DATABASE_PORT),
      'Allow postgres from self'
    );

    // Create the subnet group
    const subnetGroup = new rds.SubnetGroup(
      this,
      config.DATABASE_SUBNET_GROUP_ID,
      {
        description: id + 'subnet group',
        vpc: props.vpc,
        vpcSubnets: {
          // TODO: Making this public to save on NAT Gateway costs
          // subnets: vpc.privateSubnets
          subnets: props.vpc.publicSubnets
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

    // Create a secret to store database credentials
    this.secret = new secretsmanager.Secret(this, config.DATABASE_SECRET_ID, {
      secretName: config.DATABASE_SECRET_ID,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: config.DATABASE_USERNAME
        }),
        generateStringKey: 'password',
        passwordLength: 32,
        excludePunctuation: true
      }
    });

    // Create the database
    const database = new rds.DatabaseInstance(this, config.DATABASE_ID, {
      instanceIdentifier: config.DATABASE_ID,
      databaseName: config.DATABASE_NAME,
      port: config.DATABASE_PORT,
      credentials: rds.Credentials.fromSecret(this.secret),
      engine: rds.DatabaseInstanceEngine.postgres({
        version: config.DATABASE_ENGINE
      }),
      backupRetention: Duration.days(0),
      allocatedStorage: 20,
      securityGroups: [this.securityGroup],
      allowMajorVersionUpgrade: true,
      autoMinorVersionUpgrade: true,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc: props.vpc,
      vpcSubnets: {
        // TODO: Making this public to save on NAT Gateway costs
        // subnets: vpc.privateSubnets
        subnets: props.vpc.publicSubnets
      },
      // TODO: Making this public to save on NAT Gateway costs
      publiclyAccessible: true,
      removalPolicy: RemovalPolicy.DESTROY,
      storageEncrypted: true,
      parameterGroup: parameterGroup,
      subnetGroup: subnetGroup
    });

    // Output the database address
    new CfnOutput(this, config.DATABASE_ADDRESS_ID, {
      value: database.dbInstanceEndpointAddress,
      exportName: config.DATABASE_ADDRESS_ID
    });
  }
}
