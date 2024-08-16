import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import { config } from './config';
import { Construct } from 'constructs';

export interface FrontendStackProps {}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create an S3 bucket for the React app
    const bucket = new s3.Bucket(this, config.FRONTEND_BUCKET_ID, {
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html'
    });

    // Add a bucket policy to allow public read access
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()]
      })
    );

    // Create a CloudFront distribution
    const distribution = new cloudfront.Distribution(
      this,
      config.FRONTEND_DISTRIBUTION_ID,
      {
        defaultBehavior: { origin: new origins.S3Origin(bucket) }
      }
    );

    // Output the CloudFront distribution URL
    new cdk.CfnOutput(this, config.FRONTEND_DISTRIBUTION_URL, {
      value: distribution.distributionDomainName
    });
  }
}
