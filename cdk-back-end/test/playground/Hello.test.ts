import { APIGatewayProxyEvent } from 'aws-lambda';
import {handler} from '../../services/SpacesTable/Create'

// call the lambda, permissions do not matter

const event:  APIGatewayProxyEvent = {
    body: {
        location: 'Bratislava',
        name: 'Home'
    }
} as any;

const event2: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: "2754ab76-7c71-4956-b8bd-7982d409fe14"
    }
} as any;

const event3: APIGatewayProxyEvent = {
    queryStringParameters: {
        location: "Valencia"
    }
} as any;

const event4: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: "87775a5d-9b2c-45ec-8923-c96944937766"
    },
    body: {
        location: 'Updated location',
        name: 'Updated Name'
    }
} as any;


const result = handler(event , {} as any).then((apiResult) => {
    const item = JSON.parse(apiResult.body);
    console.log(item)
})