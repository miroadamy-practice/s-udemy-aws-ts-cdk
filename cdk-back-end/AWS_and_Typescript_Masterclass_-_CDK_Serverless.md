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

### Update

- combination of queryParameter AND body

```typescript
async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: ''
    }

    const requestBody = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    const spaceId = event.queryStringParameters?.[PRIMARY_KEY]

    try {
        if (requestBody && spaceId) {
            const requestBodyKey = Object.keys(requestBody)[0];
            const requestBodyValue = requestBody[requestBodyKey];

            const updateResult = await dbClient.update({
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: spaceId,
                },
                UpdateExpression: 'set #zzzNew = :new',
                ExpressionAttributeNames: {
                    '#zzzNew': requestBodyKey
                },
                ExpressionAttributeValues: {
                    ':new': requestBodyValue
                },
                ReturnValues: 'UPDATED_NEW'

            }).promise();
            result.body = JSON.stringify(updateResult);
        }
        
    } catch (error: any) {
        result.statusCode = 501
        result.body = error.message
    }

    return result;
}


```

?? WHY this way - without brackets does not work:

```text
Key: {[PRIMARY_KEY]: spaceId},
```

The integration - add

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬────────────────────┬────────┬────────────────────┬────────────────────┬───────────────────────┐
│   │ Resource           │ Effect │ Action             │ Principal          │ Condition             │
├───┼────────────────────┼────────┼────────────────────┼────────────────────┼───────────────────────┤
│ + │ ${SpacesTable.Arn} │ Allow  │ dynamodb:BatchWrit │ AWS:${SpacesTable- │                       │
│   │ ${SpacesTable.Arn} │        │ eItem              │ Update/ServiceRole │                       │
│   │ /index/*           │        │ dynamodb:DeleteIte │ }                  │                       │
│   │                    │        │ m                  │                    │                       │
│   │                    │        │ dynamodb:PutItem   │                    │                       │
│   │                    │        │ dynamodb:UpdateIte │                    │                       │
│   │                    │        │ m                  │                    │                       │
├───┼────────────────────┼────────┼────────────────────┼────────────────────┼───────────────────────┤
│ + │ ${SpacesTable-Upda │ Allow  │ lambda:InvokeFunct │ Service:apigateway │ "ArnLike": {          │
│   │ te.Arn}            │        │ ion                │ .amazonaws.com     │   "AWS:SourceArn": "a │
│   │                    │        │                    │                    │ rn:${AWS::Partition}: │
│   │                    │        │                    │                    │ execute-api:eu-centra │
│   │                    │        │                    │                    │ l-1:469225108435:${Sp │
│   │                    │        │                    │                    │ aceApi1B373D2B}/${Spa │
│   │                    │        │                    │                    │ ceApi/DeploymentStage │
│   │                    │        │                    │                    │ .prod}/PUT/spaces"    │
│   │                    │        │                    │                    │ }                     │
│ + │ ${SpacesTable-Upda │ Allow  │ lambda:InvokeFunct │ Service:apigateway │ "ArnLike": {          │
│   │ te.Arn}            │        │ ion                │ .amazonaws.com     │   "AWS:SourceArn": "a │
│   │                    │        │                    │                    │ rn:${AWS::Partition}: │
│   │                    │        │                    │                    │ execute-api:eu-centra │
│   │                    │        │                    │                    │ l-1:469225108435:${Sp │
│   │                    │        │                    │                    │ aceApi1B373D2B}/test- │
│   │                    │        │                    │                    │ invoke-stage/PUT/spac │
│   │                    │        │                    │                    │ es"                   │
│   │                    │        │                    │                    │ }                     │
├───┼────────────────────┼────────┼────────────────────┼────────────────────┼───────────────────────┤
│ + │ ${SpacesTable-Upda │ Allow  │ sts:AssumeRole     │ Service:lambda.ama │                       │
│   │ te/ServiceRole.Arn │        │                    │ zonaws.com         │                       │
│   │ }                  │        │                    │                    │                       │
└───┴────────────────────┴────────┴────────────────────┴────────────────────┴───────────────────────┘
IAM Policy Changes
┌───┬───────────────────────────────────────────────┬───────────────────────────────────────────────┐
│   │ Resource                                      │ Managed Policy ARN                            │
├───┼───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ + │ ${SpacesTable-Update/ServiceRole}             │ arn:${AWS::Partition}:iam::aws:policy/service │
│   │                                               │ -role/AWSLambdaBasicExecutionRole             │
└───┴───────────────────────────────────────────────┴───────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[-] AWS::ApiGateway::Deployment SpaceApiDeploymentA2B9E7650a1fc074a2fc5ed4e95ed4b54389cd85 destroy
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E76578d01c4db6a3368d7aa352f61ec7806c 
[+] AWS::Lambda::Permission SpaceApi/Default/spaces/PUT/ApiPermission.SpaceFinderBackendSpaceApiE9BB53FF.PUT..spaces SpaceApispacesPUTApiPermissionSpaceFinderBackendSpaceApiE9BB53FFPUTspacesA742EF2B 
[+] AWS::Lambda::Permission SpaceApi/Default/spaces/PUT/ApiPermission.Test.SpaceFinderBackendSpaceApiE9BB53FF.PUT..spaces SpaceApispacesPUTApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFPUTspacesFCB0DC45 
[+] AWS::ApiGateway::Method SpaceApi/Default/spaces/PUT SpaceApispacesPUTD4F9CA05 
[+] AWS::IAM::Role SpacesTable-Update/ServiceRole SpacesTableUpdateServiceRoleC28CF914 
[+] AWS::IAM::Policy SpacesTable-Update/ServiceRole/DefaultPolicy SpacesTableUpdateServiceRoleDefaultPolicy36B2545A 
[+] AWS::Lambda::Function SpacesTable-Update SpacesTableUpdate931099D2 
[~] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
 └─ [~] DeploymentId
     └─ [~] .Ref:
         ├─ [-] SpaceApiDeploymentA2B9E7650a1fc074a2fc5ed4e95ed4b54389cd85
         └─ [+] SpaceApiDeploymentA2B9E76578d01c4db6a3368d7aa352f61ec7806c


```

See 06-update tag

### Delete

Does not return anything, just retrieves the spaceId, uses filter

```typescript
async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: `Deleted `
    }

    const spaceId = event.queryStringParameters?.[PRIMARY_KEY]

    try {
        if (spaceId) {
            const deleteResult = await dbClient.delete({
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: spaceId
                }
            }).promise();
            result.body = JSON.stringify(deleteResult);
        }
        
    } catch (error: any) {
        result.statusCode = 501
        result.body = error.message
    }

    return result;
}
```

See 06-delete

### Data validation

- must be dynamic, TS is coding-time only => use if statements, dynamic type guards

See `shared/InputValidator.ts`

```typescript
import {Space} from './Model'

export class MissingFieldError extends Error {}

export function validateAsSpaceEntry(arg: any) {
    if (!(arg as Space).name) {
        throw new MissingFieldError('Value for name required!');
    } if (!(arg as Space).location) {
        throw new MissingFieldError('Value for location required!');
    }
    if (!(arg as Space).spaceId) {
        throw new MissingFieldError('Value for spaceId required!');
    }
}

---
// all mandatory except photo
export interface Space {
    spaceId: string,
    name: string,
    location: string,
    photo?: string

}
```

## 07 - AWS Cognito - User pools

- user pools: directory, basic authentication - JWT
- identity pools: access control, using AWS services

Create cognito user pool and creat user.

To avoid manual password reset, call CLI to make it confirmed

`aws cognito-idp admin-set-user-password --user-pool-id xxxxxx --username uuuuu -- password "qwerty123!" --permanent`

### Generate JWT tokens with Amplify

Will install Amplify locally and experiment

```bash
➜  cdk-back-end git:(master) ✗ npm i aws-amplify @aws-amplify/auth
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated sane@4.1.0: some dependency vulnerabilities fixed, support for node < 10 dropped, and newer ECMAScript syntax/features added
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.3.2: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uglify-es@3.3.9: support for ECMAScript is superseded by `uglify-js` as of v3.13.0

added 1094 packages, removed 7 packages, and audited 1348 packages in 2m

26 packages are looking for funding
  run `npm fund` for details

11 moderate severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

#### Manually create test-pool for running the tests

- name: test-pool
- signup by email or username
- no custom attributes
- default pwd policy, allow sign up
- no SMS role - no messages
- no email customization
- emails via cognito
- no tags
- no remembered devices
- app client later
- no lambda triggers
- review and create

=> eu-central-1_vMurur9r9

Back to integration:

- domain: <https://test-pool-miro.auth.eu-central-1.amazoncognito.com>
- app client:
  - name: test-pool-client
  - NO generate client secret
  - enable all auth flows

=> 4tpsgb67gvgfiu4fi7ou9jn28p

Create test_user, Qwerty123!

=> make verified

```bash
aws cognito-idp admin-set-user-password --user-pool-id eu-central-1_vMurur9r9 --username test_user --password 'Qwerty123!' --permanent 
```

Run the test:

```typescript
import { config } from './config';
import { AuthService } from './AuthService'

const authService = new AuthService();

const user = authService.login(config.TEST_USER_NAME, config.TEST_USER_PASSWORD);
console.log(user);
```

Returns this:

```json
{
  username: "test_user",
  pool: {
    userPoolId: "eu-central-1_vMurur9r9",
    clientId: "4tpsgb67gvgfiu4fi7ou9jn28p",
    client: {
      endpoint: "https://cognito-idp.eu-central-1.amazonaws.com/",
      fetchOptions: {
      },
    },
    advancedSecurityDataCollectionFlag: true,
    storage: function MemoryStorage() {
    },
    wrapRefreshSessionCallback: function (callback) {
      var wrapped = function (error, data) {
          if (data) {
              dispatchAuthEvent('tokenRefresh', undefined, "New token retrieved");
          }
          else {
              dispatchAuthEvent('tokenRefresh_failure', error, "Failed to retrieve new token");
          }
          return callback(error, data);
      };
      return wrapped;
    },
  },
  Session: null,
  client: {
    endpoint: "https://cognito-idp.eu-central-1.amazonaws.com/",
    fetchOptions: {
    },
  },
  signInUserSession: {
    idToken: {
      jwtToken: "eyJraWQiOiJwanZGYmtIZlYySHE3bmh3cjc4WUFFR004WEFDVndqazlxSmZoZFFSRm9rPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2MxY2ViMC0yYTMzLTRkZTktODI5Mi1jZDRiMjIwNDUxODEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfdk11cnVyOXI5IiwiY29nbml0bzp1c2VybmFtZSI6InRlc3RfdXNlciIsIm9yaWdpbl9qdGkiOiI5YWQwNjMxNi04MDBlLTQ2NjAtYTI3Ny02NTg1NTczYTU3ZTIiLCJhdWQiOiI0dHBzZ2I2N2d2Z2ZpdTRmaTdvdTlqbjI4cCIsImV2ZW50X2lkIjoiYjAwNzI1YzItM2Q0NC00NjY1LWI3ZDktZmYwYjBmNWYzNjQ2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Mzk2MTEzMjYsImV4cCI6MTYzOTYxNDkyNiwiaWF0IjoxNjM5NjExMzI2LCJqdGkiOiI4YTJmNmNhMC1iODIwLTQyMzUtYjU5ZS03ZTUzMjRhNGQ1NTciLCJlbWFpbCI6Im1pcm8uYWRhbXlAZ21haWwuY29tIn0.SLaqyWtQ3EuiXiBZlPB3CIsOQBMnUCq2zG2ZrIELPDSfUCOiaGdPMtKceYWP_Xvax7uv8cWLgxDAai4Gmt6gUqawSsoxJhMqo_BXvqs79UcJrClKvAX5Ek4prSMFZ44y5a6153espbiIHejvgOBZJL5Ro4tTuDkNT5-j9tjd8aG9NpfbSqOOyW8Ng149b30dd-W18_z_F8lr37UBdr25_13z-KF1yLDbXF-jWm1RZuClk7A6aHTWO63vpZ_rJ-A0qsTnE8N93qlZ8b0C7Qy_7hQBSU0yAP_y7Of-VPU7jWXKyZnuYs6ioDE-b0fogKepLcdddzY-GDdzaGZyohqg_w",
      payload: {
        sub: "57c1ceb0-2a33-4de9-8292-cd4b22045181",
        email_verified: true,
        iss: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_vMurur9r9",
        "cognito:username": "test_user",
        origin_jti: "9ad06316-800e-4660-a277-6585573a57e2",
        aud: "4tpsgb67gvgfiu4fi7ou9jn28p",
        event_id: "b00725c2-3d44-4665-b7d9-ff0b0f5f3646",
        token_use: "id",
        auth_time: 1639611326,
        exp: 1639614926,
        iat: 1639611326,
        jti: "8a2f6ca0-b820-4235-b59e-7e5324a4d557",
        email: "miro.adamy@gmail.com",
      },
    },
    refreshToken: {
      token: "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.liN0p7lx9JHiGymD2iEiDxBpx68SGtZbXu6YN_nPucf1vYnApM5kWPoama0zJnqhwTEkw_RPAPNqqu5fiI3G1-DxxvgOgjG3X4FiM7vJN0PW0V6zipuAC8J9LHNZdQGPP8S4pf1BJvW58eMttP551VmjuPkjBlXesF2Axg5i5usp2hJH6P3lke48T1NyilJgVhsHRUXi_pH19zfpzKr7Wyt4e3jeQ7NBshfzzVJDezvC7_b6AIdCZ8knTfVdOzkfEfkGw8o5CxMqybCH_VXs3eiAcjBhUqx3OH33dus8c68WTfw_kJTgahyzkA_jsc1LZk66wpF9tuZpj05_r_WUjw.1c4TMg8v6BPqflA2.OKqsVNchYAs69YMOBVqAmbe8-QDDVtKOcULiygDQ_wfQV80zPMfzByStZG5wnzd_z7tRwiSwZaDjUbL3jPtZT_YF4PGaCLecK9-jwZWzIU4hMLJ7ldGR86WkoErr6l1X9NelvH5lG5jxyvCj0262RvDPou807F2jcrBvVHm0nzQtHuKQ3hErmvXBa47pBnx_SXIVzxF6zgbcRY4BQscLNiA4Kf5JZickDx3RlKu1tMZM-tkBIpqbHUC41tO-GxCyHXZcFaxLpatfs4NPBDCtDnWIgPahxGhiojgs32iNtmwK38BleQx8ngTKN_C15UWk1vbH8MFiJg91fUo9Ii73Y7TnmdLjgbvuwY8Aa6b2ydtbL6UN5ZPWIy-VVEMS96PZYIxXqLPmw3HpKCUUnawVzCBPX2gCT9reemr08xNhXLp6KVpvRLd1NkAYd-tzvEX-xxKnojDVVd2kuOXB0yfQUuVExNG-66tkywpIhCLvZCbpKL7735UP7LHIlJAcVRTYX6TtLxV9pqVDNrk86FKAhEqNLgDIe-Kda9QkzatJj62LNXiRll0Uh5HZlr-xr4O_9mU3QeIzH-AcOrxGbZaVHKZgLiE_dfC2cx5P4gpLHm95uueOzdDH6bTKcTdvjbOSajMPeAwjuMOMTDo___rcZXUcCrWV5lSdOH_hV7_O-ILhEv0xYkd3q2DeeE3tWUSxOMzV7MvSW9nOQ2t2B8a6CCDq4ErPqpJ0yq0GbZBp94gxisrRd-7OSPPbIC-dz8mnI8FkanJqrSz1W_qHin65UCWjVpmkhd5qap9bmsGAhzyj7AVOTkT_8g040KNNwZOIgLmI8PhqN8epuJfSjNTeatD_CptDn4FyXPcU9XD2k3JF-RMK1mleMDI5nvfcI-a9kIJHUTnpzO7ZXZD5zrc0IZpzQv0hJpQ4PrtmePdP1-iaEq4TUR__5VCFo2BoYuKF92ZFmWp0Gvv-1dLKXOrgaLrIpilD7w_5dSEqWHq-ORh53UwNChtONOhT1xkkJfV19GJtR34k_2e1eVu-HMe4mXNZ6aF2KjRZMCR_UZjsJymXxQg_tOfZGvqrVy2djgwGWjVgSaMcBLQZNky7e3jOn4TWHYIQQL60pY4ddIgki1sCrirrhGa3gIKMQefuoggPOtJDUpmnJoqSH94kMXVWnujkIDhJ1jBGqyY3_92g7T8M33FNCAeM_hQK8jc_d9SL-cBLoKCvw22Kjkj6tU-dfRIb6psM2shVzWf_IMW6kqvckRmH0qNQDS8nLwfAz07TOQe2_AuFAbVJ2sF1xycJ7A.2yzJEc_L6NI0Yw3x6epc7w",
    },
    accessToken: {
      jwtToken: "eyJraWQiOiJ0WDFoVXZtRHJsT3lGeWhSZG9yazk4ZTI1ZlNTditGaHNxWGgwdXJTbVFRPSIsImFsZyI6IlJTMjU2In0.eyJvcmlnaW5fanRpIjoiOWFkMDYzMTYtODAwZS00NjYwLWEyNzctNjU4NTU3M2E1N2UyIiwic3ViIjoiNTdjMWNlYjAtMmEzMy00ZGU5LTgyOTItY2Q0YjIyMDQ1MTgxIiwiZXZlbnRfaWQiOiJiMDA3MjVjMi0zZDQ0LTQ2NjUtYjdkOS1mZjBiMGY1ZjM2NDYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjM5NjExMzI2LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV92TXVydXI5cjkiLCJleHAiOjE2Mzk2MTQ5MjYsImlhdCI6MTYzOTYxMTMyNiwianRpIjoiMTIyYjI5MDEtNGVhYi00ZDY3LWJiYTItNzI4OTk5ZDk0OTc4IiwiY2xpZW50X2lkIjoiNHRwc2diNjdndmdmaXU0Zmk3b3U5am4yOHAiLCJ1c2VybmFtZSI6InRlc3RfdXNlciJ9.RRjOaV5CM3PK6uysqmuUt9ufSqTAx0oFYpcaM-xQqWwBDM7GzIM06_ZSLGPqJ5kdWCpZEvt34P8_xq7bcKussjlekNFk1PCHNsHES7RoHLZWUbI_ZynJ-ErSpfTcijIZaYylgPIbooRs_IsaJl1pSvBVv2IN18HEGbFLYHN8c83bXBvheVWNvMFHkNS6yowO_QZDOHkWWYImOPd_Tro65R7MspjPwFhWJLEbbVq1SVzIYdKuxBCZN1kaw0PRX6OIapsVEJLFht20GoVLARFEmrmDpUB6s0b86FxbtlEiZuECNvlXrZpTugLFYMyzS6LM_3WnoPPXigjZxNB1XL01KA",
      payload: {
        origin_jti: "9ad06316-800e-4660-a277-6585573a57e2",
        sub: "57c1ceb0-2a33-4de9-8292-cd4b22045181",
        event_id: "b00725c2-3d44-4665-b7d9-ff0b0f5f3646",
        token_use: "access",
        scope: "aws.cognito.signin.user.admin",
        auth_time: 1639611326,
        iss: "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_vMurur9r9",
        exp: 1639614926,
        iat: 1639611326,
        jti: "122b2901-4eab-4d67-bba2-728999d94978",
        client_id: "4tpsgb67gvgfiu4fi7ou9jn28p",
        username: "test_user",
      },
    },
    clockDrift: 0,
  },
  authenticationFlowType: "USER_SRP_AUTH",
  storage: function MemoryStorage() {
  },
  keyPrefix: "CognitoIdentityServiceProvider.4tpsgb67gvgfiu4fi7ou9jn28p",
  userDataKey: "CognitoIdentityServiceProvider.4tpsgb67gvgfiu4fi7ou9jn28p.test_user.userData",
  attributes: {
    sub: "57c1ceb0-2a33-4de9-8292-cd4b22045181",
    email_verified: true,
    email: "miro.adamy@gmail.com",
  },
  preferredMFA: "NOMFA",
}
```

### Using JWT Tokens

Before - can call /hello/ OK

```text
GET {{endpoint}}/hello
---

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 4760
Connection: close
Date: Thu, 16 Dec 2021 22:51:11 GMT
x-amzn-RequestId: ee38029c-2ece-4f9d-91df-ebd29053e9c3
x-amz-apigw-id: KdtiyEs4liAFjWw=
X-Amzn-Trace-Id: Root=1-61bbc2de-160c0b555c44995a41718b6c;Sampled=0
X-Cache: Miss from cloudfront
Via: 1.1 e34b146b2a4038019e9b2a95fac837fd.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: VIE50-P1
X-Amz-Cf-Id: v_YhX99M_2nTrTP1udClJPyDh5I-1q_nHNpJWWPbvSunqvwaRXf9ZA==

Hello from TS Lambda - here are your buckets:[{"Name":"atmosphere-docs-publisher-pipelinebucket-13584wbaypu4a","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"atmosphere-docs-publisher-stack-pipelinebucket-1vkzhpuffn3jw","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"atmosphere.pe.reliant.net","CreationDate":"2020-06-30T11:27:11.000Z"},{"Name":"aws-000000-cloudtrail-bucket-469225108435","CreationDate":"2021-01-08T21:01:54.000Z"},{"Name":"aws-000000-dev-pfi-s3-cloudtrail-f993c42d5d94","CreationDate":"2019-05-27T17:02:54.000Z"},{"Name":"aws-000000-staging-s3-cloudtrail-d55ae2714f32","CreationDate":"2019-11-04T18:36:46.000Z"},{"Name":"aws-000000-test-trailbucket-xacajphh2n49","CreationDate":"2020-03-23T03:01:58.000Z"},{"Name":"aws-codestar-ca-central-1-469225108435","CreationDate":"2019-12-16T19:01:02.000Z"},{"Name":"aws-codestar-ca-central-1-469225108435-test-codestar-pipe","CreationDate":"2019-12-16T19:04:39.000Z"},{"Name":"aws-perspective-accesslogsbucket-2rkkn8cb3w6p","CreationDate":"2020-10-05T13:39:19.000Z"},{"Name":"aws-sam-cli-managed-default-samclisourcebucket-le1tzalhcdcv","CreationDate":"2021-11-27T17:45:26.000Z"},{"Name":"aws-stackset-drift-detec-serverlessdeploymentbuck-1i3jcfyd3g7wf","CreationDate":"2020-10-15T20:05:54.000Z"},{"Name":"cdk-hnb659fds-assets-469225108435-eu-central-1","CreationDate":"2021-12-08T18:11:49.000Z"},{"Name":"cdktoolkit-stagingbucket-o66kpow1db31","CreationDate":"2021-12-08T18:12:09.000Z"},{"Name":"cf-templates-cod90gs5ld9b-ca-central-1","CreationDate":"2020-03-13T14:14:33.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-east-1","CreationDate":"2020-07-01T04:49:53.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-east-2","CreationDate":"2020-03-18T19:57:30.000Z"},{"Name":"cf-templates-cod90gs5ld9b-us-west-1","CreationDate":"2020-03-31T00:57:52.000Z"},{"Name":"cfn-test-bucket-000","CreationDate":"2020-03-13T15:48:07.000Z"},{"Name":"codepipeline-us-east-1-707035415740","CreationDate":"2020-07-02T02:17:25.000Z"},{"Name":"codesuite-demo-lambdacopy-11u5l3eh1ge-localbucket-cxwcqqtyx205","CreationDate":"2020-06-26T05:03:59.000Z"},{"Name":"codesuite-demo-pipeline-k1nrvleque-artifactbucket-18p2zu2q87y6","CreationDate":"2020-06-26T05:04:01.000Z"},{"Name":"config-bucket-469225108435","CreationDate":"2020-06-05T04:19:35.000Z"},{"Name":"config-bucket-469225108435-manual","CreationDate":"2020-03-17T21:11:10.000Z"},{"Name":"config-bucket-ca-central-1-469225108435","CreationDate":"2021-01-08T21:02:17.000Z"},{"Name":"config-bucket-us-east-1-469225108435","CreationDate":"2021-01-08T21:01:59.000Z"},{"Name":"config-bucket-us-west-2-469225108435","CreationDate":"2021-01-08T21:02:34.000Z"},{"Name":"ct-bucket-469225108435","CreationDate":"2020-07-02T07:42:38.000Z"},{"Name":"dive-personalize-events-1","CreationDate":"2020-07-02T12:47:23.000Z"},{"Name":"docs.atmosphere.pe.reliant.net","CreationDate":"2020-07-02T13:21:16.000Z"},{"Name":"global-s3-logs-logs-20191108132607049200000001","CreationDate":"2019-11-12T19:30:19.000Z"},{"Name":"logs-000000","CreationDate":"2020-01-03T21:43:47.000Z"},{"Name":"logs-pvtr","CreationDate":"2019-11-13T20:02:40.000Z"},{"Name":"logzio-aws-serverless-test","CreationDate":"2020-10-16T20:11:08.000Z"},{"Name":"pe.reliant.net","CreationDate":"2020-07-06T21:45:10.000Z"},{"Name":"pvtr-logs","CreationDate":"2019-11-17T02:23:36.000Z"},{"Name":"resources-pckg-dev-serverlessdeploymentbucket-10scqkldy24f0","CreationDate":"2020-07-07T06:14:34.000Z"},{"Name":"resources-pckg-nothing-serverlessdeploymentbucket-1v1djcsazikhi","CreationDate":"2020-07-07T06:14:34.000Z"},{"Name":"saas-identity-with-cognito-iden-destinationbucket-urhlxpa7zsyf","CreationDate":"2020-06-27T22:39:20.000Z"},{"Name":"saas-identity-with-cognito-identit-artifactbucket-jyn1g3ocz6j0","CreationDate":"2020-06-27T22:39:23.000Z"},{"Name":"session-manager-logs-469225108435","CreationDate":"2020-06-27T23:36:24.000Z"},{"Name":"signup-dev.hv3.xyz","CreationDate":"2020-07-07T13:50:45.000Z"},{"Name":"stackset-my-stack-set-65e20d00-69b9-configbucket-wpivuvqt55kw","CreationDate":"2021-01-08T21:18:09.000Z"},{"Name":"stackset-my-stack-set-a1be8021-0bf0-configbucket-1297xtwlma389","CreationDate":"2021-01-08T21:18:49.000Z"},{"Name":"stackset-my-stack-set-cc887279-e71f-configbucket-p63zdl4r2lew","CreationDate":"2021-01-08T21:19:33.000Z"},{"Name":"stackset-stacksetoverrideandupdatetes-trailbucket-1p8qnz3a0vdx3","CreationDate":"2020-06-11T15:07:35.000Z"},{"Name":"test-automation-scripts","CreationDate":"2020-04-21T19:09:37.000Z"},{"Name":"test-ct-stack-trailbucket-v32pu3w2pg3a","CreationDate":"2020-03-31T01:00:17.000Z"},{"Name":"test-no-tag-bucket-1","CreationDate":"2020-08-31T17:44:39.000Z"},{"Name":"test-s3-sys-testcustomer-20201207175115286500000003","CreationDate":"2020-12-07T17:51:18.000Z"}]
```

Restrict access to API GW

Console - Authorizers, create new Authorizer, Cognito

Token Source => `Authorization`,

set Authorizer to hello

Redeploy API

Now:

```text
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 26
Connection: close
Date: Thu, 16 Dec 2021 22:58:02 GMT
x-amzn-RequestId: 8477653c-204c-4e5e-87e3-0bca25d2088e
x-amzn-ErrorType: UnauthorizedException
x-amz-apigw-id: KdujNGuqFiAFjXA=
X-Cache: Error from cloudfront
Via: 1.1 8fc54d3acff9539327f4d7a6bf40a31f.cloudfront.net (CloudFront)
X-Amz-Cf-Pop: VIE50-P1
X-Amz-Cf-Id: p_Fuf9zaUH7YDjXDU4FSWhlREchCBigFZ33xVdggBiZn30jEq02jbw==

{
  "message": "Unauthorized"
}
```

Retrieve fresh token add idToken to requests:

```text
@token = eyJraWQiOiJwanZGYmtIZlYySHE3bmh3cjc4WUFFR004WEFDVndqazlxSmZoZFFSRm9rPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1N2MxY2ViMC0yYTMzLTRkZTktODI5Mi1jZDRiMjIwNDUxODEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfdk11cnVyOXI5IiwiY29nbml0bzp1c2VybmFtZSI6InRlc3RfdXNlciIsIm9yaWdpbl9qdGkiOiIxZmEzMTQ0MC0yN2NlLTQ1MDgtOTU2NS0wYWYyNTc0OTk5YTMiLCJhdWQiOiI0dHBzZ2I2N2d2Z2ZpdTRmaTdvdTlqbjI4cCIsImV2ZW50X2lkIjoiMTE3NzkyMDYtN2MwNC00MjkzLTg0ZTUtYzE2ZjFkOGU0YmU2IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2Mzk2OTU2MTIsImV4cCI6MTYzOTY5OTIxMiwiaWF0IjoxNjM5Njk1NjEyLCJqdGkiOiI1MjJiOGU5YS00OGFiLTQxYzktODQ2MS1jMGQ5MmQ1YThhNTgiLCJlbWFpbCI6Im1pcm8uYWRhbXlAZ21haWwuY29tIn0.LdChMdFgKG4hAMR_wIA-uB2rhfzvyX8hVrL5CtPNp2Zmj_GMiwJFioj9KF0quu3OQSMOfpPjlYUQCGHs9IuHwJc_P4uwFdBRA2PsZwqfEMaNXtOPQYYHlxuKhIDEcgMLToaYUpUlAB0Y0GNMC-CKtk1lVuZOEdfAXsqX310XVLqquYwpG4HBP5JhYYRsORzaFpYTr-4J8Z9wzMqzFCuTiZexm7RUhhnO4R5WdbyhmnVtX0AZFNJbTFXayRi38unSMtt9sm4s8Y3e-YLcZPf6j6D4Uavvz447Cm7zAb8K3r-XF8re25D5FoZ7dX6bQkMxjJH_b-AiHRHdukhudbr4xQ

GET {{endpoint}}/hello
Authorization: {{token}}
###
```

Now it works

### Understanding JWT tokens

See <https://jwt.io/>

Cognito user groups: add user to the group, use for access control

### Cognito with CDK

Add new AuthorizerWrapper - creates Cognito User Pool and use it in stack:

```text
Stack Space-Finder-Backend (SpaceFinder)
Resources
[+] AWS::Cognito::UserPool SpaceUserPool SpaceUserPool6AB542DC 
[~] AWS::Lambda::Function SpacesTable-Create SpacesTableCreate125CEC52 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 5483b486abd178c5b05b4811514f57e0f773e69c6f9283ebb255177ca18de941.zip
 │       └─ [+] 1319278491390ef2a7def384bab8f1750d6df39ec2661fc787565399235007be.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.5483b486abd178c5b05b4811514f57e0f773e69c6f9283ebb255177ca18de941
         └─ [+] asset.1319278491390ef2a7def384bab8f1750d6df39ec2661fc787565399235007be
[~] AWS::Lambda::Function SpacesTable-Update SpacesTableUpdate931099D2 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 47230dd928f67a8178e3b778c3b1afa7a522aa455c280df8e9f85ebbf49643f9.zip
 │       └─ [+] 6efe027e63813ff0b8574c0d5f1eba019ae6c5b405cc8060d4578bf1b95e2021.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.47230dd928f67a8178e3b778c3b1afa7a522aa455c280df8e9f85ebbf49643f9
         └─ [+] asset.6efe027e63813ff0b8574c0d5f1eba019ae6c5b405cc8060d4578bf1b95e2021

Outputs
[+] Output UserPoolId UserPoolId: {"Value":{"Ref":"SpaceUserPool6AB542DC"}}
```

See 07-authorizer-wrapper

Add authorizer and attach to hello

```text
Stack Space-Finder-Backend (SpaceFinder)
Resources
[-] AWS::ApiGateway::Deployment SpaceApiDeploymentA2B9E765605b1d2e5c183140f847de2c2f7b20c9 destroy
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E765e5c8dbb757fdc2f782da39c6e85ecce3 
[+] AWS::Cognito::UserPool SpaceUserPool SpaceUserPool6AB542DC 
[+] AWS::Cognito::UserPoolClient SpaceUserPool/SpaceUserPool-client SpaceUserPoolSpaceUserPoolclient4839E5E8 
[+] AWS::ApiGateway::Authorizer SpaceUserAuthorizer SpaceUserAuthorizer401AE1AA 
[~] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
 └─ [~] DeploymentId
     └─ [~] .Ref:
         ├─ [-] SpaceApiDeploymentA2B9E765605b1d2e5c183140f847de2c2f7b20c9
         └─ [+] SpaceApiDeploymentA2B9E765e5c8dbb757fdc2f782da39c6e85ecce3
[~] AWS::ApiGateway::Method SpaceApi/Default/hello/GET SpaceApihelloGET65983C27 
 ├─ [~] AuthorizationType
 │   ├─ [-] NONE
 │   └─ [+] COGNITO_USER_POOLS
 └─ [+] AuthorizerId
     └─ {"Ref":"SpaceUserAuthorizer401AE1AA"}
[~] AWS::Lambda::Function SpacesTable-Create SpacesTableCreate125CEC52 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 5483b486abd178c5b05b4811514f57e0f773e69c6f9283ebb255177ca18de941.zip
 │       └─ [+] 1319278491390ef2a7def384bab8f1750d6df39ec2661fc787565399235007be.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.5483b486abd178c5b05b4811514f57e0f773e69c6f9283ebb255177ca18de941
         └─ [+] asset.1319278491390ef2a7def384bab8f1750d6df39ec2661fc787565399235007be
[~] AWS::Lambda::Function SpacesTable-Update SpacesTableUpdate931099D2 
 ├─ [~] Code
 │   └─ [~] .S3Key:
 │       ├─ [-] 47230dd928f67a8178e3b778c3b1afa7a522aa455c280df8e9f85ebbf49643f9.zip
 │       └─ [+] 6efe027e63813ff0b8574c0d5f1eba019ae6c5b405cc8060d4578bf1b95e2021.zip
 └─ [~] Metadata
     └─ [~] .aws:asset:path:
         ├─ [-] asset.47230dd928f67a8178e3b778c3b1afa7a522aa455c280df8e9f85ebbf49643f9
         └─ [+] asset.6efe027e63813ff0b8574c0d5f1eba019ae6c5b405cc8060d4578bf1b95e2021

Outputs
[+] Output UserPoolId UserPoolId: {"Value":{"Ref":"SpaceUserPool6AB542DC"}}
[+] Output UserPoolClientId UserPoolClientId: {"Value":{"Ref":"SpaceUserPoolSpaceUserPoolclient4839E5E8"}}
```

and deploy:

07-authorizer-api

Put the resulting IDs in the config:

```text
 ✅  Space-Finder-Backend (SpaceFinder)

Outputs:
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/
Space-Finder-Backend.UserPoolClientId = 6hkmkdf2j11ft5potp0paoqo1p
Space-Finder-Backend.UserPoolId = eu-central-1_RsHsBNMan

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38
```

Create test user and enable it via console
`aws cognito-idp admin-set-user-password --user-pool-id eu-central-1_RsHsBNMan --username test_user --password 'Qwerty123!' --permanent`

Get the new token from auth test, put to requests.http => works

07-cdk-pool

### Using groups

Create group via cdk - must use Cfn construct

Change the code of hello to print event, deploy, add test user to admins

Formatted: (note the cognito:groups)

```json
{
  "resource": "/hello",
  "path": "/hello",
  "httpMethod": "GET",
  "headers": {
    "Accept-Encoding": "gzip, deflate",
    "Authorization": "eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0JJVW1iZEZTWDZyRExFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOTJlN2JmZi01ZGFmLTQ3ODAtOTk0Yy0xYzM3ZGEyNTljYzIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1JzSHNCTk1hbiIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJvcmlnaW5fanRpIjoiY2I3NWQxNjYtNDExNS00MmU2LWFiODMtZGExYTBlZGY2MTI5IiwiYXVkIjoiNmhrbWtkZjJqMTFmdDVwb3RwMHBhb3FvMXAiLCJldmVudF9pZCI6ImVkN2RjMGZhLWFmMGYtNDk2Ni1iOTQyLWJmYjg1NTkwNDMwYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM5NzQxMTY1LCJleHAiOjE2Mzk3NDQ3NjUsImlhdCI6MTYzOTc0MTE2NSwianRpIjoiNWE3Y2YxYjUtNjk3My00MmE3LWI2OWEtMjY2N2U3N2E4YTlhIiwiZW1haWwiOiJtaXJvLmFkYW15QGdtYWlsLmNvbSJ9.n-mFfIWxCphXhJFPaubqIP4w3O0Au3ddVwwUbhtFiAppSTYnqhobI0-N7tAU_Rj63WwCHyHZF6u5TesI1psTqhv9cVn3XyGjOvVsmdRpp2p7R1HZRwrhB7tv0ccatGXa-w8tO0g1WF1GJ1cHm3FHABj8Ra7hl2A-W57sxzB-catblu2gsvqKpgVLL2ZIhK6cLNzWhlZSv4pc5Iu8ScyxrgQvEB5viTIQP0VcsvCy-8JXTihgSlxqdr_a6hyQv13uzaBvTa5C8nFbxqZEoh2leftdioX9jOXbPN35_gI9YZOcBXNHC6bbiJJRXCnY1PL-84AlIVluoHvDvYVP8sDKyQ",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "SK",
    "Host": "67183kcdkf.execute-api.eu-central-1.amazonaws.com",
    "User-Agent": "vscode-restclient",
    "Via": "1.1 4f41a6860ab116e6fd0a110c5ba1420b.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "UBwnjDoH0xnyewdJwT6v1PxF2FNUTIUB6gyMQuXNd2_DrdnTiWg9WA==",
    "X-Amzn-Trace-Id": "Root=1-61bc7725-516e1d226fba72565276b96d",
    "X-Forwarded-For": "95.102.108.75, 130.176.219.16",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "multiValueHeaders": {
    "Accept-Encoding": [
      "gzip, deflate"
    ],
    "Authorization": [
      "eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0JJVW1iZEZTWDZyRExFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOTJlN2JmZi01ZGFmLTQ3ODAtOTk0Yy0xYzM3ZGEyNTljYzIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1JzSHNCTk1hbiIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJvcmlnaW5fanRpIjoiY2I3NWQxNjYtNDExNS00MmU2LWFiODMtZGExYTBlZGY2MTI5IiwiYXVkIjoiNmhrbWtkZjJqMTFmdDVwb3RwMHBhb3FvMXAiLCJldmVudF9pZCI6ImVkN2RjMGZhLWFmMGYtNDk2Ni1iOTQyLWJmYjg1NTkwNDMwYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM5NzQxMTY1LCJleHAiOjE2Mzk3NDQ3NjUsImlhdCI6MTYzOTc0MTE2NSwianRpIjoiNWE3Y2YxYjUtNjk3My00MmE3LWI2OWEtMjY2N2U3N2E4YTlhIiwiZW1haWwiOiJtaXJvLmFkYW15QGdtYWlsLmNvbSJ9.n-mFfIWxCphXhJFPaubqIP4w3O0Au3ddVwwUbhtFiAppSTYnqhobI0-N7tAU_Rj63WwCHyHZF6u5TesI1psTqhv9cVn3XyGjOvVsmdRpp2p7R1HZRwrhB7tv0ccatGXa-w8tO0g1WF1GJ1cHm3FHABj8Ra7hl2A-W57sxzB-catblu2gsvqKpgVLL2ZIhK6cLNzWhlZSv4pc5Iu8ScyxrgQvEB5viTIQP0VcsvCy-8JXTihgSlxqdr_a6hyQv13uzaBvTa5C8nFbxqZEoh2leftdioX9jOXbPN35_gI9YZOcBXNHC6bbiJJRXCnY1PL-84AlIVluoHvDvYVP8sDKyQ"
    ],
    "CloudFront-Forwarded-Proto": [
      "https"
    ],
    "CloudFront-Is-Desktop-Viewer": [
      "true"
    ],
    "CloudFront-Is-Mobile-Viewer": [
      "false"
    ],
    "CloudFront-Is-SmartTV-Viewer": [
      "false"
    ],
    "CloudFront-Is-Tablet-Viewer": [
      "false"
    ],
    "CloudFront-Viewer-Country": [
      "SK"
    ],
    "Host": [
      "67183kcdkf.execute-api.eu-central-1.amazonaws.com"
    ],
    "User-Agent": [
      "vscode-restclient"
    ],
    "Via": [
      "1.1 4f41a6860ab116e6fd0a110c5ba1420b.cloudfront.net (CloudFront)"
    ],
    "X-Amz-Cf-Id": [
      "UBwnjDoH0xnyewdJwT6v1PxF2FNUTIUB6gyMQuXNd2_DrdnTiWg9WA=="
    ],
    "X-Amzn-Trace-Id": [
      "Root=1-61bc7725-516e1d226fba72565276b96d"
    ],
    "X-Forwarded-For": [
      "95.102.108.75, 130.176.219.16"
    ],
    "X-Forwarded-Port": [
      "443"
    ],
    "X-Forwarded-Proto": [
      "https"
    ]
  },
  "queryStringParameters": null,
  "multiValueQueryStringParameters": null,
  "pathParameters": null,
  "stageVariables": null,
  "requestContext": {
    "resourceId": "lpcuyd",
    "authorizer": {
      "claims": {
        "sub": "f92e7bff-5daf-4780-994c-1c37da259cc2",
        "cognito:groups": "admins",
        "email_verified": "true",
        "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_RsHsBNMan",
        "cognito:username": "test_user",
        "origin_jti": "cb75d166-4115-42e6-ab83-da1a0edf6129",
        "aud": "6hkmkdf2j11ft5potp0paoqo1p",
        "event_id": "ed7dc0fa-af0f-4966-b942-bfb85590430b",
        "token_use": "id",
        "auth_time": "1639741165",
        "exp": "Fri Dec 17 12:39:25 UTC 2021",
        "iat": "Fri Dec 17 11:39:25 UTC 2021",
        "jti": "5a7cf1b5-6973-42a7-b69a-2667e77a8a9a",
        "email": "miro.adamy@gmail.com"
      }
    },
    "resourcePath": "/hello",
    "httpMethod": "GET",
    "extendedRequestId": "KfeN4EYeliAFXTQ=",
    "requestTime": "17/Dec/2021:11:40:21 +0000",
    "path": "/prod/hello",
    "accountId": "469225108435",
    "protocol": "HTTP/1.1",
    "stage": "prod",
    "domainPrefix": "67183kcdkf",
    "requestTimeEpoch": 1639741221469,
    "requestId": "a2ab7d4d-f8d4-448e-a557-3f0a5dd6bc77",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": null,
      "cognitoIdentityId": null,
      "caller": null,
      "sourceIp": "95.102.108.75",
      "principalOrgId": null,
      "accessKey": null,
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": null,
      "userAgent": "vscode-restclient",
      "user": null
    },
    "domainName": "67183kcdkf.execute-api.eu-central-1.amazonaws.com",
    "apiId": "67183kcdkf"
  },
  "body": null,
  "isBase64Encoded": false
}
```

Groups can be used for access control

07-cognito-groups

## 08 - Cognito Identity Pools

Manually created demo identity pool

```typescript
// Initialize the Amazon Cognito credentials provider
CognitoCachingCredentialsProvider credentialsProvider = new CognitoCachingCredentialsProvider(
    getApplicationContext(),
    "eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071", // Identity pool ID
    Regions.EU_CENTRAL_1 // Region
);
```

Select Use role from token.

- add the Identity pool ID to config and Amplify config
- add method to get temp credentials

Refactor the tester method and call it

```json
{
  expired: false,
  expireTime: {
  },
  refreshCallbacks: [
  ],
  accessKeyId: "ASIAW2P766PJUN3FN5JQ",
  sessionToken: "IQoJb3JpZ2luX2VjEMD//////////wEaDGV1LWNlbnRyYWwtMSJIMEYCIQDZTcCy8aVt/vR76JQpgzlVEb4WD+LgN4OVWeBYSx19ZQIhAOYBr3c1HeJrIS4D6/nYjpjnEBLYKeuAsDfjJ7p3bGfoKt8ECKn//////////wEQAxoMNDY5MjI1MTA4NDM1Igz1VGbmIR4aeEIzaZ8qswQvU6ItL+KsPtoL9VqgHHIZwfYqGw+w1OJVCgLl32Z/pJeEyxdkqpXVDtHaHa8JPYDyhXia81Xl87lHzM8Sn/ORgrz84+KS6+AaVgr6Sj4HhFFszSZMfvx+iLR0wCkyR+I151Mxxc7OE2XHaUanG5s7j099/kS+iR9zsx+FfPs4i45y6OWWdcPOpYUPy6RFV8tRZBNCuEBed+xrpE/w8Znbfv8VJf0/zwe3wcfRigBHb64VuE9Q436Gs/ypg8IBQjvd9AFRjcRH1t7EjMyk2KvVM6+8bqjtiAlumS0qlX0hiQkFu1OS1b7VRs5MVQ7+a53Xz7idBlTMKzbvFFdI6zC+1jqUwy65fdCtS3Qqo1blyVQBOLE8u6NCMZLZ/IvARnsfcvLGScFd8n+/VH4EI1L1OMgfThFMUjbv+uZ9WERsVO6lsoNGdea/bxdp4NgRQeGSS1NfoMLvyHE75/0Wdt8uvcF4+AnVsWmBNxZrs//XCfqlBrNKzu0jjkKczrFbSyNeSUrZiPz7+IStB4+j+YJo8bjSI43HZ47qJyOolmeNBLMNfmwumw4faDGeMfybvnwGOVnPDj9l7qbOjscEsZyLFkaKOAk7WARqbYEM3Rw55eSC+OtPj/CAU6eDI/c/fsA72jfEjewcS5gPqoqXcqrb68LpR3x2gVgg3ebjHL960cC/16PP70BmepkUDfACOF8BzPGlGiS6wqvWFpsxc1Xq/6NGQ1IlK0r00CY4uhfbyrTx3jCl2/KNBjqEAgwWq9PZFOH+YxgL+0Lytk9z5z9m7JUpd4GXEthJjQ2TLfFr3r3IIeLfcZR0vyQsXRcMzvUnH9QKXmaTE7uRalL4phzRZGx9V+IIn6YxEo4UBmtlysbL18bdEBlvbXFHXrUSOMKTbyQmfD32GsYvsXDfBQ2fmxVmWbvIw3lmHMwR45KdQ/KlsGCvNQSheWd9zwO3ngxB6pEqdHiBGtyyCbSrYuiDRnX9AeS6FCotzLh80yJLRqfbS5I2VkRZL1LvuzrL7Ml94Dzw0smpNgpe12G6Ac73/F9lGimxiTaGeFRMQfbxhm9fPkdylGh+z4UZZxwRm7ciQvC5fkeUGcLv120hyPKR",
  params: {
    IdentityPoolId: "eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071",
    Logins: {
      "cognito-idp.eu-central-1.amazonaws.com/eu-central-1_RsHsBNMan": "eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0JJVW1iZEZTWDZyRExFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOTJlN2JmZi01ZGFmLTQ3ODAtOTk0Yy0xYzM3ZGEyNTljYzIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1JzSHNCTk1hbiIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJvcmlnaW5fanRpIjoiMzYxN2Y3OTgtODIzOS00M2U2LWJjZmUtNTJkODg4ZWI2YjZjIiwiYXVkIjoiNmhrbWtkZjJqMTFmdDVwb3RwMHBhb3FvMXAiLCJldmVudF9pZCI6ImU5YTQ2ODI2LTU3YTQtNDhhZC04NDQ4LTM2YjRjMTk2YzlmMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM5NzU1MTcyLCJleHAiOjE2Mzk3NTg3NzIsImlhdCI6MTYzOTc1NTE3MiwianRpIjoiMWE1NWExY2MtNmJkZC00NTJhLTkyMjAtMTUyNzAxNDM3YWRkIiwiZW1haWwiOiJtaXJvLmFkYW15QGdtYWlsLmNvbSJ9.g-CLgjQEbcS8ctIJfFCKAWobI3udSM7OyogmlStdCqb7YhAoN7wX0uUg5-aeQ07dForwRDJqMfTtlzyTdOX_6YHM3L9r_tlqkXLr9mNZ1BRlP2y4tLfwllXYf6mRhIUeeAITMdesNwFTwoc4IFig4rgQGRH6N226mZNA7LK8GySDkbAW33Q8xluuNJPyHLNklU1fUUZdrrDA8C-UPPxXAkHXpQqEuCPzePCG7tvLJp1CumpS0JW2NzV22gzDohYuhQT5ekCDKt61cSFDxjLP6V93nG5tU_hBf1uE6mu4XcKQshWYA045r1o-Ga4YsTTqTKkxVyZGCy_F-dcdddVpJw",
    },
    RoleSessionName: "web-identity",
    IdentityId: "eu-central-1:1027035b-516a-42af-a36e-2a57a58a4805",
  },
  data: {
    IdentityId: "eu-central-1:1027035b-516a-42af-a36e-2a57a58a4805",
    Credentials: {
      AccessKeyId: "ASIAW2P766PJUN3FN5JQ",
      SecretKey: "ChO2bjnUK8jp6LxZTNfe++d52AAirFlVKDoG/4yo",
      SessionToken: "IQoJb3JpZ2luX2VjEMD//////////wEaDGV1LWNlbnRyYWwtMSJIMEYCIQDZTcCy8aVt/vR76JQpgzlVEb4WD+LgN4OVWeBYSx19ZQIhAOYBr3c1HeJrIS4D6/nYjpjnEBLYKeuAsDfjJ7p3bGfoKt8ECKn//////////wEQAxoMNDY5MjI1MTA4NDM1Igz1VGbmIR4aeEIzaZ8qswQvU6ItL+KsPtoL9VqgHHIZwfYqGw+w1OJVCgLl32Z/pJeEyxdkqpXVDtHaHa8JPYDyhXia81Xl87lHzM8Sn/ORgrz84+KS6+AaVgr6Sj4HhFFszSZMfvx+iLR0wCkyR+I151Mxxc7OE2XHaUanG5s7j099/kS+iR9zsx+FfPs4i45y6OWWdcPOpYUPy6RFV8tRZBNCuEBed+xrpE/w8Znbfv8VJf0/zwe3wcfRigBHb64VuE9Q436Gs/ypg8IBQjvd9AFRjcRH1t7EjMyk2KvVM6+8bqjtiAlumS0qlX0hiQkFu1OS1b7VRs5MVQ7+a53Xz7idBlTMKzbvFFdI6zC+1jqUwy65fdCtS3Qqo1blyVQBOLE8u6NCMZLZ/IvARnsfcvLGScFd8n+/VH4EI1L1OMgfThFMUjbv+uZ9WERsVO6lsoNGdea/bxdp4NgRQeGSS1NfoMLvyHE75/0Wdt8uvcF4+AnVsWmBNxZrs//XCfqlBrNKzu0jjkKczrFbSyNeSUrZiPz7+IStB4+j+YJo8bjSI43HZ47qJyOolmeNBLMNfmwumw4faDGeMfybvnwGOVnPDj9l7qbOjscEsZyLFkaKOAk7WARqbYEM3Rw55eSC+OtPj/CAU6eDI/c/fsA72jfEjewcS5gPqoqXcqrb68LpR3x2gVgg3ebjHL960cC/16PP70BmepkUDfACOF8BzPGlGiS6wqvWFpsxc1Xq/6NGQ1IlK0r00CY4uhfbyrTx3jCl2/KNBjqEAgwWq9PZFOH+YxgL+0Lytk9z5z9m7JUpd4GXEthJjQ2TLfFr3r3IIeLfcZR0vyQsXRcMzvUnH9QKXmaTE7uRalL4phzRZGx9V+IIn6YxEo4UBmtlysbL18bdEBlvbXFHXrUSOMKTbyQmfD32GsYvsXDfBQ2fmxVmWbvIw3lmHMwR45KdQ/KlsGCvNQSheWd9zwO3ngxB6pEqdHiBGtyyCbSrYuiDRnX9AeS6FCotzLh80yJLRqfbS5I2VkRZL1LvuzrL7Ml94Dzw0smpNgpe12G6Ac73/F9lGimxiTaGeFRMQfbxhm9fPkdylGh+z4UZZxwRm7ciQvC5fkeUGcLv120hyPKR",
      Expiration: {
      },
    },
  },
  _identityId: "eu-central-1:1027035b-516a-42af-a36e-2a57a58a4805",
  _clientConfig: {
    region: "eu-central-1",
  },
  webIdentityCredentials: {
    expired: true,
    expireTime: null,
    refreshCallbacks: [
    ],
    accessKeyId: undefined,
    sessionToken: undefined,
    params: {
      IdentityPoolId: "eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071",
      Logins: {
        "cognito-idp.eu-central-1.amazonaws.com/eu-central-1_RsHsBNMan": "eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0JJVW1iZEZTWDZyRExFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOTJlN2JmZi01ZGFmLTQ3ODAtOTk0Yy0xYzM3ZGEyNTljYzIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1JzSHNCTk1hbiIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJvcmlnaW5fanRpIjoiMzYxN2Y3OTgtODIzOS00M2U2LWJjZmUtNTJkODg4ZWI2YjZjIiwiYXVkIjoiNmhrbWtkZjJqMTFmdDVwb3RwMHBhb3FvMXAiLCJldmVudF9pZCI6ImU5YTQ2ODI2LTU3YTQtNDhhZC04NDQ4LTM2YjRjMTk2YzlmMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM5NzU1MTcyLCJleHAiOjE2Mzk3NTg3NzIsImlhdCI6MTYzOTc1NTE3MiwianRpIjoiMWE1NWExY2MtNmJkZC00NTJhLTkyMjAtMTUyNzAxNDM3YWRkIiwiZW1haWwiOiJtaXJvLmFkYW15QGdtYWlsLmNvbSJ9.g-CLgjQEbcS8ctIJfFCKAWobI3udSM7OyogmlStdCqb7YhAoN7wX0uUg5-aeQ07dForwRDJqMfTtlzyTdOX_6YHM3L9r_tlqkXLr9mNZ1BRlP2y4tLfwllXYf6mRhIUeeAITMdesNwFTwoc4IFig4rgQGRH6N226mZNA7LK8GySDkbAW33Q8xluuNJPyHLNklU1fUUZdrrDA8C-UPPxXAkHXpQqEuCPzePCG7tvLJp1CumpS0JW2NzV22gzDohYuhQT5ekCDKt61cSFDxjLP6V93nG5tU_hBf1uE6mu4XcKQshWYA045r1o-Ga4YsTTqTKkxVyZGCy_F-dcdddVpJw",
      },
      RoleSessionName: "web-identity",
      IdentityId: "eu-central-1:1027035b-516a-42af-a36e-2a57a58a4805",
    },
    data: null,
    _clientConfig: {
      region: "eu-central-1",
    },
  },
  cognito: {
    config: {
      credentials: [Circular],
      credentialProvider: {
        providers: [
          function () { return new AWS.EnvironmentCredentials('AWS'); },
          function () { return new AWS.EnvironmentCredentials('AMAZON'); },
          function () { return new AWS.SharedIniFileCredentials(); },
          function () { return new AWS.ECSCredentials(); },
          function () { return new AWS.ProcessCredentials(); },
          function () { return new AWS.TokenFileWebIdentityCredentials(); },
          function () { return new AWS.EC2MetadataCredentials(); },
        ],
        resolveCallbacks: [
        ],
      },
      region: "eu-central-1",
      logger: null,
      apiVersions: {
      },
      apiVersion: null,
      endpoint: "cognito-identity.eu-central-1.amazonaws.com",
      httpOptions: {
        timeout: 120000,
      },
      maxRetries: undefined,
      maxRedirects: 10,
      paramValidation: true,
      sslEnabled: true,
      s3ForcePathStyle: false,
      s3BucketEndpoint: false,
      s3DisableBodySigning: true,
      s3UsEast1RegionalEndpoint: "legacy",
      s3UseArnRegion: undefined,
      computeChecksums: true,
      convertResponseTypes: true,
      correctClockSkew: false,
      customUserAgent: null,
      dynamoDbCrc32: true,
      systemClockOffset: 0,
      signatureVersion: "v4",
      signatureCache: true,
      retryDelayOptions: {
      },
      useAccelerateEndpoint: false,
      clientSideMonitoring: false,
      endpointDiscoveryEnabled: undefined,
      endpointCacheSize: 1000,
      hostPrefixEnabled: true,
      stsRegionalEndpoints: "legacy",
      useFipsEndpoint: false,
      useDualstackEndpoint: false,
      params: {
        IdentityPoolId: "eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071",
        Logins: {
          "cognito-idp.eu-central-1.amazonaws.com/eu-central-1_RsHsBNMan": "eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0JJVW1iZEZTWDZyRExFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOTJlN2JmZi01ZGFmLTQ3ODAtOTk0Yy0xYzM3ZGEyNTljYzIiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbnMiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX1JzSHNCTk1hbiIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJvcmlnaW5fanRpIjoiMzYxN2Y3OTgtODIzOS00M2U2LWJjZmUtNTJkODg4ZWI2YjZjIiwiYXVkIjoiNmhrbWtkZjJqMTFmdDVwb3RwMHBhb3FvMXAiLCJldmVudF9pZCI6ImU5YTQ2ODI2LTU3YTQtNDhhZC04NDQ4LTM2YjRjMTk2YzlmMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM5NzU1MTcyLCJleHAiOjE2Mzk3NTg3NzIsImlhdCI6MTYzOTc1NTE3MiwianRpIjoiMWE1NWExY2MtNmJkZC00NTJhLTkyMjAtMTUyNzAxNDM3YWRkIiwiZW1haWwiOiJtaXJvLmFkYW15QGdtYWlsLmNvbSJ9.g-CLgjQEbcS8ctIJfFCKAWobI3udSM7OyogmlStdCqb7YhAoN7wX0uUg5-aeQ07dForwRDJqMfTtlzyTdOX_6YHM3L9r_tlqkXLr9mNZ1BRlP2y4tLfwllXYf6mRhIUeeAITMdesNwFTwoc4IFig4rgQGRH6N226mZNA7LK8GySDkbAW33Q8xluuNJPyHLNklU1fUUZdrrDA8C-UPPxXAkHXpQqEuCPzePCG7tvLJp1CumpS0JW2NzV22gzDohYuhQT5ekCDKt61cSFDxjLP6V93nG5tU_hBf1uE6mu4XcKQshWYA045r1o-Ga4YsTTqTKkxVyZGCy_F-dcdddVpJw",
        },
        RoleSessionName: "web-identity",
        IdentityId: "eu-central-1:1027035b-516a-42af-a36e-2a57a58a4805",
      },
    },
    isGlobalEndpoint: false,
    endpoint: {
      protocol: "https:",
      host: "cognito-identity.eu-central-1.amazonaws.com",
      port: 443,
      hostname: "cognito-identity.eu-central-1.amazonaws.com",
      pathname: "/",
      path: "/",
      href: "https://cognito-identity.eu-central-1.amazonaws.com/",
    },
    _events: {
      apiCallAttempt: [
        function EVENTS_BUBBLE(event) {
          var baseClass = Object.getPrototypeOf(attachOn);
          if (baseClass._events) baseClass.emit('apiCallAttempt', [event]);
        },
      ],
      apiCall: [
        function CALL_EVENTS_BUBBLE(event) {
          var baseClass = Object.getPrototypeOf(attachOn);
          if (baseClass._events) baseClass.emit('apiCall', [event]);
        },
      ],
    },
    MONITOR_EVENTS_BUBBLE: function EVENTS_BUBBLE(event) {
      var baseClass = Object.getPrototypeOf(attachOn);
      if (baseClass._events) baseClass.emit('apiCallAttempt', [event]);
    },
    CALL_EVENTS_BUBBLE: function CALL_EVENTS_BUBBLE(event) {
      var baseClass = Object.getPrototypeOf(attachOn);
      if (baseClass._events) baseClass.emit('apiCall', [event]);
    },
    _clientId: 1,
  },
  sts: {
    config: {
      credentials: [Circular],
      credentialProvider: {
        providers: [
          function () { return new AWS.EnvironmentCredentials('AWS'); },
          function () { return new AWS.EnvironmentCredentials('AMAZON'); },
          function () { return new AWS.SharedIniFileCredentials(); },
          function () { return new AWS.ECSCredentials(); },
          function () { return new AWS.ProcessCredentials(); },
          function () { return new AWS.TokenFileWebIdentityCredentials(); },
          function () { return new AWS.EC2MetadataCredentials(); },
        ],
        resolveCallbacks: [
        ],
      },
      region: "eu-central-1",
      logger: null,
      apiVersions: {
      },
      apiVersion: null,
      endpoint: "https://sts.amazonaws.com",
      httpOptions: {
        timeout: 120000,
      },
      maxRetries: undefined,
      maxRedirects: 10,
      paramValidation: true,
      sslEnabled: true,
      s3ForcePathStyle: false,
      s3BucketEndpoint: false,
      s3DisableBodySigning: true,
      s3UsEast1RegionalEndpoint: "legacy",
      s3UseArnRegion: undefined,
      computeChecksums: true,
      convertResponseTypes: true,
      correctClockSkew: false,
      customUserAgent: null,
      dynamoDbCrc32: true,
      systemClockOffset: 0,
      signatureVersion: "v4",
      signatureCache: true,
      retryDelayOptions: {
      },
      useAccelerateEndpoint: false,
      clientSideMonitoring: false,
      endpointDiscoveryEnabled: undefined,
      endpointCacheSize: 1000,
      hostPrefixEnabled: true,
      stsRegionalEndpoints: "legacy",
      useFipsEndpoint: false,
      useDualstackEndpoint: false,
      signingRegion: "us-east-1",
    },
    isGlobalEndpoint: true,
    signingRegion: "us-east-1",
    endpoint: {
      protocol: "https:",
      host: "sts.amazonaws.com",
      port: 443,
      hostname: "sts.amazonaws.com",
      pathname: "/",
      path: "/",
      href: "https://sts.amazonaws.com/",
    },
    _events: {
      apiCallAttempt: [
        function EVENTS_BUBBLE(event) {
          var baseClass = Object.getPrototypeOf(attachOn);
          if (baseClass._events) baseClass.emit('apiCallAttempt', [event]);
        },
      ],
      apiCall: [
        function CALL_EVENTS_BUBBLE(event) {
          var baseClass = Object.getPrototypeOf(attachOn);
          if (baseClass._events) baseClass.emit('apiCall', [event]);
        },
      ],
    },
    MONITOR_EVENTS_BUBBLE: function EVENTS_BUBBLE(event) {
      var baseClass = Object.getPrototypeOf(attachOn);
      if (baseClass._events) baseClass.emit('apiCallAttempt', [event]);
    },
    CALL_EVENTS_BUBBLE: function CALL_EVENTS_BUBBLE(event) {
      var baseClass = Object.getPrototypeOf(attachOn);
      if (baseClass._events) baseClass.emit('apiCall', [event]);
    },
    _clientId: 2,
  },
}
```

And now for all of this in CDK :-)

Tag: 08-manual-setup

### Identity pools in CDK

- new file - IdentityPoolWrapper.ts
- must use CfnXXX construct
- manual / laborious setup of roles: the trust portion is kinda complex

Must use the generated IAM roles for the trust relationship as well as 'View Policy Document' from trust relationship: - essentially recreating something like this in CDK code

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "cognito-identity.amazonaws.com:aud": "eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071"
        },
        "ForAnyValue:StringLike": {
          "cognito-identity.amazonaws.com:amr": "authenticated"
        }
      }
    }
  ]
}
```

We have added admin specific role that actually has some privileges.

We are still not done - need to connect roles to pool, but interim state is in 08-iam-roles-creation

### Attaching roles

See `attachRoles()`

CDK/Typescript catches issues with order of initialization:

```text
    private initialize() {
        this.createUserPool();
        this.addUserPoolClient();
        this.createAuthorizer();
        this.createAdminsGroup();
        this.initializeIdentityPoolWrapper();
    }

---
✨  Done in 0.06s.
/Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-back-end/infrastructure/auth/AuthorizerWrapper.ts:79
            roleArn: this.identityPoolWrapper.adminRole.roleArn
                                              ^
TypeError: Cannot read properties of undefined (reading 'adminRole')

```

Diff:

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬──────────────────────────────┬────────┬──────────────────────────────┬──────────────────────────────┬───────────────────────────────┐
│   │ Resource                     │ Effect │ Action                       │ Principal                    │ Condition                     │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ + │ ${CognitoDefaultAdminRole.Ar │ Allow  │ sts:AssumeRoleWithWebIdentit │ Federated:cognito-identity.a │ "StringEquals": {             │
│   │ n}                           │        │ y                            │ mazonaws.com                 │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:aud": "${SpaceFinderIden │
│   │                              │        │                              │                              │ tityPool}"                    │
│   │                              │        │                              │                              │ },                            │
│   │                              │        │                              │                              │ "ForAnyValue:StringLike": {   │
│   │                              │        │                              │                              │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:amr": "authenticated"    │
│   │                              │        │                              │                              │ }                             │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ + │ ${CognitoDefaultAuthenticate │ Allow  │ sts:AssumeRoleWithWebIdentit │ Federated:cognito-identity.a │ "StringEquals": {             │
│   │ dRole.Arn}                   │        │ y                            │ mazonaws.com                 │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:aud": "${SpaceFinderIden │
│   │                              │        │                              │                              │ tityPool}"                    │
│   │                              │        │                              │                              │ },                            │
│   │                              │        │                              │                              │ "ForAnyValue:StringLike": {   │
│   │                              │        │                              │                              │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:amr": "authenticated"    │
│   │                              │        │                              │                              │ }                             │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ + │ ${CognitoDefaultUnAuthentica │ Allow  │ sts:AssumeRoleWithWebIdentit │ Federated:cognito-identity.a │ "StringEquals": {             │
│   │ tedRole.Arn}                 │        │ y                            │ mazonaws.com                 │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:aud": "${SpaceFinderIden │
│   │                              │        │                              │                              │ tityPool}"                    │
│   │                              │        │                              │                              │ },                            │
│   │                              │        │                              │                              │ "ForAnyValue:StringLike": {   │
│   │                              │        │                              │                              │   "cognito-identity.amazonaws │
│   │                              │        │                              │                              │ .com:amr": "unauthenticated"  │
│   │                              │        │                              │                              │ }                             │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ + │ *                            │ Allow  │ s3:List*                     │ AWS:${CognitoDefaultAdminRol │                               │
│   │                              │        │                              │ e}                           │                               │
└───┴──────────────────────────────┴────────┴──────────────────────────────┴──────────────────────────────┴───────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::Cognito::IdentityPool SpaceFinderIdentityPool SpaceFinderIdentityPool 
[+] AWS::IAM::Role CognitoDefaultAuthenticatedRole CognitoDefaultAuthenticatedRoleC5D5C31E 
[+] AWS::IAM::Role CognitoDefaultUnAuthenticatedRole CognitoDefaultUnAuthenticatedRole6CA311FD 
[+] AWS::IAM::Role CognitoDefaultAdminRole CognitoDefaultAdminRole142FBDE3 
[+] AWS::IAM::Policy CognitoDefaultAdminRole/DefaultPolicy CognitoDefaultAdminRoleDefaultPolicy4BFCA7C8 
[+] AWS::Cognito::IdentityPoolRoleAttachment RolesAttachment RolesAttachment 
[~] AWS::Cognito::UserPoolGroup admins admins 
 └─ [+] RoleArn
     └─ {"Fn::GetAtt":["CognitoDefaultAdminRole142FBDE3","Arn"]}

Outputs
[+] Output IdentityPoolId IdentityPoolId: {"Value":{"Ref":"SpaceFinderIdentityPool"}}

```

Error - had typo

```diff
diff --git a/cdk-back-end/infrastructure/auth/IdentityPoolWrapper.ts b/cdk-back-end/infrastructure/auth/IdentityPoolWrapper.ts
index d72df91..2777eac 100644
--- a/cdk-back-end/infrastructure/auth/IdentityPoolWrapper.ts
+++ b/cdk-back-end/infrastructure/auth/IdentityPoolWrapper.ts
 
 export class IdentityPoolWrapper {
@@ -36,7 +35,7 @@ export class IdentityPoolWrapper {
             allowUnauthenticatedIdentities: true,
             cognitoIdentityProviders: [{
                 clientId: this.userPoolClient.userPoolClientId,
-                providerName: this.userPoolClient.userPoolClientName
+                providerName: this.userPool.userPoolProviderName
             }]
         });
@@ -95,14 +95,15 @@ export class IdentityPoolWrapper {
             ],
             resources: ['*']
         }))
+    
     }
 
     private attachRoles(){
         new CfnIdentityPoolRoleAttachment(this.scope, 'RolesAttachment', {
             identityPoolId: this.identityPool.ref,
             roles: {
-                'authenticatedRole': this.authenticatedRole.roleArn,
-                'unauthenticatedRole': this.unAuthenticatedRole.roleArn,
+                'authenticated': this.authenticatedRole.roleArn,
+                'unauthenticated': this.unAuthenticatedRole.roleArn
             },
             roleMappings: {
                 adminsMapping: {

```

Now deployed:

```text
 ✅  Space-Finder-Backend (SpaceFinder)

Outputs:
Space-Finder-Backend.IdentityPoolId = eu-central-1:51711005-da04-4a95-9154-96c73393713f
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/
Space-Finder-Backend.UserPoolClientId = 6hkmkdf2j11ft5potp0paoqo1p
Space-Finder-Backend.UserPoolId = eu-central-1_RsHsBNMan

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38
```

### Testing identity

- added getBuckets function
- user `test_user` has no group in UserPool

```json
{
  message: "Access Denied",
  code: "AccessDenied",
  region: null,
  time: {
  },
  requestId: "GM2YC2MF7CMVRWCX",
  extendedRequestId: "BTTxAApq557UqjNOzYJGhgAHKnxI79PZ+wWOvGqIBDldF5gvjXsGBxPEgVsDX0DpegZDSTbXctY=",
  cfId: undefined,
  statusCode: 403,
  retryable: false,
  retryDelay: 15.195181600301666,
}
```

bucket => undefined

After adding the user to admins group:

```json
{
  Buckets: [
    {
      Name: "atmosphere-docs-publisher-pipelinebucket-13584wbaypu4a",
      CreationDate: {
      },
    },
    {
      Name: "atmosphere-docs-publisher-stack-pipelinebucket-1vkzhpuffn3jw",
      CreationDate: {
      },
    },
    {
      Name: "atmosphere.pe.reliant.net",
      CreationDate: {
      },
    },
    {
      Name: "aws-000000-cloudtrail-bucket-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "aws-000000-dev-pfi-s3-cloudtrail-f993c42d5d94",
      CreationDate: {
      },
    },
    {
      Name: "aws-000000-staging-s3-cloudtrail-d55ae2714f32",
      CreationDate: {
      },
    },
    {
      Name: "aws-000000-test-trailbucket-xacajphh2n49",
      CreationDate: {
      },
    },
    {
      Name: "aws-codestar-ca-central-1-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "aws-codestar-ca-central-1-469225108435-test-codestar-pipe",
      CreationDate: {
      },
    },
    {
      Name: "aws-perspective-accesslogsbucket-2rkkn8cb3w6p",
      CreationDate: {
      },
    },
    {
      Name: "aws-sam-cli-managed-default-samclisourcebucket-le1tzalhcdcv",
      CreationDate: {
      },
    },
    {
      Name: "aws-stackset-drift-detec-serverlessdeploymentbuck-1i3jcfyd3g7wf",
      CreationDate: {
      },
    },
    {
      Name: "cdk-hnb659fds-assets-469225108435-eu-central-1",
      CreationDate: {
      },
    },
    {
      Name: "cdktoolkit-stagingbucket-o66kpow1db31",
      CreationDate: {
      },
    },
    {
      Name: "cf-templates-cod90gs5ld9b-ca-central-1",
      CreationDate: {
      },
    },
    {
      Name: "cf-templates-cod90gs5ld9b-us-east-1",
      CreationDate: {
      },
    },
    {
      Name: "cf-templates-cod90gs5ld9b-us-east-2",
      CreationDate: {
      },
    },
    {
      Name: "cf-templates-cod90gs5ld9b-us-west-1",
      CreationDate: {
      },
    },
    {
      Name: "cfn-test-bucket-000",
      CreationDate: {
      },
    },
    {
      Name: "codepipeline-us-east-1-707035415740",
      CreationDate: {
      },
    },
    {
      Name: "codesuite-demo-lambdacopy-11u5l3eh1ge-localbucket-cxwcqqtyx205",
      CreationDate: {
      },
    },
    {
      Name: "codesuite-demo-pipeline-k1nrvleque-artifactbucket-18p2zu2q87y6",
      CreationDate: {
      },
    },
    {
      Name: "config-bucket-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "config-bucket-469225108435-manual",
      CreationDate: {
      },
    },
    {
      Name: "config-bucket-ca-central-1-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "config-bucket-us-east-1-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "config-bucket-us-west-2-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "ct-bucket-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "dive-personalize-events-1",
      CreationDate: {
      },
    },
    {
      Name: "docs.atmosphere.pe.reliant.net",
      CreationDate: {
      },
    },
    {
      Name: "global-s3-logs-logs-20191108132607049200000001",
      CreationDate: {
      },
    },
    {
      Name: "logs-000000",
      CreationDate: {
      },
    },
    {
      Name: "logs-pvtr",
      CreationDate: {
      },
    },
    {
      Name: "logzio-aws-serverless-test",
      CreationDate: {
      },
    },
    {
      Name: "pe.reliant.net",
      CreationDate: {
      },
    },
    {
      Name: "pvtr-logs",
      CreationDate: {
      },
    },
    {
      Name: "resources-pckg-dev-serverlessdeploymentbucket-10scqkldy24f0",
      CreationDate: {
      },
    },
    {
      Name: "resources-pckg-nothing-serverlessdeploymentbucket-1v1djcsazikhi",
      CreationDate: {
      },
    },
    {
      Name: "saas-identity-with-cognito-iden-destinationbucket-urhlxpa7zsyf",
      CreationDate: {
      },
    },
    {
      Name: "saas-identity-with-cognito-identit-artifactbucket-jyn1g3ocz6j0",
      CreationDate: {
      },
    },
    {
      Name: "session-manager-logs-469225108435",
      CreationDate: {
      },
    },
    {
      Name: "signup-dev.hv3.xyz",
      CreationDate: {
      },
    },
    {
      Name: "stackset-my-stack-set-65e20d00-69b9-configbucket-wpivuvqt55kw",
      CreationDate: {
      },
    },
    {
      Name: "stackset-my-stack-set-a1be8021-0bf0-configbucket-1297xtwlma389",
      CreationDate: {
      },
    },
    {
      Name: "stackset-my-stack-set-cc887279-e71f-configbucket-p63zdl4r2lew",
      CreationDate: {
      },
    },
    {
      Name: "stackset-stacksetoverrideandupdatetes-trailbucket-1p8qnz3a0vdx3",
      CreationDate: {
      },
    },
    {
      Name: "test-automation-scripts",
      CreationDate: {
      },
    },
    {
      Name: "test-ct-stack-trailbucket-v32pu3w2pg3a",
      CreationDate: {
      },
    },
    {
      Name: "test-no-tag-bucket-1",
      CreationDate: {
      },
    },
    {
      Name: "test-s3-sys-testcustomer-20201207175115286500000003",
      CreationDate: {
      },
    },
  ],
  Owner: {
    ID: "d8092b714a872b772b13eb173dc758499d17a90ce86934bc73b214115be7d5a4",
  },
}
```

AWS Cognito is much more powerful than presented in the last 2 sections. If you want to dig even deeper, I recommend the following resources:

Fine-grained Access Control with Amazon Cognito Identity Pools - 20min
<https://www.youtube.com/watch?v=tAUmz94O2Qo>

Serverless Authentication and Authorization - 53min
<https://www.youtube.com/watch?v=VZqG7HjT2AQ>

Building Multi-Tenant Solutions on AWS (deconstructing SaaS) - 57:32min
<https://www.youtube.com/watch?v=mwQ5lipGTBI>

## 09-13 Chapters

See [this file](../cdk-front-end/AWS_and_Typescript_Masterclass_-_Frontend.md)

## 14 - TS recap

- Recap

Run ts:

- tsc ⇒ JS, then Node or browser
- directly - ts-node
- bundle with Webpack, parcel ⇒ browser

The config:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "lib": [
      "DOM",
      "ES6"
    ],
    "target": "es6",
    "rootDir": "src",
    "outDir": "dist",
    "baseUrl": "src",
    "paths": {
      "@components/*":["data/components/*"]
    },
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strict": true
  }
}
```