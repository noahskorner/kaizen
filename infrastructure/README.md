# Infrastructure

## Prerequisites

1. Install the AWS CLI [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Configure your aws profile

   ```sh
   aws configure
   ```

3. Bootstrap your environment

   ```sh
   npx cdk bootstrap aws://ACCOUNT_ID/AWS_REGION
   ```

## Deploying a stack

1. Navigate to the /infrastructure directory

   ```sh
   cd infrastructure
   ```

2. Create the CloudFormation template

   ```sh
   npx cdk synth
   ```

3. Deploy every stack

   ```sh
   npx cdk deploy --all
   ```
