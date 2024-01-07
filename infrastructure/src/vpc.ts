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
      natGateways: 0,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          name: config.VPC_PRIVATE_SUBNET_NAME,
          cidrMask: 24
        }
      ]
    });
  }
}
