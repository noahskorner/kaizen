import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import { config } from './config';
import { Construct } from 'constructs';

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket for the React app
    const bucket = new s3.Bucket(this, config.FRONTEND_BUCKET_ID, {
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html'
    });

    // Add a bucket policy to allow public read access
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()]
      })
    );

    // Get the certificate from ACM
    const certificate = acm.Certificate.fromCertificateArn(
      this,
      config.CERTIFICATE_ID,
      process.env.AWS_CERTIFICATE_ARN_US_EAST_1!
    );

    // Create a CloudFront distribution
    const frontendDomain = `${config.FRONTEND_SUBDOMAIN}.${config.DOMAIN}`;
    const distribution = new cloudfront.Distribution(
      this,
      config.FRONTEND_DISTRIBUTION_ID,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(bucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD
        },
        domainNames: [frontendDomain],
        certificate: certificate
      }
    );

    // Get the hosted zone
    const hostedZone = route53.HostedZone.fromLookup(
      this,
      config.HOSTED_ZONE_ID,
      {
        domainName: config.DOMAIN
      }
    );

    // Create an alias record for the CloudFront distribution
    new route53.ARecord(this, config.FRONTEND_A_RECORD_ID, {
      zone: hostedZone,
      recordName: frontendDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      )
    });
  }
}
