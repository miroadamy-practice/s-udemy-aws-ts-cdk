import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import { v4 } from 'uuid';

import {validateAsSpaceEntry, MissingFieldError} from '../../shared/InputValidator'

const TABLE_NAME = process.env.TABLE_NAME;
const dbClient = new DynamoDB.DocumentClient();

async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from DynamoDB'
    }

    try {
        const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
        item.spaceId = v4();
        validateAsSpaceEntry(item);
        await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }
        ).promise();
        result.body = JSON.stringify(`Created item: ${item.spaceId}`);
    } catch (error: any) {
        result.statusCode = 400;
        result.body = JSON.stringify({error: error.message});
    }
    

    return result;
}

export {handler}