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