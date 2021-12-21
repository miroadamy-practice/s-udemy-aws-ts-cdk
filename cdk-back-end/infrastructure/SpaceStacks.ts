import { Stack, StackProps, Fn, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda';
import {join} from 'path';
import {AuthorizationType, LambdaIntegration, MethodOptions, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {GenericTable} from './GenericTable'
import { NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {AuthorizerWrapper} from './auth/AuthorizerWrapper'
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";

export class SpaceStack extends Stack {

  // Initialize outside of constructor so that it can be used everywhere

  private api = new RestApi(this, 'SpaceApi');
  // private spacesTable = new GenericTable('SpacesTable', 'spaceId', this);
  private authorizer : AuthorizerWrapper

  private suffix: string;
  private spacesPhotosBucket: Bucket;

  private spacesTable = new GenericTable(this, {
      tableName: 'SpacesTable',
      primaryKey: 'spaceId',
      secondaryIndexes: ['location'],

      createLambdaPath: 'Create',
      readLambdaPath: 'Read',
      updateLambdaPath: 'Update',
      deleteLambdaPath: 'Delete'

  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // must create bucket before it is used in AuthorizerWrapper
    this.initializeSuffix();
    this.initializeSpacesPhotosBucket();
    
    this.authorizer = new AuthorizerWrapper(
      this, 
      this.api,
      this.spacesPhotosBucket.bucketArn + '/*' );

    const optionsWithAuthorizer : MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId
      }
    }

   const spaceResource = this.api.root.addResource('spaces');
   spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
   spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
   spaceResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
   spaceResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);

   
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/',  this.stackId));
    const Suffix = Fn.select(4,Fn.split('-', shortStackId));
    this.suffix = Suffix
  }

  private initializeSpacesPhotosBucket(){
    this.spacesPhotosBucket = new Bucket(this, 'spaces-photos', {
      bucketName: 'spaces-photos' + this.suffix,
      cors: [{
        allowedMethods: [HttpMethods.GET, HttpMethods.HEAD, HttpMethods.PUT],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }]
    });
    new CfnOutput(this, 'spaces-photos-bucket-name', {
      value: this.spacesPhotosBucket.bucketName
    })

  }
}
