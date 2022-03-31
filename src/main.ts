import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

if (!process.env.AWS_PROFILE) {
  throw new Error('Environment variable AWS_PROFILE is not set. Set it in your shell or in .env');
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'infra-dev', { env: devEnv });
// new MyStack(app, 'infra-prod', { env: prodEnv });

app.synth();
