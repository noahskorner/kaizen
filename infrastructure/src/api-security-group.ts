import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { config } from './config';

export interface ApiSecurityGroupStackProps {
  vpc: ec2.Vpc;
}

export class ApiSecurityGroupStack extends cdk.Stack {
  public readonly securityGroup: ec2.SecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    { vpc }: ApiSecurityGroupStackProps
  ) {
    super(scope, id);

    // Create a security group for the EC2 instances
    this.securityGroup = new ec2.SecurityGroup(
      this,
      config.API_SECURITY_GROUP_ID,
      { vpc: vpc }
    );
    this.securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
    this.securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
  }
}
