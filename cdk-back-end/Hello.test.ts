import { APIGatewayProxyEvent } from 'aws-lambda';
import {handler} from './services/SpacesTable/Update'

// call the lambda, permissions do not matter

const event = {
    body: {
        location: 'Bratislava'
    }
}

const event2: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: "87775a5d-9b2c-45ec-8923-c96944937766"
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


const result = handler(event4, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(items)
})