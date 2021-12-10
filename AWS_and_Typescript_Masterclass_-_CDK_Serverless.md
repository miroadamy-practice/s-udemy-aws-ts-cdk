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

## 01 Intro

- See [https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview)

## 02 AWS CDK and CFN

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

### AWS Lambda

Create new Lambda in services/hello

All lambdas is JS for now

Using env for the App

```typescript
new SpaceStack(app, "Space-Finder-Backend", {
  stackName: "SpaceFinder",
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
```

### Adding API GW

Have to create: API GW, Integration and Resource:

```typescript
    const helloLambda = new LambdaFunction(this, 'helloLambda', {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
        handler: 'hello.main'   // name of file.exported function
    });

    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
```

CDK diff

```bash
➜  cdk-back-end git:(master) cdk diff
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬───────────────────────────────┬────────┬───────────────────────────────┬───────────────────────────────┬──────────────────────────────────┐
│   │ Resource                      │ Effect │ Action                        │ Principal                     │ Condition                        │
├───┼───────────────────────────────┼────────┼───────────────────────────────┼───────────────────────────────┼──────────────────────────────────┤
│ + │ ${SpaceApi/CloudWatchRole.Arn │ Allow  │ sts:AssumeRole                │ Service:apigateway.amazonaws. │                                  │
│   │ }                             │        │                               │ com                           │                                  │
├───┼───────────────────────────────┼────────┼───────────────────────────────┼───────────────────────────────┼──────────────────────────────────┤
│ + │ ${helloLambda.Arn}            │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                     │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS::P │
│   │                               │        │                               │                               │ artition}:execute-api:eu-central │
│   │                               │        │                               │                               │ -1:469225108435:${SpaceApi1B373D │
│   │                               │        │                               │                               │ 2B}/${SpaceApi/DeploymentStage.p │
│   │                               │        │                               │                               │ rod}/GET/hello"                  │
│   │                               │        │                               │                               │ }                                │
│ + │ ${helloLambda.Arn}            │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                     │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS::P │
│   │                               │        │                               │                               │ artition}:execute-api:eu-central │
│   │                               │        │                               │                               │ -1:469225108435:${SpaceApi1B373D │
│   │                               │        │                               │                               │ 2B}/test-invoke-stage/GET/hello" │
│   │                               │        │                               │                               │ }                                │
└───┴───────────────────────────────┴────────┴───────────────────────────────┴───────────────────────────────┴──────────────────────────────────┘
IAM Policy Changes
┌───┬────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                   │ Managed Policy ARN                                                                      │
├───┼────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${SpaceApi/CloudWatchRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs │
└───┴────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::ApiGateway::RestApi SpaceApi SpaceApi1B373D2B 
[+] AWS::IAM::Role SpaceApi/CloudWatchRole SpaceApiCloudWatchRole2811DDE0 
[+] AWS::ApiGateway::Account SpaceApi/Account SpaceApiAccount1ADAEF20 
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E765d1b3468b12a7ee6817a725a57573835e 
[+] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
[+] AWS::ApiGateway::Resource SpaceApi/Default/hello SpaceApihelloDF776653 
[+] AWS::Lambda::Permission SpaceApi/Default/hello/GET/ApiPermission.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello SpaceApihelloGETApiPermissionSpaceFinderBackendSpaceApiE9BB53FFGEThelloC5CE7BCC 
[+] AWS::Lambda::Permission SpaceApi/Default/hello/GET/ApiPermission.Test.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello SpaceApihelloGETApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFGEThelloD20E1DAA 
[+] AWS::ApiGateway::Method SpaceApi/Default/hello/GET SpaceApihelloGET65983C27 

Outputs
[+] Output SpaceApi/Endpoint SpaceApiEndpointDA7E4050: {"Value":{"Fn::Join":["",["https://",{"Ref":"SpaceApi1B373D2B"},".execute-api.eu-central-1.",{"Ref":"AWS::URLSuffix"},"/",{"Ref":"SpaceApiDeploymentStageprodBB8A31FE"},"/"]]}}

---
# On deploy:

Outputs:
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38
```

Can hit it on <https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/hello>

Install 'Rest Client' extension

### Adding DynamoDB

We use separate class => see `GenericTable.ts`

```bash
➜  cdk-back-end git:(master) ✗ cdk diff
Stack Space-Finder-Backend (SpaceFinder)
Resources
[+] AWS::DynamoDB::Table SpacesTable SpacesTable8A997355 
```

## 04 Lambda bundling, testing and debugging

2 solutions shown: NodeLambda and webpack

### The problems

- how to deploy Lamdba dependencies
- TS must be transpilled to JS

### Deploy Lambdas

- Monorepo: deploy the Node Modules => hard to discriminate between Lambdas
- CDK construct - Node Lambda <https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html>, uses esbuilder - <https://esbuild.github.io/>
- Webpack - old, slow, difficult config

### CDK Node Lambda

See <https://docs.aws.amazon.com/cdk/api/latest/docs/aws-lambda-nodejs-readme.html>

Install: `npm install --save-dev esbuild@0`

Create new Lambda in TS: `cdk-back-end/services/node-lambda/hello.ts`

```typescript
import { v4} from 'uuid';

async function handler(event: any, context: any) {
    return {
        statusCode: 200,
        body: 'Hello from TS Lambda ' + v4();
    }
}

export { handler }
```

and add useless dependency:

```bash
npm i uuid
npm i @types/uuid
```

### !! Issue

Error

```bash
➜  cdk-back-end git:(master) ✗ cdk synth
Bundling asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage...
yarn run v1.22.17
warning package.json: No license field
error Command "esbuild" not found.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:395
      throw new Error(`Failed to bundle asset ${this.node.path}, bundle output is located at ${bundleErrorDir}: ${err}`);
            ^
Error: Failed to bundle asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage, bundle output is located at /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-836f886bcd598c97f528db1e405338dc739e44796fe50d65da92c2c41150626b-error: Error: bash -c yarn run esbuild --bundle "/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts" --target=node14 --platform=node --outfile="/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-836f886bcd598c97f528db1e405338dc739e44796fe50d65da92c2c41150626b/index.js" --external:aws-sdk run in directory /Users/miroadamy exited with status 1
    at AssetStaging.bundle (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:395:13)
    at AssetStaging.stageByBundling (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:243:10)
    at stageThisAsset (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:134:35)
    at Cache.obtain (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/private/cache.ts:24:13)
    at new AssetStaging (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:159:44)
    at new Asset (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-s3-assets/lib/asset.ts:81:21)
    at AssetCode.bind (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda/lib/code.ts:180:20)
    at new Function (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda/lib/function.ts:345:29)
    at new NodejsFunction (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda-nodejs/lib/function.ts:50:5)
    at new SpaceStack (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/infrastructure/SpaceStacks.ts:29:31)
Subprocess exited with error 1

# I do have esbuild - both local and global

➜  cdk-back-end git:(master) ✗ npm ls
cdk-back-end@1.0.0 /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end
├── @types/node@16.11.12
├── @types/uuid@8.3.3
├── aws-cdk-lib@2.1.0
├── aws-cdk@2.1.0
├── constructs@10.0.10
├── esbuild@0.14.2
├── ts-node@10.4.0
├── typescript@4.5.2
└── uuid@8.3.2

➜  cdk-back-end git:(master) ✗ npm ls -g
/Users/miroadamy/.nvm/versions/node/v16.13.1/lib
├── aws-cdk-lib@2.1.0
├── aws-cdk@2.1.0
├── constructs@10.0.10
├── corepack@0.10.0
├── esbuild@0.14.2
├── npm@8.1.2
├── ts-node@10.4.0
└── typescript@4.5.2

# I run yarn

➜  cdk-back-end git:(master) ✗ yarn
yarn install v1.22.17
warning ../../../package.json: No license field
info No lockfile found.
warning package-lock.json found. Your project contains lock files generated by tools other than Yarn. It is advised not to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files. To clear this warning, remove package-lock.json.
[1/4] 🔍  Resolving packages...
warning aws-cdk > aws-sdk > uuid@3.3.2: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
warning aws-cdk > aws-sdk > querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
warning aws-cdk > aws-sdk > url > querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 73.74s.

➜  cdk-back-end git:(master) ✗ cdk synth
Bundling asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage...
yarn run v1.22.17
warning ../../../package.json: No license field
$ /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/.bin/esbuild --bundle /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts --target=node14 --platform=node --outfile=/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js --external:aws-sdk
✘ [ERROR] Expected "}" but found ";"

    services/node-lambda/hello.ts:6:44:
      6 │         body: 'Hello from TS Lambda ' + v4();
        │                                             ^
        ╵                                             }

1 error
node:child_process:867
    throw err;
    ^

Error: Command failed: /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/esbuild-darwin-64/bin/esbuild --bundle /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts --target=node14 --platform=node --outfile=/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js --external:aws-sdk
    at checkExecSyncError (node:child_process:826:11)
    at Object.execFileSync (node:child_process:864:15)
    at Object.<anonymous> (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/esbuild/bin/esbuild:108:26)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  status: 1,
  signal: null,
  output: [ null, null, null ],
  pid: 15568,
  stdout: null,
  stderr: null
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:395
      throw new Error(`Failed to bundle asset ${this.node.path}, bundle output is located at ${bundleErrorDir}: ${err}`);
            ^
Error: Failed to bundle asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage, bundle output is located at /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e-error: Error: bash -c yarn run esbuild --bundle "/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts" --target=node14 --platform=node --outfile="/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js" --external:aws-sdk run in directory /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end exited with status 1
    at AssetStaging.bundle (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:395:13)
    at AssetStaging.stageByBundling (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:243:10)
    at stageThisAsset (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:134:35)
    at Cache.obtain (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/private/cache.ts:24:13)
    at new AssetStaging (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/core/lib/asset-staging.ts:159:44)
    at new Asset (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-s3-assets/lib/asset.ts:81:21)
    at AssetCode.bind (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda/lib/code.ts:180:20)
    at new Function (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda/lib/function.ts:345:29)
    at new NodejsFunction (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/aws-cdk-lib/aws-lambda-nodejs/lib/function.ts:50:5)
    at new SpaceStack (/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/infrastructure/SpaceStacks.ts:29:31)
Subprocess exited with error 1


## Typo in the hello.ts

fixed the ';'


```

The YAML

```yaml
➜  cdk-back-end git:(master) ✗ cdk synth
Bundling asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage...
yarn run v1.22.17
warning ../../../package.json: No license field
$ /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/.bin/esbuild --bundle /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts --target=node14 --platform=node --outfile=/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js --external:aws-sdk

  cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js  17.2kb

✨  Done in 0.46s.
Resources:
  SpaceApi1B373D2B:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: SpaceApi
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Resource
  SpaceApiCloudWatchRole2811DDE0:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              Service: apigateway.amazonaws.com
        Version: "2012-10-17"
      ManagedPolicyArns:
        - Fn::Join:
            - ""
            - - "arn:"
              - Ref: AWS::Partition
              - :iam::aws:policy/service-role/AmazonAPIGatewayPushToCloudWatchLogs
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/CloudWatchRole/Resource
  SpaceApiAccount1ADAEF20:
    Type: AWS::ApiGateway::Account
    Properties:
      CloudWatchRoleArn:
        Fn::GetAtt:
          - SpaceApiCloudWatchRole2811DDE0
          - Arn
    DependsOn:
      - SpaceApi1B373D2B
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Account
  SpaceApiDeploymentA2B9E765cd756fe080062dca816b33155990283b:
    Type: AWS::ApiGateway::Deployment
    Properties:
      RestApiId:
        Ref: SpaceApi1B373D2B
      Description: Automatically created by the RestApi construct
    DependsOn:
      - SpaceApihelloGET65983C27
      - SpaceApihelloDF776653
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Deployment/Resource
  SpaceApiDeploymentStageprodBB8A31FE:
    Type: AWS::ApiGateway::Stage
    Properties:
      RestApiId:
        Ref: SpaceApi1B373D2B
      DeploymentId:
        Ref: SpaceApiDeploymentA2B9E765cd756fe080062dca816b33155990283b
      StageName: prod
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/DeploymentStage.prod/Resource
  SpaceApihelloDF776653:
    Type: AWS::ApiGateway::Resource
    Properties:
      ParentId:
        Fn::GetAtt:
          - SpaceApi1B373D2B
          - RootResourceId
      PathPart: hello
      RestApiId:
        Ref: SpaceApi1B373D2B
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Default/hello/Resource
  SpaceApihelloGETApiPermissionSpaceFinderBackendSpaceApiE9BB53FFGEThelloC5CE7BCC:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName:
        Fn::GetAtt:
          - helloLambda79DCE371
          - Arn
      Principal: apigateway.amazonaws.com
      SourceArn:
        Fn::Join:
          - ""
          - - "arn:"
            - Ref: AWS::Partition
            - ":execute-api:us-east-1:"
            - Ref: AWS::AccountId
            - ":"
            - Ref: SpaceApi1B373D2B
            - /
            - Ref: SpaceApiDeploymentStageprodBB8A31FE
            - /GET/hello
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Default/hello/GET/ApiPermission.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello
  SpaceApihelloGETApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFGEThelloD20E1DAA:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName:
        Fn::GetAtt:
          - helloLambda79DCE371
          - Arn
      Principal: apigateway.amazonaws.com
      SourceArn:
        Fn::Join:
          - ""
          - - "arn:"
            - Ref: AWS::Partition
            - ":execute-api:us-east-1:"
            - Ref: AWS::AccountId
            - ":"
            - Ref: SpaceApi1B373D2B
            - /test-invoke-stage/GET/hello
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Default/hello/GET/ApiPermission.Test.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello
  SpaceApihelloGET65983C27:
    Type: AWS::ApiGateway::Method
    Properties:
      HttpMethod: GET
      ResourceId:
        Ref: SpaceApihelloDF776653
      RestApiId:
        Ref: SpaceApi1B373D2B
      AuthorizationType: NONE
      Integration:
        IntegrationHttpMethod: POST
        Type: AWS_PROXY
        Uri:
          Fn::Join:
            - ""
            - - "arn:"
              - Ref: AWS::Partition
              - :apigateway:us-east-1:lambda:path/2015-03-31/functions/
              - Fn::GetAtt:
                  - helloLambda79DCE371
                  - Arn
              - /invocations
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpaceApi/Default/hello/GET/Resource
  SpacesTable8A997355:
    Type: AWS::DynamoDB::Table
    Properties:
      KeySchema:
        - AttributeName: spaceId
          KeyType: HASH
      AttributeDefinitions:
        - AttributeName: spaceId
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      TableName: SpacesTable
    UpdateReplacePolicy: Retain
    DeletionPolicy: Retain
    Metadata:
      aws:cdk:path: Space-Finder-Backend/SpacesTable/Resource
  helloLambdaServiceRoleBB046714:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
        Version: "2012-10-17"
      ManagedPolicyArns:
        - Fn::Join:
            - ""
            - - "arn:"
              - Ref: AWS::Partition
              - :iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    Metadata:
      aws:cdk:path: Space-Finder-Backend/helloLambda/ServiceRole/Resource
  helloLambda79DCE371:
    Type: AWS::Lambda::Function
    Properties:
      Code:
        S3Bucket:
          Fn::Sub: cdk-hnb659fds-assets-${AWS::AccountId}-us-east-1
        S3Key: 61ec3eb0769f8c3e58e82131603134c8448f210d15d8b23a6a8f4e93a95ac7d7.zip
      Role:
        Fn::GetAtt:
          - helloLambdaServiceRoleBB046714
          - Arn
      Handler: hello.main
      Runtime: nodejs14.x
    DependsOn:
      - helloLambdaServiceRoleBB046714
    Metadata:
      aws:cdk:path: Space-Finder-Backend/helloLambda/Resource
      aws:asset:path: asset.61ec3eb0769f8c3e58e82131603134c8448f210d15d8b23a6a8f4e93a95ac7d7
      aws:asset:original-path: /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/hello
      aws:asset:is-bundled: false
      aws:asset:property: Code
  helloLambdaNodeJSServiceRole9951D888:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: sts:AssumeRole
            Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
        Version: "2012-10-17"
      ManagedPolicyArns:
        - Fn::Join:
            - ""
            - - "arn:"
              - Ref: AWS::Partition
              - :iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    Metadata:
      aws:cdk:path: Space-Finder-Backend/helloLambdaNodeJS/ServiceRole/Resource
  helloLambdaNodeJSAEFC0103:
    Type: AWS::Lambda::Function
    Properties:
      Code:
        S3Bucket:
          Fn::Sub: cdk-hnb659fds-assets-${AWS::AccountId}-us-east-1
        S3Key: b7ea4ac94ce3cdfdf5cf33d02a3554b58fe64e1f2be81a2389534450cd67232d.zip
      Role:
        Fn::GetAtt:
          - helloLambdaNodeJSServiceRole9951D888
          - Arn
      Environment:
        Variables:
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
      Handler: index.handler
      Runtime: nodejs14.x
    DependsOn:
      - helloLambdaNodeJSServiceRole9951D888
    Metadata:
      aws:cdk:path: Space-Finder-Backend/helloLambdaNodeJS/Resource
      aws:asset:path: asset.b7ea4ac94ce3cdfdf5cf33d02a3554b58fe64e1f2be81a2389534450cd67232d
      aws:asset:original-path: /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end
      aws:asset:is-bundled: true
      aws:asset:property: Code
  CDKMetadata:
    Type: AWS::CDK::Metadata
    Properties:
      Analytics: v2:deflate64:H4sIAAAAAAAA/02QQU/EIBCFf8ve2dG6ifeuxtuqWb03U8BKW6DpgJum6X93KJr29L55gTc8HqCA+wPe6ChVd+xNDfNHQNkJtqoZB9Ng0DecYL5qCuVgxNOX22EppY8uiGc99H6ympHd3cRpjU5eBr7q4yj1GWkb/jIzX3T49ipZmRZh0PJ63+dzrIvo0dYKYWbjXY/WEBnvxEt0MiRg+58XoSaH1itu9ol1DllhEXSqkEgHgjIJz3COstNhfV3eUTmvdEvwusqWyilvMQwxbC3WkFTTuGZfaREpA1q6+ykeoThBcWjJmOPIH2eshmvWX2rSZmCLAQAA
    Metadata:
      aws:cdk:path: Space-Finder-Backend/CDKMetadata/Default
Outputs:
  SpaceApiEndpointDA7E4050:
    Value:
      Fn::Join:
        - ""
        - - https://
          - Ref: SpaceApi1B373D2B
          - .execute-api.us-east-1.
          - Ref: AWS::URLSuffix
          - /
          - Ref: SpaceApiDeploymentStageprodBB8A31FE
          - /
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

```

It produced huge file `cdk-back-end/cdk.out/asset.b7ea4ac94ce3cdfdf5cf33d02a3554b58fe64e1f2be81a2389534450cd67232d/index.js` that contains the lambda AND all the dependencies

```bash
➜  cdk-back-end git:(master) ✗ source ../environment 

➜  cdk-back-end git:(master) ✗ cdk diff
Bundling asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage...
yarn run v1.22.17
warning ../../../package.json: No license field
$ /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/.bin/esbuild --bundle /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts --target=node14 --platform=node --outfile=/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js --external:aws-sdk

  cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js  17.2kb

✨  Done in 0.48s.
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬──────────────────────────────────────┬────────┬────────────────┬──────────────────────────────┬───────────┐
│   │ Resource                             │ Effect │ Action         │ Principal                    │ Condition │
├───┼──────────────────────────────────────┼────────┼────────────────┼──────────────────────────────┼───────────┤
│ + │ ${helloLambdaNodeJS/ServiceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:lambda.amazonaws.com │           │
└───┴──────────────────────────────────────┴────────┴────────────────┴──────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────────────────┬────────────────────────────────────────────────────────────────────────────────┐
│   │ Resource                         │ Managed Policy ARN                                                             │
├───┼──────────────────────────────────┼────────────────────────────────────────────────────────────────────────────────┤
│ + │ ${helloLambdaNodeJS/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole │
└───┴──────────────────────────────────┴────────────────────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::IAM::Role helloLambdaNodeJS/ServiceRole helloLambdaNodeJSServiceRole9951D888 
[+] AWS::Lambda::Function helloLambdaNodeJS helloLambdaNodeJSAEFC0103 

```

## 05 - Testing and debugging

### Logging

- add console.log() calls
- switch helloLambdaNodeJS to be attached to GW
- deploy

```bash
➜  cdk-back-end git:(master) ✗ cdk diff
Bundling asset Space-Finder-Backend/helloLambdaNodeJS/Code/Stage...
yarn run v1.22.17
warning ../../../package.json: No license field
$ /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/node_modules/.bin/esbuild --bundle /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/services/node-lambda/hello.ts --target=node14 --platform=node --outfile=/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js --external:aws-sdk

  cdk.out/bundling-temp-834a0c01115afbdf1ac9c13715df1d4783218baecef9e7a50258daf22ef0080e/index.js  17.3kb

✨  Done in 0.56s.
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬───────────────────────────────┬────────┬───────────────────────────────┬───────────────────────────────┬─────────────────────────────────┐
│   │ Resource                      │ Effect │ Action                        │ Principal                     │ Condition                       │
├───┼───────────────────────────────┼────────┼───────────────────────────────┼───────────────────────────────┼─────────────────────────────────┤
│ - │ ${helloLambda79DCE371.Arn}    │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                    │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS:: │
│   │                               │        │                               │                               │ Partition}:execute-api:eu-centr │
│   │                               │        │                               │                               │ al-1:469225108435:${SpaceApi1B3 │
│   │                               │        │                               │                               │ 73D2B}/${SpaceApi/DeploymentSta │
│   │                               │        │                               │                               │ ge.prod}/GET/hello"             │
│   │                               │        │                               │                               │ }                               │
│ - │ ${helloLambda79DCE371.Arn}    │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                    │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS:: │
│   │                               │        │                               │                               │ Partition}:execute-api:eu-centr │
│   │                               │        │                               │                               │ al-1:469225108435:${SpaceApi1B3 │
│   │                               │        │                               │                               │ 73D2B}/test-invoke-stage/GET/he │
│   │                               │        │                               │                               │ llo"                            │
│   │                               │        │                               │                               │ }                               │
├───┼───────────────────────────────┼────────┼───────────────────────────────┼───────────────────────────────┼─────────────────────────────────┤
│ + │ ${helloLambdaNodeJS.Arn}      │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                    │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS:: │
│   │                               │        │                               │                               │ Partition}:execute-api:eu-centr │
│   │                               │        │                               │                               │ al-1:469225108435:${SpaceApi1B3 │
│   │                               │        │                               │                               │ 73D2B}/${SpaceApi/DeploymentSta │
│   │                               │        │                               │                               │ ge.prod}/GET/hello"             │
│   │                               │        │                               │                               │ }                               │
│ + │ ${helloLambdaNodeJS.Arn}      │ Allow  │ lambda:InvokeFunction         │ Service:apigateway.amazonaws. │ "ArnLike": {                    │
│   │                               │        │                               │ com                           │   "AWS:SourceArn": "arn:${AWS:: │
│   │                               │        │                               │                               │ Partition}:execute-api:eu-centr │
│   │                               │        │                               │                               │ al-1:469225108435:${SpaceApi1B3 │
│   │                               │        │                               │                               │ 73D2B}/test-invoke-stage/GET/he │
│   │                               │        │                               │                               │ llo"                            │
│   │                               │        │                               │                               │ }                               │
└───┴───────────────────────────────┴────────┴───────────────────────────────┴───────────────────────────────┴─────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[-] AWS::ApiGateway::Deployment SpaceApiDeploymentA2B9E765d1b3468b12a7ee6817a725a57573835e destroy
[-] AWS::IAM::Role helloLambdaServiceRoleBB046714 destroy
[-] AWS::Lambda::Function helloLambda79DCE371 destroy
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E765d58b45fcd9803361a63f37d7c52e229f 
[~] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
 └─ [~] DeploymentId
     └─ [~] .Ref:
         ├─ [-] SpaceApiDeploymentA2B9E765d1b3468b12a7ee6817a725a57573835e
         └─ [+] SpaceApiDeploymentA2B9E765d58b45fcd9803361a63f37d7c52e229f
[~] AWS::Lambda::Permission SpaceApi/Default/hello/GET/ApiPermission.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello SpaceApihelloGETApiPermissionSpaceFinderBackendSpaceApiE9BB53FFGEThelloC5CE7BCC replace
 └─ [~] FunctionName (requires replacement)
     └─ [~] .Fn::GetAtt:
         └─ @@ -1,4 +1,4 @@
            [ ] [
            [-]   "helloLambda79DCE371",
            [+]   "helloLambdaNodeJSAEFC0103",
            [ ]   "Arn"
            [ ] ]
[~] AWS::Lambda::Permission SpaceApi/Default/hello/GET/ApiPermission.Test.SpaceFinderBackendSpaceApiE9BB53FF.GET..hello SpaceApihelloGETApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFGEThelloD20E1DAA replace
 └─ [~] FunctionName (requires replacement)
     └─ [~] .Fn::GetAtt:
         └─ @@ -1,4 +1,4 @@
            [ ] [
            [-]   "helloLambda79DCE371",
            [+]   "helloLambdaNodeJSAEFC0103",
            [ ]   "Arn"
            [ ] ]
[~] AWS::ApiGateway::Method SpaceApi/Default/hello/GET SpaceApihelloGET65983C27 
 └─ [~] Integration
     └─ [~] .Uri:
         └─ [~] .Fn::Join:
             └─ @@ -8,7 +8,7 @@
                [ ] ":apigateway:eu-central-1:lambda:path/2015-03-31/functions/",
                [ ] {
                [ ]   "Fn::GetAtt": [
                [-]     "helloLambda79DCE371",
                [+]     "helloLambdaNodeJSAEFC0103",
                [ ]     "Arn"
                [ ]   ]
                [ ] },
[~] AWS::Lambda::Function helloLambdaNodeJS helloLambdaNodeJSAEFC0103 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] b7ea4ac94ce3cdfdf5cf33d02a3554b58fe64e1f2be81a2389534450cd67232d.zip
 │       └─ [+] 4816a4f9fda3f9450be0686e61772e1c5b092b28e172273c54b2b9b1ef24a3d4.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.b7ea4ac94ce3cdfdf5cf33d02a3554b58fe64e1f2be81a2389534450cd67232d
         └─ [+] asset.4816a4f9fda3f9450be0686e61772e1c5b092b28e172273c54b2b9b1ef24a3d4


cdk deploy
```

Deploy and hit it twice - via requests (the API GW did not change):

```json
2021-12-10T22:06:52.154Z 6a981304-fa4c-4427-9fca-ae0fd8f42a94 INFO 
{
  resource: '/hello',
  path: '/hello',
  httpMethod: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'CloudFront-Forwarded-Proto': 'https',
    'CloudFront-Is-Desktop-Viewer': 'true',
    'CloudFront-Is-Mobile-Viewer': 'false',
    'CloudFront-Is-SmartTV-Viewer': 'false',
    'CloudFront-Is-Tablet-Viewer': 'false',
    'CloudFront-Viewer-Country': 'SK',
    Host: '67183kcdkf.execute-api.eu-central-1.amazonaws.com',
    'User-Agent': 'vscode-restclient',
    Via: '1.1 d84412fe91532b74b0fb5833b7857e01.cloudfront.net (CloudFront)',
    'X-Amz-Cf-Id': 'KMELoG1OZ6suq4lBIEKXZoU26D9zC6s9FPXo_1KRTnhjJlbHkpntZw==',
    'X-Amzn-Trace-Id': 'Root=1-61b3cf7b-27d769be767c3b741a28f298',
    'X-Forwarded-For': '95.102.108.75, 130.176.34.83',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https'
  },
  multiValueHeaders: {
    'Accept-Encoding': [ 'gzip, deflate' ],
    'CloudFront-Forwarded-Proto': [ 'https' ],
    'CloudFront-Is-Desktop-Viewer': [ 'true' ],
    'CloudFront-Is-Mobile-Viewer': [ 'false' ],
    'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
    'CloudFront-Is-Tablet-Viewer': [ 'false' ],
    'CloudFront-Viewer-Country': [ 'SK' ],
    Host: [ '67183kcdkf.execute-api.eu-central-1.amazonaws.com' ],
    'User-Agent': [ 'vscode-restclient' ],
    Via: [
      '1.1 d84412fe91532b74b0fb5833b7857e01.cloudfront.net (CloudFront)'
    ],
    'X-Amz-Cf-Id': [ 'KMELoG1OZ6suq4lBIEKXZoU26D9zC6s9FPXo_1KRTnhjJlbHkpntZw==' ],
    'X-Amzn-Trace-Id': [ 'Root=1-61b3cf7b-27d769be767c3b741a28f298' ],
    'X-Forwarded-For': [ '95.102.108.75, 130.176.34.83' ],
    'X-Forwarded-Port': [ '443' ],
    'X-Forwarded-Proto': [ 'https' ]
  },
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  pathParameters: null,
  stageVariables: null,
  requestContext: {
    resourceId: 'lpcuyd',
    resourcePath: '/hello',
    httpMethod: 'GET',
    extendedRequestId: 'KJ1bYEs1liAFcmQ=',
    requestTime: '10/Dec/2021:22:06:51 +0000',
    path: '/prod/hello',
    accountId: '469225108435',
    protocol: 'HTTP/1.1',
    stage: 'prod',
    domainPrefix: '67183kcdkf',
    requestTimeEpoch: 1639174011809,
    requestId: '5162c577-f95c-40ea-8fc7-4cd1eba19c1e',
    identity: {
      cognitoIdentityPoolId: null,
      accountId: null,
      cognitoIdentityId: null,
      caller: null,
      sourceIp: '95.102.108.75',
      principalOrgId: null,
      accessKey: null,
      cognitoAuthenticationType: null,
      cognitoAuthenticationProvider: null,
      userArn: null,
      userAgent: 'vscode-restclient',
      user: null
    },
    domainName: '67183kcdkf.execute-api.eu-central-1.amazonaws.com',
    apiId: '67183kcdkf'
  },
  body: null,
  isBase64Encoded: false
}
```

---

## 14 - TS recap

- Recap

Run ts:

- tsc ⇒ JS, then Node or browser
- directly - ts-node
- bundle with Webpack, parcel ⇒ browser
