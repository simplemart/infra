import { Account, Organization, OrganizationalUnit } from '@pepperize/cdk-organizations';
import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class OrganizationStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    // AWS Organizations API is only available in region us-east-1
    super(scope, id, { ...props, env: { ...props.env, region: 'us-east-1' } });

    // Create your organization
    const organization = new Organization(this, 'Organization', {});

    // Create an organizational unit (OU)
    const workloadsOu = new OrganizationalUnit(this, 'WorkloadsOu', {
      organizationalUnitName: 'Workloads',
      parent: organization.root,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    //const workloadsProdOu =
    new OrganizationalUnit(this, 'WorkloadsProdOu', {
      organizationalUnitName: 'Prod',
      parent: workloadsOu,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    //const workloadsSdlcOu =
    new OrganizationalUnit(this, 'WorkloadsSdlcOu', {
      organizationalUnitName: 'SDLC',
      parent: workloadsOu,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const suspendedOu = new OrganizationalUnit(this, 'SuspendedOu', {
      organizationalUnitName: 'Suspended',
      parent: organization.root,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Create an account
    new Account(this, 'WorkloadsSdlcAcc', {
      accountName: 'MyFirstAccount', // renaming doesn't work
      email: 'simplemart01+WorkloadsSdlcAcc@gmail.com',
      parent: suspendedOu,
      importOnDuplicate: true,
    });
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
