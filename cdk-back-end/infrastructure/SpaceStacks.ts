import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {GenericTable} from './GenericTable'
import { NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'

export class SpaceStack extends Stack {

  // Initialize outside of constructor so that it can be used everywhere

  private api = new RestApi(this, 'SpaceApi');
  private spacesTable = new GenericTable('SpacesTable', 'spaceId', this);

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, 'helloLambda', {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
        handler: 'hello.main'   // name of file.exported function
    });

    const helloLambdaIntegration = new LambdaIntegration(helloLambda);
    const helloLambdaResource = this.api.root.addResource('hello');
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);

    const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJS', {
      entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
      handler: 'handler'
    })
  }
}
