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
            return {
                      cognitoUser:  user,
                      userName: user.getUsername()
            }
        } catch (error) {
            return undefined
        }
        
    }

    public async getUserAttributes(user: User): Promise<UserAttribute[]> {
        const result: UserAttribute[] = [];
        const attributes = await Auth.userAttributes(user.cognitoUser);
        result.push(...attributes);

        return result;
    }
}