import { Organization } from '@pepperize/cdk-organizations';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class OrganizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, { ...props, env: { ...props.env, region: 'us-east-1' } }); // AWS Organizations API is only available in region us-east-1

    // Create your organization
    new Organization(this, 'Organization', {});

    // Create an organizational unit (OU)
    // const organizationUnit = new OrganizationalUnit(this, 'OrganizationalUnit', {
    //   organizationalUnitName: 'MyFirstOU',
    //   parent: organization.root,
    //   removalPolicy: RemovalPolicy.DESTROY, // TODO: delete this when done testing
    // });
    //
    // // Create an account
    // new Account(this, 'Account', {
    //   accountName: 'MyFirstAccount',
    //   email: 'simplemart01+myfirstaccount@gmail.com',
    //   parent: organizationUnit,
    // });
  }
}

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
new OrganizationStack(app, 'Organization', { env: devEnv });
// new MyStack(app, 'infra-prod', { env: prodEnv });

app.synth();
