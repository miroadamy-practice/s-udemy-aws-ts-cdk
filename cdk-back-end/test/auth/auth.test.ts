import { config } from './config';
import { AuthService } from './AuthService';
import * as AWS from 'aws-sdk';

// good practice - set region from config

AWS.config.region = config.REGION;

async function getBuckets() {
    let buckets;
    try {
        buckets = await new AWS.S3().listBuckets().promise();
    } catch (error) {
        buckets = undefined;
    }
    return buckets;
}

async function callStuff() {
    const authService = new AuthService();

    const user = await authService.login(config.TEST_USER_NAME, config.TEST_USER_PASSWORD);
    await authService.getAWSTemporaryCreds(user);
    const someCreds = AWS.config.credentials;
    const buckets = await getBuckets();
    const a = 5;
}

callStuff();
