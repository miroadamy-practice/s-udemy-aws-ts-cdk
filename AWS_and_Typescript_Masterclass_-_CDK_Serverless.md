# AWS & Typescript Masterclass - CDK, Serverless, React

```text
Archived: No
Created: December 7, 2021 7:02 PM
From: Udemy
Repo: https://github.com/miroadamy/s-udemy-aws-ts-cdk
STAR: No
Topic: Core skills
```

See [AWS & Typescript Masterclass - CDK, Serverless, React](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/) , Alex Horea

[Udemy](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/25157242?start=15#overview)

See `/Users/miroadamy/prj/s-udemy-aws-ts-cdk`

## Intro

- See [https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview)

## AWS CDK and CFN

- See [https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27143048#overview](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27143048#overview)

Will build the S3 bucket

Uses JSII - [https://github.com/aws/jsii/releases](https://github.com/aws/jsii/releases)

```bash
    Synth: creates the template in json in cdk.out (ignored by default)
    cdk bootstrap ⇒ creates S3 bucket
    `cdk deploy --all` = all stacks   
    `cdk ls` or `list`
    `cdk diff`
    `cdk destroy`
    `cdk doctor`
```

### OUTPUTS

`new CfnOutput(this, 'mybucket', {value: myBucket.bucketName});`

### PARAMETERS*

CfnParameter

```bash
    const duration = new CfnDuration(this, 'duration', {
     type: 'Number', // must be Number, not number
     default: 6,
     minValue: 1,
     maxValue: 10
    });
    
    cdk deploy --parameters duration=9
```

## 03 - Serverless project with CDK and TS

Doing from scratch.

The code in in `./FrontEnd` and `./BackEnd`

My code:

- cdk-front-end
- cdk-back-end

```bash

$ nvm
🚨 NVM not loaded! Loading now...

Node Version Manager (v0.35.2)

➜  s-udemy-aws-ts-cdk nvm use default
Now using node v16.13.1 (npm v8.1.2)
➜  s-udemy-aws-ts-cdk cdk --version
2.0.0 (build 4b6ce31)

➜  cdk-back-end git:(master) ✗ npm init -y
Wrote to /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/package.json:

{
  "name": "cdk-back-end",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

➜  cdk-back-end git:(master) npm i -D aws-cdk aws-cdk-lib constructs ts-node typescript 

added 216 packages, and audited 235 packages in 22s

found 0 vulnerabilities
➜  cdk-back-end git:(master) ✗ npm ls
cdk-back-end@1.0.0 /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end
├── aws-cdk-lib@2.1.0
├── aws-cdk@2.1.0
├── constructs@10.0.10
├── ts-node@10.4.0
└── typescript@4.5.2

````

Initial code - see `01-infra-draft` tag

```bash
➜  cdk-back-end git:(master) ✗ cdk synth
****************************************************
*** Newer version of CDK is available [2.1.0]    ***
*** Upgrade recommended (npm install -g aws-cdk) ***
****************************************************
Resources:
  CDKMetadata:
    Type: AWS::CDK::Metadata
    Properties:
      Analytics: v2:deflate64:H4sIAAAAAAAA/zPSM9QzUEwsL9ZNTsnWzclM0qsOLklMztZxTssLSi3OLy1KTgWxnfPzUjJLMvPzanXy8lNS9bKK9csMzfQMjfUMFbOKMzN1i0rzSjJzU/WCIDQA8x+qDVgAAAA=
    Metadata:
      aws:cdk:path: Space-Finder-Backend/CDKMetadata/Default
    Condition: CDKMetadataAvailable
Conditions:
  CDKMetadataAvailable:
    Fn::Or:
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - af-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-northeast-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-northeast-2
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-southeast-1
          - Fn::Equals:
              - Ref: AWS::Region
              - ap-southeast-2
          - Fn::Equals:
              - Ref: AWS::Region
              - ca-central-1
          - Fn::Equals:
              - Ref: AWS::Region
              - cn-north-1
          - Fn::Equals:
              - Ref: AWS::Region
              - cn-northwest-1
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-central-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-north-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-1
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-2
          - Fn::Equals:
              - Ref: AWS::Region
              - eu-west-3
          - Fn::Equals:
              - Ref: AWS::Region
              - me-south-1
          - Fn::Equals:
              - Ref: AWS::Region
              - sa-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-east-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-east-2
      - Fn::Or:
          - Fn::Equals:
              - Ref: AWS::Region
              - us-west-1
          - Fn::Equals:
              - Ref: AWS::Region
              - us-west-2
Parameters:
  BootstrapVersion:
    Type: AWS::SSM::Parameter::Value<String>
    Default: /cdk-bootstrap/hnb659fds/version
    Description: Version of the CDK Bootstrap resources in this environment, automatically retrieved from SSM Parameter Store. [cdk:skip]
Rules:
  CheckBootstrapVersion:
    Assertions:
      - Assert:
          Fn::Not:
            - Fn::Contains:
                - - "1"
                  - "2"
                  - "3"
                  - "4"
                  - "5"
                - Ref: BootstrapVersion
        AssertDescription: CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.

➜  cdk-back-end git:(master) ✗ 
```

To address:
`AssertDescription: CDK bootstrap stack version 6 required. Please run 'cdk bootstrap' with a recent version of the CDK CLI.`

```bash
➜  cdk-back-end git:(master) ✗ cdk bootstrap
Unable to resolve AWS account to use. It must be either configured when you define your CDK Stack, or through the environment
➜  cdk-back-end git:(master) ✗ export AWS_PROFILE=serverless-admin
➜  cdk-back-end git:(master) ✗ export AWS_DEFAULT_REGION=eu-central-1
➜  cdk-back-end git:(master) ✗ export AWS_REGION=eu-central-1 
➜  cdk-back-end git:(master) ✗ aws s3 ls
2020-06-30 13:27:11 atmosphere-docs-publisher-pipelinebucket-13584wbaypu4a
2020-06-30 13:27:11 atmosphere-docs-publisher-stack-pipelinebucket-1vkzhpuffn3jw
2020-06-30 13:27:11 atmosphere.pe.reliant.net
2021-01-08 22:01:54 aws-000000-cloudtrail-bucket-469225108435
2019-05-27 19:02:54 aws-000000-dev-pfi-s3-cloudtrail-f993c42d5d94
2019-11-04 19:36:46 aws-000000-staging-s3-cloudtrail-d55ae2714f32
2020-03-23 04:01:58 aws-000000-test-trailbucket-xacajphh2n49
2019-12-16 20:01:02 aws-codestar-ca-central-1-469225108435
2019-12-16 20:04:39 aws-codestar-ca-central-1-469225108435-test-codestar-pipe
2020-10-05 15:39:19 aws-perspective-accesslogsbucket-2rkkn8cb3w6p
2021-11-27 18:45:26 aws-sam-cli-managed-default-samclisourcebucket-le1tzalhcdcv
2020-10-15 22:05:54 aws-stackset-drift-detec-serverlessdeploymentbuck-1i3jcfyd3g7wf
2021-11-30 23:32:02 cdktoolkit-stagingbucket-o66kpow1db31
2020-03-13 15:14:33 cf-templates-cod90gs5ld9b-ca-central-1
2020-07-01 06:49:53 cf-templates-cod90gs5ld9b-us-east-1
2020-03-18 20:57:30 cf-templates-cod90gs5ld9b-us-east-2
2020-03-31 02:57:52 cf-templates-cod90gs5ld9b-us-west-1
2020-03-13 16:48:07 cfn-test-bucket-000
2020-07-02 04:17:25 codepipeline-us-east-1-707035415740
2020-06-26 07:03:59 codesuite-demo-lambdacopy-11u5l3eh1ge-localbucket-cxwcqqtyx205
2020-06-26 07:04:01 codesuite-demo-pipeline-k1nrvleque-artifactbucket-18p2zu2q87y6
2020-06-05 06:19:35 config-bucket-469225108435
2020-03-17 22:11:10 config-bucket-469225108435-manual
2021-01-08 22:02:17 config-bucket-ca-central-1-469225108435
2021-01-08 22:01:59 config-bucket-us-east-1-469225108435
2021-01-08 22:02:34 config-bucket-us-west-2-469225108435
2020-07-02 09:42:38 ct-bucket-469225108435
2020-07-02 14:47:23 dive-personalize-events-1
2020-07-02 15:21:16 docs.atmosphere.pe.reliant.net
2019-11-12 20:30:19 global-s3-logs-logs-20191108132607049200000001
2020-01-03 22:43:47 logs-000000
2019-11-13 21:02:40 logs-pvtr
2020-10-16 22:11:08 logzio-aws-serverless-test
2020-07-06 23:45:10 pe.reliant.net
2019-11-17 03:23:36 pvtr-logs
2020-07-07 08:14:34 resources-pckg-dev-serverlessdeploymentbucket-10scqkldy24f0
2020-07-07 08:14:34 resources-pckg-nothing-serverlessdeploymentbucket-1v1djcsazikhi
2020-06-28 00:39:20 saas-identity-with-cognito-iden-destinationbucket-urhlxpa7zsyf
2020-06-28 00:39:23 saas-identity-with-cognito-identit-artifactbucket-jyn1g3ocz6j0
2020-06-28 01:36:24 session-manager-logs-469225108435
2020-07-07 15:50:45 signup-dev.hv3.xyz
2021-01-08 22:18:09 stackset-my-stack-set-65e20d00-69b9-configbucket-wpivuvqt55kw
2021-01-08 22:18:49 stackset-my-stack-set-a1be8021-0bf0-configbucket-1297xtwlma389
2021-01-08 22:19:33 stackset-my-stack-set-cc887279-e71f-configbucket-p63zdl4r2lew
2020-06-11 17:07:35 stackset-stacksetoverrideandupdatetes-trailbucket-1p8qnz3a0vdx3
2020-04-21 21:09:37 test-automation-scripts
2020-03-31 03:00:17 test-ct-stack-trailbucket-v32pu3w2pg3a
2020-08-31 19:44:39 test-no-tag-bucket-1
2020-12-07 18:51:18 test-s3-sys-testcustomer-20201207175115286500000003
➜  cdk-back-end git:(master) ✗ cdk bootstrap                         
 ⏳  Bootstrapping environment aws://469225108435/eu-central-1...
Trusted accounts for deployment: (none)
Trusted accounts for lookup: (none)
Using default execution policy of 'arn:aws:iam::aws:policy/AdministratorAccess'. Pass '--cloudformation-execution-policies' to customize.
CDKToolkit: creating CloudFormation changeset...

 ✅  Environment aws://469225108435/eu-central-1 bootstrapped.
➜  cdk-back-end git:(master) ✗ aws s3 ls | grep Cdk          
➜  cdk-back-end git:(master) ✗ aws s3 ls | grep -i cdk
2021-12-08 19:11:49 cdk-hnb659fds-assets-469225108435-eu-central-1
2021-12-08 19:12:09 cdktoolkit-stagingbucket-o66kpow1db31

```

See the fine tuned lamdda - <https://github.com/miroadamy/s-udemy-aws-ts-cdk/commit/434c3dfdf3331817d79c9847b115b5facfdc5de0>

## 04 - Serverless - AWS Lambda, bundling, testing etc

Create new Lambda in services/hello

All lambdas is JS for now

Using env for the App

```typescript
new SpaceStack(app, "Space-Finder-Backend", {
  stackName: "SpaceFinder",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
```

---

## 14 - TS recap

- Recap

Run ts:

- tsc ⇒ JS, then Node or browser
- directly - ts-node
- bundle with Webpack, parcel ⇒ browser
