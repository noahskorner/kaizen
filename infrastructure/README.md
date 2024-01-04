# Infrastructure

## Prerequisites

1. Install the AWS CLI [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Configure your aws profile

   ```sh
   aws configure
   ```

3. Bootstrap your environment

   ```sh
   npx cdk bootstrap aws://524484118461/us-east-2
   ```

## Deploying a stack

1. Create the CloudFormation template

   ```sh
   npx cdk synth
   ```

2. Deploy every stack

   ```sh
   npx cdk deploy --all
   ```
