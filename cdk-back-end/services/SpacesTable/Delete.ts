import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import { addCorsHeader } from '../shared/Utils';


const TABLE_NAME = process.env.TABLE_NAME!;
const PRIMARY_KEY = process.env.PRIMARY_KEY!;

const dbClient = new DynamoDB.DocumentClient();

async function handler (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: `Deleted `
    }
    addCorsHeader(result);
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

export {handler}