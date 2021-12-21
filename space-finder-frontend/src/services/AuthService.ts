import { Auth, Amplify} from 'aws-amplify'
import {User, UserAttribute} from './../model/Model';

import {CognitoUser} from '@aws-amplify/auth'
import * as AWS from 'aws-sdk';
import {Credentials} from 'aws-sdk/lib/credentials';

import { config } from './config'

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        identityPoolId: 'eu-central-1:b4ba0d92-fd51-43f7-98c4-60b71b0ed071'
    }
});


export class AuthService {

      public async login(username: string, password: string ): Promise<User | undefined> {
        try {
            const user = await Auth.signIn(username, password) as CognitoUser;
            console.log('Logged on as:' + user);
            return {
                      cognitoUser:  user,
                      userName: user.getUsername()
            }
        
        } catch (error) {
            console.log('Got error:' + error);
            return undefined
        }
        
    }

    public async getUserAttributes(user: User): Promise<UserAttribute[]> {
        const result: UserAttribute[] = [];
        const attributes = await Auth.userAttributes(user.cognitoUser);
        result.push(...attributes);

        return result;
    }


    public async getAWSTemporaryCreds(user: CognitoUser){
        const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.IDENTITY_POOL_ID,
            Logins: {
                [cognitoIdentityPool]: user.getSignInUserSession()!.getIdToken().getJwtToken()
            }
        },{
            region: config.REGION
        });
        await this.refreshCredentials();
    }

    // refresh creds
    private async refreshCredentials() : Promise<void> {
        return new Promise((resolve, reject) => {
            (AWS.config.credentials as Credentials).refresh(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

}