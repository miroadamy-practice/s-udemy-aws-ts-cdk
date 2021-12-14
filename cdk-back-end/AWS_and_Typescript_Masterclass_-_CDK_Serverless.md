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

See the tag '05-logs'

### Using the AWS SDK

Install - `npm install aws-sdk`

Using s3client to list buckets, also must add policy to allow it

```typescript
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

---

import {S3} from 'aws-sdk';

const s3client = new S3();

async function handler(event: any, context: any) {

    const buckets = await s3client.listBuckets().promise();
    console.log('Got an event:');
    console.log(event);
    return {
        statusCode: 200,
        body: 'Hello from TS Lambda - here are your buckets:' + JSON.stringify(buckets.Buckets)
    }
}

export { handler }
```

Diff:

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬──────────┬────────┬─────────────────────┬──────────────────────────────────────┬───────────┐
│   │ Resource │ Effect │ Action              │ Principal                            │ Condition │
├───┼──────────┼────────┼─────────────────────┼──────────────────────────────────────┼───────────┤
│ + │ *        │ Allow  │ s3:ListAllMyBuckets │ AWS:${helloLambdaNodeJS/ServiceRole} │           │
└───┴──────────┴────────┴─────────────────────┴──────────────────────────────────────┴───────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::IAM::Policy helloLambdaNodeJS/ServiceRole/DefaultPolicy helloLambdaNodeJSServiceRoleDefaultPolicy8628AD89 
[~] AWS::Lambda::Function helloLambdaNodeJS helloLambdaNodeJSAEFC0103 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 4816a4f9fda3f9450be0686e61772e1c5b092b28e172273c54b2b9b1ef24a3d4.zip
 │       └─ [+] 407c12f0deaab996229a48e89884d0daadde046fa7000d0c3022181bcca8e66d.zip
 ├─ [~] DependsOn
 │   └─ @@ -1,3 +1,4 @@
 │      [ ] [
 │      [+]   "helloLambdaNodeJSServiceRoleDefaultPolicy8628AD89",
 │      [ ]   "helloLambdaNodeJSServiceRole9951D888"
 │      [ ] ]
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.4816a4f9fda3f9450be0686e61772e1c5b092b28e172273c54b2b9b1ef24a3d4
         └─ [+] asset.407c12f0deaab996229a48e89884d0daadde046fa7000d0c3022181bcca8e66d

---

RESPONSE

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 4760
Connection: close
Date: Fri, 10 Dec 2021 22:40:58 GMT
x-amzn-RequestId: 66a51be5-0be4-4506-8c89-920b2c64c34c
x-amz-apigw-id: KJ6a4EitliAFldQ=
X-Amzn-Trace-Id: Root=1-61b3d778-419da3986210585e756c670f;Sampled=0
X-Cache: Miss from cloudfront
Via: 1.1 bef2aa0a3399e7cf217d61d0ac883834.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: BUD50-C1
X-Amz-Cf-Id: LcU1RxMbZtlB5m6DYPD5NZPEoJhQUywgPwX8WRC8fpe5CwYcyhwTsA==

Hello from TS Lambda - here are your buckets:[{"Name":"atmosphere-docs-publisher-pipelinebucket-13584wbaypu4a","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"atmosphere-docs-publisher-stack-pipelinebucket-1vkzhpuffn3jw","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"atmosphere.pe.reliant.net","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"aws-000000-cloudtrail-bucket-469225108435","CreationDate":"2021-01-08T21:01:54.000Z"},{"Name":"aws-000000-dev-pfi-s3-cloudtrail-f993c42d5d94","CreationDate":"2019-05-27T17:02:54.000Z"},{"Name":"aws-000000-staging-s3-cloudtrail-d55ae2714f32","CreationDate":"2019-11-04T18:36:46.000Z"},{"Name":"aws-000000-test-trailbucket-xacajphh2n49","CreationDate":"2020-03-23T03:01:58.000Z"},{"Name":"aws-codestar-ca-central-1-469225108435","CreationDate":"2019-12-16T19:01:02.000Z"},{"Name":"aws-codestar-ca-central-1-469225108435-test-codestar-pipe","CreationDate":"2019-12-16T19:04:39.000Z"},{"Name":"aws-perspective-accesslogsbucket-2rkkn8cb3w6p","CreationDate":"2020-10-05T13:39:19.000Z"},{"Name":"aws-sam-cli-managed-default-samclisourcebucket-le1tzalhcdcv","CreationDate":"2021-11-27T17:45:26.000Z"},{"Name":"aws-stackset-drift-detec-serverlessdeploymentbuck-1i3jcfyd3g7wf","CreationDate":"2020-10-15T20:05:54.000Z"},{"Name":"cdk-hnb659fds-assets-469225108435-eu-central-1","CreationDate":"2021-12-08T18:11:49.000Z"},{"Name":"cdktoolkit-stagingbucket-o66kpow1db31","CreationDate":"2021-12-08T18:12:09.000Z"},{"Name":"cf-templates-cod90gs5ld9b-ca-central-1","CreationDate":"2020-03-13T14:14:33.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-east-1","CreationDate":"2020-07-01T04:49:53.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-east-2","CreationDate":"2020-03-18T19:57:30.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-west-1","CreationDate":"2020-03-31T00:57:52.000Z"},{"Name":"cfn-test-bucket-000","CreationDate":"2020-03-13T15:48:07.000Z"},{"Name":"codepipeline-us-east-1-707035415740","CreationDate":"2020-07-02T02:17:25.000Z"},{"Name":"codesuite-demo-lambdacopy-11u5l3eh1ge-localbucket-cxwcqqtyx205","CreationDate":"2020-06-26T05:03:59.000Z"},{"Name":"codesuite-demo-pipeline-k1nrvleque-artifactbucket-18p2zu2q87y6","CreationDate":"2020-06-26T05:04:01.000Z"},{"Name":"config-bucket-469225108435","CreationDate":"2020-06-05T04:19:35.000Z"},{"Name":"config-bucket-469225108435-manual","CreationDate":"2020-03-17T21:11:10.000Z"},{"Name":"config-bucket-ca-central-1-469225108435","CreationDate":"2021-01-08T21:02:17.000Z"},{"Name":"config-bucket-us-east-1-469225108435","CreationDate":"2021-01-08T21:01:59.000Z"},{"Name":"config-bucket-us-west-2-469225108435","CreationDate":"2021-01-08T21:02:34.000Z"},{"Name":"ct-bucket-469225108435","CreationDate":"2020-07-02T07:42:38.000Z"},{"Name":"dive-personalize-events-1","CreationDate":"2020-07-02T12:47:23.000Z"},{"Name":"docs.atmosphere.pe.reliant.net","CreationDate":"2020-07-02T13:21:16.000Z"},{"Name":"global-s3-logs-logs-20191108132607049200000001","CreationDate":"2019-11-12T19:30:19.000Z"},{"Name":"logs-000000","CreationDate":"2020-01-03T21:43:47.000Z"},{"Name":"logs-pvtr","CreationDate":"2019-11-13T20:02:40.000Z"},{"Name":"logzio-aws-serverless-test","CreationDate":"2020-10-16T20:11:08.000Z"},{"Name":"pe.reliant.net","CreationDate":"2020-07-06T21:45:10.000Z"},{"Name":"pvtr-logs","CreationDate":"2019-11-17T02:23:36.000Z"},{"Name":"resources-pckg-dev-serverlessdeploymentbucket-10scqkldy24f0","CreationDate":"2020-07-07T06:14:34.000Z"},{"Name":"resources-pckg-nothing-serverlessdeploymentbucket-1v1djcsazikhi","CreationDate":"2020-07-07T06:14:34.000Z"},{"Name":"saas-identity-with-cognito-iden-destinationbucket-urhlxpa7zsyf","CreationDate":"2020-06-27T22:39:20.000Z"},{"Name":"saas-identity-with-cognito-identit-artifactbucket-jyn1g3ocz6j0","CreationDate":"2020-06-27T22:39:23.000Z"},{"Name":"session-manager-logs-469225108435","CreationDate":"2020-06-27T23:36:24.000Z"},{"Name":"signup-dev.hv3.xyz","CreationDate":"2020-07-07T13:50:45.000Z"},{"Name":"stackset-my-stack-set-65e20d00-69b9-configbucket-wpivuvqt55kw","CreationDate":"2021-01-08T21:18:09.000Z"},{"Name":"stackset-my-stack-set-a1be8021-0bf0-configbucket-1297xtwlma389","CreationDate":"2021-01-08T21:18:49.000Z"},{"Name":"stackset-my-stack-set-cc887279-e71f-configbucket-p63zdl4r2lew","CreationDate":"2021-01-08T21:19:33.000Z"},{"Name":"stackset-stacksetoverrideandupdatetes-trailbucket-1p8qnz3a0vdx3","CreationDate":"2020-06-11T15:07:35.000Z"},{"Name":"test-automation-scripts","CreationDate":"2020-04-21T19:09:37.000Z"},{"Name":"test-ct-stack-trailbucket-v32pu3w2pg3a","CreationDate":"2020-03-31T01:00:17.000Z"},{"Name":"test-no-tag-bucket-1","CreationDate":"2020-08-31T17:44:39.000Z"},{"Name":"test-s3-sys-testcustomer-20201207175115286500000003","CreationDate":"2020-12-07T17:51:18.000Z"}]
```

### - Local debugging

Needs ts-node lib install => executes TS code

Add Debug configuration - manually created `.vscode/launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Local file",
            "runtimeArgs": [
                "-r",
                "ts-node/register"
            ],
            "args": [
                "${relativeFile}"
            ],
            "env": {
                "AWS_REGION":"eu-central-1"
            }
        }
    ]
}
```

Add test runner

```typescript
import {handler} from './../../cdk-back-end/services/node-lambda/hello'

// call the lambda, permissions do not matter
handler({}, {});

```

Getting error:

```bash
/usr/local/bin/node -r ts-node/register test/playground/Hello.test.ts}
Process exited with code 1
Uncaught Error: Cannot find module 'ts-node/register'
Require stack:
- internal/preload
No debugger available, can not send 'variables'

## ATTEMPT 1 - uninstall global ts-node

➜  cdk-back-end git:(master) ✗ npm uninstall -g ts-node

removed 16 packages, and audited 1 package in 329ms

found 0 vulnerabilities
➜  cdk-back-end git:(master) ✗ npm ls -g                                                
/Users/miroadamy/.nvm/versions/node/v16.13.1/lib
├── aws-cdk-lib@2.1.0
├── aws-cdk@2.1.0
├── constructs@10.0.10
├── corepack@0.10.0
├── esbuild@0.14.2
├── npm@8.1.2
├── typescript@4.5.2
└── yarn@1.22.17

➜  cdk-back-end git:(master) ✗ npm ls   
cdk-back-end@1.0.0 /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end
├── @types/node@16.11.12
├── @types/uuid@8.3.3
├── aws-cdk-lib@2.1.0
├── aws-cdk@2.1.0
├── aws-sdk@2.1046.0
├── constructs@10.0.10
├── esbuild@0.14.2
├── ts-node@10.4.0
├── typescript@4.5.2
└── uuid@8.3.2


```

### Issue and the solution

The problem seems to be that unlees the .vscode and node_modules are not at the same level in the project, the VS Code does not load the packages correctly. It is not specific to ts-node, it is not related to whether the module is locally or globally installed.

As soon as I created VS Code project that starts from `cdk-back-end`, moved the lauch.json into that subfolder, local debugging works like charm

See the tag `05-local-debugging`

## 06 - DynamoDB Table with Lambdas

We extend the Generic table to contain the link to Lambdas

Use properties instead of tablename, primary key

```typescript
export interface TableProps {
    createLambdaPath?: string,
    readLambdaPath?: string,
    updateLambdaPath?: string,
    deleteLambdaPath?: string,
    
    tableName: string,
    primaryKey: string
}
```

Pass the lambda file names - assume the location of `services/SpacesTable`

The GenericTable holds both the Lamdas (as NodeJsFunction) as well as integrations, creates both and exports integrations.

See 06-lamda-deployed

Add new test in requests:

```text
POST {{endpoint}}/spaces/
Content-Type: application/json

{
    "location": "Valencia",
    "name": "Best Oranges"
}
```

and run it:

```text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 52
Connection: close
Date: Mon, 13 Dec 2021 23:55:29 GMT
x-amzn-RequestId: 2f25f3a5-2c1e-4552-9f64-8f9f1e2dbb51
x-amz-apigw-id: KT-JiGzQFiAFmBA=
X-Amzn-Trace-Id: Root=1-61b7dd70-00499f56656ff286522e650b;Sampled=0
X-Cache: Miss from cloudfront
Via: 1.1 d70252a9a5db94138543e9a401c1f69b.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: BRU50-C1
X-Amz-Cf-Id: Uaj-SpbIjE94MMp3RSBrzgTZx5N3hySaEYXE1MpRSd-V8SR3y8DiYw==

"Created item: 87775a5d-9b2c-45ec-8923-c96944937766"
```

See tag 06-DynamoDB-create

### Implementing Read - need scan

Result:

```json
{statusCode: 200, body: '{"Items":[{"spaceId":"2754ab76-7c71-4956-b8bd-…:"Best Oranges"}],"Count":3,"ScannedCount":3}'}
body: '{"Items":[{"spaceId":"2754ab76-7c71-4956-b8bd-7982d409fe14","location":"Bratislava"},{"spaceId":"0640b5de-32dd-4c67-b51d-c52497e3860c"},{"spaceId":"87775a5d-9b2c-45ec-8923-c96944937766","location":"Valencia","name":"Best Oranges"}],"Count":3,"ScannedCount":3}'
statusCode: 200

```

Modified the test function to retrieve the result:

```typescript
const result = handler({} as any, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(items)
})
```

See tag 06-scan

### Implementing query by primary key

Complicated way how to define expression:

```typescript
    try {
        if (event.queryStringParameters) {
            if (PRIMARY_KEY! in event.queryStringParameters) {
                const keyValue = event.queryStringParameters[PRIMARY_KEY!];
                const queryResponse = await dbClient.query({
                    TableName: TABLE_NAME!,
                    KeyConditionExpression: "#zz = :zzzz",
                    ExpressionAttributeNames: {
                        '#zz': PRIMARY_KEY!
                    },
                    ExpressionAttributeValues: {
                        ':zzzz': keyValue
                    }
                }).promise();
                
            }
        } else {
            const queryResponse = await dbClient.scan({
                TableName: TABLE_NAME!
            }
            ).promise();
            result.body = JSON.stringify(queryResponse);           
        }
    

    } catch (error: any) {
        result.body = error.message
    }
```

Must deploy - see

```text
Resources
[-] AWS::ApiGateway::Deployment SpaceApiDeploymentA2B9E765e3353bb2d287b01ea01c68a193469623 destroy
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E7650a1fc074a2fc5ed4e95ed4b54389cd85 
[+] AWS::Lambda::Permission SpaceApi/Default/spaces/GET/ApiPermission.SpaceFinderBackendSpaceApiE9BB53FF.GET..spaces SpaceApispacesGETApiPermissionSpaceFinderBackendSpaceApiE9BB53FFGETspacesD9D63E6C 
[+] AWS::Lambda::Permission SpaceApi/Default/spaces/GET/ApiPermission.Test.SpaceFinderBackendSpaceApiE9BB53FF.GET..spaces SpaceApispacesGETApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFGETspaces5EE376C5 
[+] AWS::ApiGateway::Method SpaceApi/Default/spaces/GET SpaceApispacesGET6C083CB2 
[+] AWS::IAM::Role SpacesTable-Read/ServiceRole SpacesTableReadServiceRoleDC90AD04 
[+] AWS::IAM::Policy SpacesTable-Read/ServiceRole/DefaultPolicy SpacesTableReadServiceRoleDefaultPolicyEAD1E3B1 
[+] AWS::Lambda::Function SpacesTable-Read SpacesTableReadC88C4D14 
[~] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
 └─ [~] DeploymentId
     └─ [~] .Ref:
         ├─ [-] SpaceApiDeploymentA2B9E765e3353bb2d287b01ea01c68a193469623
         └─ [+] SpaceApiDeploymentA2B9E7650a1fc074a2fc5ed4e95ed4b54389cd85


```

See 06-query-by-id

This is what gets returned

```json
GET {{endpoint}}/spaces?spaceId=87775a5d-9b2c-45ec-8923-c96944937766
---
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 133
Connection: close
Date: Tue, 14 Dec 2021 16:05:13 GMT
x-amzn-RequestId: ff891295-8ae4-4891-ab98-da9bddf38430
x-amz-apigw-id: KWMM4ETbliAFqTA=
X-Amzn-Trace-Id: Root=1-61b8c0b8-3ba71ede549c54dc241a6aa6;Sampled=0
X-Cache: Miss from cloudfront
Via: 1.1 af4c7c5690ef99c2d2945817a4e41505.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: VIE50-P1
X-Amz-Cf-Id: nAJHlJS9bxp2ondDXm4eVt7MpUb_UfLjElXv1Q3gmctlHvJnyQW0Ng==

{
  "Items": [
    {
      "spaceId": "87775a5d-9b2c-45ec-8923-c96944937766",
      "location": "Valencia",
      "name": "Best Oranges"
    }
  ],
  "Count": 1,
  "ScannedCount": 1
}
```

### Query by secondary index

Must add secondary index (or more):

Add specification:

```typescript
 private spacesTable = new GenericTable(this, {
      tableName: 'SpacesTable',
      primaryKey: 'spaceId',
      secondaryIndexes: ['location'],
      
      createLambdaPath: 'Create',
      readLambdaPath: 'Read'

  });

---
    private addSecondaryIndexes() {
        if (this.props.secondaryIndexes) {
            for (const secondaryIndex of this.props.secondaryIndexes) {
                this.table.addGlobalSecondaryIndex({
                    indexName: secondaryIndex,
                    partitionKey: {
                        name: secondaryIndex,
                        type: AttributeType.STRING
                    }
                });
            }
        }
    }
```

And use different fucntion to query for it - note the refactored Read body.

```typescript
async function queryWithSecondaryPartition(queryParams:APIGatewayProxyEventQueryStringParameters) {
    const queryKey = Object.keys(queryParams)[0];
    const queryValue = queryParams[queryKey];

    const queryResponse = await dbClient.query({
        TableName: TABLE_NAME!,
        IndexName: queryKey,
        KeyConditionExpression: "#zz = :zzzz",
        ExpressionAttributeNames: {
            '#zz': queryKey
        },
        ExpressionAttributeValues: {
            ':zzzz': queryValue
        }
    }).promise();
    return JSON.stringify(queryResponse.Items);
}
```

The difference:

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬────────────────────────────┬────────┬────────────────────────────┬────────────────────────────┬───────────┐
│   │ Resource                   │ Effect │ Action                     │ Principal                  │ Condition │
├───┼────────────────────────────┼────────┼────────────────────────────┼────────────────────────────┼───────────┤
│ - │ ${SpacesTable.Arn}         │ Allow  │ dynamodb:BatchWriteItem    │ AWS:${SpacesTable-Create/S │           │
│   │                            │        │ dynamodb:DeleteItem        │ erviceRole}                │           │
│   │                            │        │ dynamodb:PutItem           │                            │           │
│   │                            │        │ dynamodb:UpdateItem        │                            │           │
│ - │ ${SpacesTable.Arn}         │ Allow  │ dynamodb:BatchGetItem      │ AWS:${SpacesTable-Read/Ser │           │
│   │                            │        │ dynamodb:ConditionCheckIte │ viceRole}                  │           │
│   │                            │        │ m                          │                            │           │
│   │                            │        │ dynamodb:GetItem           │                            │           │
│   │                            │        │ dynamodb:GetRecords        │                            │           │
│   │                            │        │ dynamodb:GetShardIterator  │                            │           │
│   │                            │        │ dynamodb:Query             │                            │           │
│   │                            │        │ dynamodb:Scan              │                            │           │
├───┼────────────────────────────┼────────┼────────────────────────────┼────────────────────────────┼───────────┤
│ + │ ${SpacesTable.Arn}         │ Allow  │ dynamodb:BatchWriteItem    │ AWS:${SpacesTable-Create/S │           │
│   │ ${SpacesTable.Arn}/index/* │        │ dynamodb:DeleteItem        │ erviceRole}                │           │
│   │                            │        │ dynamodb:PutItem           │                            │           │
│   │                            │        │ dynamodb:UpdateItem        │                            │           │
│ + │ ${SpacesTable.Arn}         │ Allow  │ dynamodb:BatchGetItem      │ AWS:${SpacesTable-Read/Ser │           │
│   │ ${SpacesTable.Arn}/index/* │        │ dynamodb:ConditionCheckIte │ viceRole}                  │           │
│   │                            │        │ m                          │                            │           │
│   │                            │        │ dynamodb:GetItem           │                            │           │
│   │                            │        │ dynamodb:GetRecords        │                            │           │
│   │                            │        │ dynamodb:GetShardIterator  │                            │           │
│   │                            │        │ dynamodb:Query             │                            │           │
│   │                            │        │ dynamodb:Scan              │                            │           │
└───┴────────────────────────────┴────────┴────────────────────────────┴────────────────────────────┴───────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[~] AWS::DynamoDB::Table SpacesTable SpacesTable8A997355 may be replaced
 ├─ [~] AttributeDefinitions (may cause replacement)
 │   └─ @@ -2,5 +2,9 @@
 │      [ ]   {
 │      [ ]     "AttributeName": "spaceId",
 │      [ ]     "AttributeType": "S"
 │      [+]   },
 │      [+]   {
 │      [+]     "AttributeName": "location",
 │      [+]     "AttributeType": "S"
 │      [ ]   }
 │      [ ] ]
 └─ [+] GlobalSecondaryIndexes
     └─ [{"IndexName":"location","KeySchema":[{"AttributeName":"location","KeyType":"HASH"}],"Projection":{"ProjectionType":"ALL"}}]
[~] AWS::IAM::Policy SpacesTable-Create/ServiceRole/DefaultPolicy SpacesTableCreateServiceRoleDefaultPolicy308B2E77 
 └─ [~] PolicyDocument
     └─ [~] .Statement:
         └─ @@ -15,7 +15,18 @@
            [ ]       ]
            [ ]     },
            [ ]     {
            [-]       "Ref": "AWS::NoValue"
            [+]       "Fn::Join": [
            [+]         "",
            [+]         [
            [+]           {
            [+]             "Fn::GetAtt": [
            [+]               "SpacesTable8A997355",
            [+]               "Arn"
            [+]             ]
            [+]           },
            [+]           "/index/*"
            [+]         ]
            [+]       ]
            [ ]     }
            [ ]   ]
            [ ] }
[~] AWS::IAM::Policy SpacesTable-Read/ServiceRole/DefaultPolicy SpacesTableReadServiceRoleDefaultPolicyEAD1E3B1 
 └─ [~] PolicyDocument
     └─ [~] .Statement:
         └─ @@ -18,7 +18,18 @@
            [ ]       ]
            [ ]     },
            [ ]     {
            [-]       "Ref": "AWS::NoValue"
            [+]       "Fn::Join": [
            [+]         "",
            [+]         [
            [+]           {
            [+]             "Fn::GetAtt": [
            [+]               "SpacesTable8A997355",
            [+]               "Arn"
            [+]             ]
            [+]           },
            [+]           "/index/*"
            [+]         ]
            [+]       ]
            [ ]     }
            [ ]   ]
            [ ] }
[~] AWS::Lambda::Function SpacesTable-Read SpacesTableReadC88C4D14 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 7a60db951d9d3433431d53473dfaf2a6c389ab2c91472f1a87468b3183892c66.zip
 │       └─ [+] c6d379115c7f0d054db6b5e1008551271113ee0cbefdfa975b771c1ed8606bc0.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.7a60db951d9d3433431d53473dfaf2a6c389ab2c91472f1a87468b3183892c66
         └─ [+] asset.c6d379115c7f0d054db6b5e1008551271113ee0cbefdfa975b771c1ed8606bc0


```

Here it what it returns

```text
GET {{endpoint}}/spaces?location=Valencia
---
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 284
Connection: close
Date: Tue, 14 Dec 2021 21:18:08 GMT
x-amzn-RequestId: 4d96c910-03f0-407d-9562-858b589ecc58
x-amz-apigw-id: KW6CkE38liAFXtg=
X-Amzn-Trace-Id: Root=1-61b90a10-5a4a351e3bec93b26812ed91;Sampled=0
X-Cache: Miss from cloudfront
Via: 1.1 6e4fd2f7f4c55027ff6ee922bdafd3af.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: VIE50-P1
X-Amz-Cf-Id: TX8BMy32TLLzxnW2fxZN0vDW_bc76QbhcjLJ4L_OeFcqrcP7BB_Nnw==

[
  {
    "spaceId": "a710c7db-9f89-414e-a6dd-9d978d2792f8",
    "location": "Valencia",
    "name": "Fire Mania Fallas"
  },
  {
    "spaceId": "773b977c-5fd4-487a-97e3-62b1f10979dc",
    "location": "Valencia",
    "name": "Turia"
  },
  {
    "spaceId": "87775a5d-9b2c-45ec-8923-c96944937766",
    "location": "Valencia",
    "name": "Best Oranges"
  }
]
```

Saved as 06-secondary-index
---

## 14 - TS recap

- Recap

Run ts:

- tsc ⇒ JS, then Node or browser
- directly - ts-node
- bundle with Webpack, parcel ⇒ browser
