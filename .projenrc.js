const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.19.0',
  defaultReleaseBranch: 'main',
  name: 'infra',
  minNodeVersion: '16.14.0',
  deps: [
    'dotenv',
    '@pepperize/cdk-organizations',
  ],
  gitignore: [
    '.env',
    '!/.idea/runConfigurations',
  ],
});
project.addTask('deploy-all', {
  exec: 'cdk deploy --all',
});
project.synth();
