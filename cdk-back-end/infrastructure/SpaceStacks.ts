import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {GenericTable} from './GenericTable'
import { NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';

export class SpaceStack extends Stack {

  // Initialize outside of constructor so that it can be used everywhere

  private api = new RestApi(this, 'SpaceApi');
  // private spacesTable = new GenericTable('SpacesTable', 'spaceId', this);

  private spacesTable = new GenericTable(this, {
      tableName: 'SpacesTable',
      primaryKey: 'spaceId',
      secondaryIndexes: ['location'],
      
      createLambdaPath: 'Create',
      readLambdaPath: 'Read'

  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJS', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler'
    });
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);

   const spaceResource = this.api.root.addResource('spaces');
   spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
   spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
  }
}
