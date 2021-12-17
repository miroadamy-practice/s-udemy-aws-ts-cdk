import { APIGatewayProxyEvent } from 'aws-lambda';
import {S3} from 'aws-sdk';

const s3client = new S3();

async function handler(event: APIGatewayProxyEvent, context: any) {

    if (isAuthorized(event)) {
        return {
            statusCode: 200,
            body: 'Hello from TS Lambda - event:' + JSON.stringify(event)
        }
    } else {
        return {
            statusCode: 403,
            body: 'Not authorized'
        }
    }
}

function isAuthorized(event: APIGatewayProxyEvent) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    } else {
        return false;
    }
}
export { handler }