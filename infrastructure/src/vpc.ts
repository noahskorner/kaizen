import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { config } from './config';

export class VpcStack extends Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create a VPC
    this.vpc = new ec2.Vpc(this, config.VPC_ID, {
      natGateways: 1,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: config.VPC_PUBLIC_SUBNET_NAME,
          cidrMask: 24
        },
        {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          name: config.VPC_PRIVATE_SUBNET_NAME,
          cidrMask: 24
        }
      ]
    });
  }
}
