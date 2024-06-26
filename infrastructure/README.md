# Infrastructure

This repository uses the [AWS Cloud Development Kit (CDK)](https://aws.amazon.com/cdk/) to deploy infrastructure as code.

## Prerequisites

1. **Create an IAM user and group**

   Ensure an IAM role has been created with the neccessary permissions to use the AWS CLI. An example policy can be found at [kaizen-cf-iam.json](./src/kaizen-cf-iam.json).

2. **Install the AWS CLI**

   [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

3. **Configure your AWS profile**

   ```sh
   aws configure
   ```

4. **Bootstrap your environment**

   ```sh
   npx cdk bootstrap aws://ACCOUNT_ID/AWS_REGION
   ```

5. **Deploy the Elastic Container Registry**

   ```sh
   cd infrastructure && npm run stack:build && npm run stack:deploy:ecr
   ```

## Deploying a stack

1. Navigate to the /infrastructure directory

   ```sh
   cd infrastructure
   ```

2. Build the CloudFormation template

   ```sh
   npm run stack:build
   ```

3. Deploy every stack

   ```sh
   npm run stack:deploy
   ```
