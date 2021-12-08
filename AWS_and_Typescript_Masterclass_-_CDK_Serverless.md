# AWS & Typescript Masterclass - CDK, Serverless, React

```
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

# Intro

- See [https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27142980#overview)

# AWS CDK and CFN

- See [https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27143048#overview](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/27143048#overview)
    
Will build the S3 bucket
    
Uses JSII - [https://github.com/aws/jsii/releases](https://github.com/aws/jsii/releases) 

```
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
    

# 03 - Serverless project with CDK and TS


# 04 - Serverless - AWS Lambda, bundling, testing etc

---

# 14 - TS recap

- Recap
    
Run ts: 

- tsc ⇒ JS, then Node or browser
- directly - ts-node
- bundle with Webpack, parcel ⇒ browser