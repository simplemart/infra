const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.19.0',
  defaultReleaseBranch: 'main',
  name: 'infra',
  minNodeVersion: '16.14.0',
  deps: [
    'dotenv',
  ],
  gitignore: [
    '.env',
  ],
});
project.synth();
