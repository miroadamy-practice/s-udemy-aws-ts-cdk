# AWS & Typescript Masterclass - React (part 2)

```text
Archived: No
Created: December 17, 2021 7:02 PM
From: Udemy
Repo: https://github.com/miroadamy/s-udemy-aws-ts-cdk
STAR: No
Topic: Core skills
```

See [AWS & Typescript Masterclass - CDK, Serverless, React](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/) , Alex Horea

[Udemy](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/learn/lecture/25157242?start=15#overview)

See `/Users/miroadamy/prj/s-udemy-aws-ts-cdk`

## 09 Front-End with React

Generate the app (this installs React)

```text
➜  cdk-front-end git:(master) ✗ npx create-react-app space-finder-frontend --template typescript
Need to install the following packages:
  create-react-app
Ok to proceed? (y) y
npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

Creating a new React app in /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-front-end/space-finder-frontend.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...


added 1370 packages in 1m

163 packages are looking for funding
  run `npm fund` for details

Installing template dependencies using npm...

added 38 packages, and changed 1 package in 9s

163 packages are looking for funding
  run `npm fund` for details

We detected TypeScript in your project (src/App.test.tsx) and created a tsconfig.json file for you.

Your tsconfig.json has been populated with default values.

Removing template package using npm...


removed 1 package, and audited 1408 packages in 4s

163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Success! Created space-finder-frontend at /Users/miroadamy/prj/s-udemy-aws-ts-cdk/cdk-front-end/space-finder-frontend
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd space-finder-frontend
  npm start

Happy hacking!

```

Cleanup after generated + new folders

### React components

- have state and properties
- on each change of state or props it is rendered, it "reacts"
- state is internal, props come from outside
- component can change its state, cannot change properties

#### First class component

- model - holds data types
- dummy version of the AuthService - returns user based on hardcoded creds
- this will be passed to child comp

09-model

#### Child Component

- added Login component
- simple form
- see how it is called from App with passing parameter to child

```react
export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>
        App from class works !!!
        <Login authService={this.authService}/>
      </div>
    )
  }
}
```

### Event handling

- onChange => private function, sets state
- onSubmit - on form - async call to auth service

Conditional rendering:

- define label as variable
- set it based on state
- display

### Data from child to parent

From parent - easy:

```typescript
<Login authService={this.authService}/>

```

Back: callback function

- add new property to interface that is passed to child, child calls it
- function sets the user

Must register the method in constructor (?? Why)

```typescript
export class App extends React.Component<{}, AppState> {

  private authService: AuthService = new AuthService();

  constructor(props: any) {
    super(props);

    this.setUser = this.setUser.bind(this);

  }

  private setUser(user: User) {
    this.setState({user: user});
    console.log('Setting the user: ' + user);
  }

  render() {
    return (
      <div>
        App from class works !!!
        <Login authService={this.authService} setUser={this.setUser}/>
      </div>
    )
  }
}

```

### Routing

Create some components - Home, Profile and Navbar that will point to them.

Need to install react-router-dom and types for it

```bash
➜  space-finder-frontend git:(master) ✗ npm i react-router-dom @types/react-router-dom and import Link

added 6 packages, and audited 1414 packages in 7s

163 packages are looking for funding
  run `npm fund` for details

6 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

Dynamic part - `loginLogOut` - depending on state link to login or log out

Had to downgrade React-router-dom to `"react-router-dom": "^5.2.0",` - with 6.x there is no `history` property

Also, I got this error:

```bash
TS1208: 'history.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
```

To fix it, I added dummy code into the history.ts

```typescript

if (false) {
    console.log('Why do I need to do this ?')
}

```

See also: <https://stackoverflow.com/questions/56577201/why-is-isolatedmodules-error-fixed-by-any-import/56577324>

Added some CSS

See the Navbar how dynamically can add style to float to the right

### State of the app

App shows user on login but looses the state on reload => remember.

Using history to navigate AFTER login => history.push()

### Async data rendering

Shows how to render the list of properties.

Note how it builds a table:

```typescript
export class Profile extends React.Component<ProfileProps, ProfileState> {

    state: ProfileState = {
        userAttributes: []
    }

    async componentDidMount(){
        if (this.props.user) {
            const userAttrs = await this.props.authService.getUserAttributes(this.props.user);
            this.setState({
                userAttributes: userAttrs
            })
        }
    }

    private renderUserAttributes(user: User) {
        const rows = [];
        for (const userAttribute of this.state.userAttributes) {
            rows.push(<tr key={userAttribute.Name}>
                <td>{userAttribute.Name}</td>
                <td>{userAttribute.Value}</td>
            </tr>)
        }
        return <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    }
    render(): React.ReactNode {
        let profileSpace: any

        if (this.props.user) {
            profileSpace = <div>
                <h3>Hello {this.props.user.userName}</h3>
                Here are your attributes:
                {this.renderUserAttributes(this.props.user)}
                </div>
        } else {
            profileSpace = <div>
                Please <Link to='/login'>Login</Link>
            </div>
        }
        return (
            <div>
                Welcome to the profile page
                {profileSpace}
            </div>
        )
    }
}
```

### Space component

Has own folder.

No state, just properties

This does not work for me
`import genericImage from '../../assets/generic-image.jpg';`

See <https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module>

This worked: `const genericImage = require('../../assets/generic-image.jpg');`

However, after I added line to `index.tsx`

```text
/// <reference types="react-scripts" />
```

It worked.

Dummy DataService for Spaces

Spaces component = array of Spaces

Same trick with binding async function as in Profile

Load the data when `componentDidMount` fires

### Modal

After clicking on Reserve

Titel, text, close

CSS - z-index = 1 => over

## 10 Using AWS in React with Amplify

- will use Amplify in browser

Install Amplify

```text
➜  space-finder-frontend git:(master) ✗ npm i aws-amplify @aws-amplify/auth
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm WARN deprecated sane@4.1.0: some dependency vulnerabilities fixed, support for node < 10 dropped, and newer ECMAScript syntax/features added
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uuid@3.3.2: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm WARN deprecated uglify-es@3.3.9: support for ECMAScript is superseded by `uglify-js` as of v3.13.0

added 969 packages, and audited 2393 packages in 1m

172 packages are looking for funding
  run `npm fund` for details

17 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

Move the AuthService + config from backend to frontend

### Create bucket and CORS

Task: unique name that does not change over runs: will use stack ID

Using CFN functions in CDK

```typescript
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
```

```text
Stack Space-Finder-Backend (SpaceFinder)
Resources
[+] AWS::S3::Bucket spaces-photos spacesphotos2389D37E 

Outputs
[+] Output spaces-photos-bucket-name spacesphotosbucketname: {"Value":{"Ref":"spacesphotos2389D37E"}}

```

Now we need to add the bucket to Admin role => dependency injection

- pass it to AuthorizerWrapper constructor
- change order of creation
- need to pass it to IdentityPool
- IdentityPool uses it in Policy for Admin

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬──────────────────────────────┬────────┬──────────────────────────────┬──────────────────────────────┬───────────────────────────────┐
│   │ Resource                     │ Effect │ Action                       │ Principal                    │ Condition                     │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ - │ ${helloLambdaNodeJSAEFC0103. │ Allow  │ lambda:InvokeFunction        │ Service:apigateway.amazonaws │ "ArnLike": {                  │
│   │ Arn}                         │        │                              │ .com                         │   "AWS:SourceArn": "arn:${AWS │
│   │                              │        │                              │                              │ ::Partition}:execute-api:eu-c │
│   │                              │        │                              │                              │ entral-1:469225108435:${Space │
│   │                              │        │                              │                              │ Api1B373D2B}/${SpaceApi/Deplo │
│   │                              │        │                              │                              │ ymentStage.prod}/GET/hello"   │
│   │                              │        │                              │                              │ }                             │
│ - │ ${helloLambdaNodeJSAEFC0103. │ Allow  │ lambda:InvokeFunction        │ Service:apigateway.amazonaws │ "ArnLike": {                  │
│   │ Arn}                         │        │                              │ .com                         │   "AWS:SourceArn": "arn:${AWS │
│   │                              │        │                              │                              │ ::Partition}:execute-api:eu-c │
│   │                              │        │                              │                              │ entral-1:469225108435:${Space │
│   │                              │        │                              │                              │ Api1B373D2B}/test-invoke-stag │
│   │                              │        │                              │                              │ e/GET/hello"                  │
│   │                              │        │                              │                              │ }                             │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ - │ *                            │ Allow  │ s3:List*                     │ AWS:${CognitoAdminRole}      │                               │
│ - │ *                            │ Allow  │ s3:ListAllMyBuckets          │ AWS:${helloLambdaNodeJSServi │                               │
│   │                              │        │                              │ ceRole9951D888}              │                               │
├───┼──────────────────────────────┼────────┼──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ + │ ${spaces-photos.Arn}/*       │ Allow  │ s3:Get*                      │ AWS:${CognitoAdminRole}      │                               │
│   │                              │        │ s3:List*                     │                              │                               │
│   │                              │        │ s3:PutObject                 │                              │                               │
│   │                              │        │ s3:PutObjectAcl              │                              │                               │
└───┴──────────────────────────────┴────────┴──────────────────────────────┴──────────────────────────────┴───────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[-] AWS::ApiGateway::Deployment SpaceApiDeploymentA2B9E765e5c8dbb757fdc2f782da39c6e85ecce3 destroy
[-] AWS::ApiGateway::Resource SpaceApihelloDF776653 destroy
[-] AWS::Lambda::Permission SpaceApihelloGETApiPermissionSpaceFinderBackendSpaceApiE9BB53FFGEThelloC5CE7BCC destroy
[-] AWS::Lambda::Permission SpaceApihelloGETApiPermissionTestSpaceFinderBackendSpaceApiE9BB53FFGEThelloD20E1DAA destroy
[-] AWS::ApiGateway::Method SpaceApihelloGET65983C27 destroy
[-] AWS::IAM::Role helloLambdaNodeJSServiceRole9951D888 destroy
[-] AWS::IAM::Policy helloLambdaNodeJSServiceRoleDefaultPolicy8628AD89 destroy
[-] AWS::Lambda::Function helloLambdaNodeJSAEFC0103 destroy
[+] AWS::ApiGateway::Deployment SpaceApi/Deployment SpaceApiDeploymentA2B9E76537f11508d9f69152180ac4a22081819a 
[~] AWS::ApiGateway::Stage SpaceApi/DeploymentStage.prod SpaceApiDeploymentStageprodBB8A31FE 
 └─ [~] DeploymentId
     └─ [~] .Ref:
         ├─ [-] SpaceApiDeploymentA2B9E765e5c8dbb757fdc2f782da39c6e85ecce3
         └─ [+] SpaceApiDeploymentA2B9E76537f11508d9f69152180ac4a22081819a
[~] AWS::IAM::Policy CognitoAdminRole/DefaultPolicy CognitoAdminRoleDefaultPolicyBC6192E4 
 └─ [~] PolicyDocument
     └─ [~] .Statement:
         └─ @@ -1,7 +1,25 @@
            [ ] [
            [ ]   {
            [-]     "Action": "s3:List*",
            [+]     "Action": [
            [+]       "s3:List*",
            [+]       "s3:PutObject",
            [+]       "s3:PutObjectAcl",
            [+]       "s3:Get*"
            [+]     ],
            [ ]     "Effect": "Allow",
            [-]     "Resource": "*"
            [+]     "Resource": {
            [+]       "Fn::Join": [
            [+]         "",
            [+]         [
            [+]           {
            [+]             "Fn::GetAtt": [
            [+]               "spacesphotos2389D37E",
            [+]               "Arn"
            [+]             ]
            [+]           },
            [+]           "/*"
            [+]         ]
            [+]       ]
            [+]     }
            [ ]   }
            [ ] ]

****************************************************
*** Newer version of CDK is available [2.2.0]    ***
*** Upgrade recommended (npm install -g aws-cdk) ***
****************************************************
```

### Adding CORS to Lambdas

In utils

```typescript
export function addCorsHeader(result: APIGatewayProxyResult) {
    result.headers = {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    }
}
---
// Use it: in Create etc
//...
   const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'Hello from DynamoDB'
    }
    addCorsHeader(result);
// ...

```

Deploy

```text
 ✅  Space-Finder-Backend (SpaceFinder)

Outputs:
Space-Finder-Backend.IdentityPoolId = eu-central-1:51711005-da04-4a95-9154-96c73393713f
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/
Space-Finder-Backend.UserPoolClientId = 6hkmkdf2j11ft5potp0paoqo1p
Space-Finder-Backend.UserPoolId = eu-central-1_RsHsBNMan
Space-Finder-Backend.spacesphotosbucketname = spaces-photos061d7a8cfc38

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38

```

### Back to Front End

Add CreateSpace component - CreateSpace

Add dummy dataservice method

Add it to Apps.tsx

We need to really authenticate to create space 

### AWS Credentials in the browser

Copy getTempCredentials and RefreshToken to auth service in FE

Call the getTempCredentials in setUser

Inspect `AWS.config.credentials`

```json

CognitoIdentityCredentials {expired: false, expireTime: Wed Dec 22 2021 00:09:37 GMT+0100 (Central European Standard Time), refreshCallbacks: Array(0), accessKeyId: 'ASIAW2P766PJ3QGL53N2', sessionToken: 'IQoJb3JpZ2luX2VjECYaDGV1LWNlbnRyYWwtMSJHMEUCIFf3bH…+ff29ckIfUloDwUI0o2UwnNV0I7DD3x9eXbWkmCRnSnni3KsG', …}
accessKeyId: "ASIAW2P766PJ3QGL53N2"
cognito: features.constructor {config: Config, isGlobalEndpoint: false, endpoint: Endpoint, _events: {…}, MONITOR_EVENTS_BUBBLE: ƒ, …}
data: {IdentityId: 'eu-central-1:62f0afd2-05b7-43dd-a990-9fcc0d8b3433', Credentials: {…}}
expireTime: Wed Dec 22 2021 00:09:37 GMT+0100 (Central European Standard Time) {}
expired: false
params: {IdentityPoolId: 'eu-central-1:51711005-da04-4a95-9154-96c73393713f', Logins: {…}, IdentityId: 'eu-central-1:62f0afd2-05b7-43dd-a990-9fcc0d8b3433', RoleSessionName: 'web-identity'}
refreshCallbacks: []
sessionToken: "IQoJb3JpZ2luX2VjECYaDGV1LWNlbnRyYWwtMSJHMEUCIFf3bHjiGafEr4RCLAXbXsDbQQllHCv4sqT1lgAbp+r7AiEA1ykvxMrMCoXwRHc4tKUz4Ztoqh/LzUmQBRZ3wkvxk5Uq1gQIHxADGgw0NjkyMjUxMDg0MzUiDO9DVem41s3W6Z1p1CqzBMfcPky7tGH1FsTptWqNmuzIfhsuNMlgeU/NE2iqER7UXNMGEoHfkb1qFJ61nPJrKHJ4V424ozwNEgIjcVAjgfzWrrK0IPz27kUfSLwGcKgRId21YyV3vpoKLqznNx9RXFlon+kIpSj5gn2KKoO9qf4q+Hr4Ywia2peKJs/xyWhGGUworIeS/BubQxSYzsqLXqSC7lkSgdVFS2ErfVkLmBT44GLLvNc0caQ6PqztNFyKYzMfRLE87twFVyCBisM0BwNIHWvlfpS4PXwE5WNan1YxO/A8R5uu+5P+yr5iH/OuQaRYKvx5tvByFnW0Jpc2JNvV1+1fNuiy1rVw58OOM53m9lWNilmFpnbCqXFbOIngQUaWBCKzjNm0++y4PByLzP+KU1aoqaQO3tyRuF4Fp1uTZiQZ+KHCqGchE9GwWBMpU6dCu+79Vx1AvdivBw3saac0hcwRk0aYRY0oD465Eh8JtpOU8iAEoBPnCt/7EKIWGjAtVde3WC34bxdzmg9zEZhL32Jf0W8OcSgLnQQeP6+WTyIo4sueKVmT65TSgeFLyK9yHd7xhEi8rXsMdiTQ4oMc2HmcI4/lDXzPpYdWuDtMdsTOuLqLXoOqmS5qh0hK9VqLkvnrxOf2No5rwfH3CiXjVas2hhzCldNyyslqUY54Lm32tAMmlWfqunJYgM+tlJo+2WxwUH6vRGISGPvSEbQK3Pvao+KUIJyPsHMQz3KDIZL1qzJz4Z0+i+ChtqTGYhAUMKGhiY4GOoUCO+JpJGNqUXlO0aeGr6Nt1EAb+ibYsFOvLycA0HYzjwHixMyKcCaWR6dhjqLkb5qaZSnoQOvNZUkY6jrAXsn6keCsJoZpg7D2QSOe320jyGlV8wdzCsCtXh/tskBLhxsKA9+Rr/tmxGgS+OcNkgG0ypy0PMzDB3gfp6JYMZjH7CKvGE1ML4hAmO1t8JP7G+3lWr3QeXBdgSjNVe7ndx7LDLfZn7pSPJ3tnXwy8+Dvc0YFxqz8QUdHan+bRKB18F4afLdSn9Gb9S4IuS54VC3J8IaGTmXTR1cUDO/ea60aEyi+ff29ckIfUloDwUI0o2UwnNV0I7DD3x9eXbWkmCRnSnni3KsG"
sts: features.constructor {config: Config, isGlobalEndpoint: true, signingRegion: 'us-east-1', endpoint: Endpoint, _events: {…}, …}
webIdentityCredentials: WebIdentityCredentials {expired: true, expireTime: null, refreshCallbacks: Array(0), accessKeyId: undefined, sessionToken: undefined, …}
_clientConfig: {region: 'eu-central-1'}
_identityId: "eu-central-1:62f0afd2-05b7-43dd-a990-9fcc0d8b3433"
identityId: (...)
secretAccessKey: "zdoWlCtiRtFbKu0J22Cu2/xXpAkjysC80JHb8VOo"
get identityId: ƒ ()
set identityId: ƒ (identityId)
[[Prototype]]: Credentials
cacheId: ƒ cacheId(data)
clearCachedId: ƒ clearCache()
clearIdOnNotAuthorized: ƒ clearIdOnNotAuthorized(err)
constructor: ƒ CognitoIdentityCredentials(params, clientConfig)
createClients: ƒ ()
getCredentialsForIdentity: ƒ getCredentialsForIdentity(callback)
getCredentialsFromSTS: ƒ getCredentialsFromSTS(callback)
getId: ƒ getId(callback)
getStorage: ƒ getStorage(key)
load: ƒ load(callback)
loadCachedId: ƒ loadCachedId()
loadCredentials: ƒ loadCredentials(data, credentials)
localStorageKey: {id: 'aws.cognito.identity-id.', providers: 'aws.cognito.identity-providers.'}
refresh: ƒ refresh(callback)
setStorage: ƒ setStorage(key, val)
storage: Storage {CognitoIdentityServiceProvider.6hkmkdf2j11ft5potp0paoqo1p.LastAuthUser: 'test_user', CognitoIdentityServiceProvider.6hkmkdf2j11ft5potp0paoqo1p.test_user.refreshToken: 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUl…7JB3sgiXffvPlEgyRU5e8jLJyA.4IzilknEEhaTrL-zYk8CAg', CognitoIdentityServiceProvider.6hkmkdf2j11ft5potp0paoqo1p.test_user.idToken: 'eyJraWQiOiI2NTMybGtVZjRpUFIxV3lqMVZUTHRQT2tIYUtZK0…77PG0fB1c3foHiU_B19ek1DKw6L34FREVgaViRmBbk86nmiqA', amplify-signin-with-hostedUI: 'false', CognitoIdentityServiceProvider.6hkmkdf2j11ft5potp0paoqo1p.test_user.userData: '{"UserAttributes":[{"Name":"sub","Value":"f92e7bff…:"miro.adamy@gmail.com"}],"Username":"test_user"}', …}
[[Prototype]]: Object
```

Ready to make calls

### Uploading files

in DataService

For now, get the name from AWS and add to config

Added uploadPublicFile, test if work =>

```text
Error while creating space:  Missing credentials in config, if using AWS_CONFIG_FILE, set AWS_SDK_LOAD_CONFIG=1
```

Are creds are RIGHT THERE.

Bug in AWS

Workaround 1 - create client when called

This works - uploads file, makes it public (does not add Space, not yet implemented)

---

Use request url, issue POST to '/spaces' with iCreateSpaces content => stores in DynamoDB

Does not display (yet)

### Showing data from table

Small fixes:

- space component: photoUrl vs photoURL
- delete entries from table
- anonymity for files - add random string



## 11 Deployment

Need to deploy the app to Cloudfront

`npm run build`

Take folder from build and move it to S3 bucket

Add new class in the backend that deploys: WebAppDeployment

        new BuckeBucketDeployment

```text
Stack Space-Finder-Backend (SpaceFinder)
IAM Statement Changes
┌───┬────────────────────────────────────┬────────┬────────────────────────────────────┬──────────────────────────────────────┬───────────┐
│   │ Resource                           │ Effect │ Action                             │ Principal                            │ Condition │
├───┼────────────────────────────────────┼────────┼────────────────────────────────────┼──────────────────────────────────────┼───────────┤
│ + │ ${Custom::CDKBucketDeployment8693B │ Allow  │ sts:AssumeRole                     │ Service:lambda.amazonaws.com         │           │
│   │ B64968944B69AAFB0CC9EB8756C/Servic │        │                                    │                                      │           │
│   │ eRole.Arn}                         │        │                                    │                                      │           │
├───┼────────────────────────────────────┼────────┼────────────────────────────────────┼──────────────────────────────────────┼───────────┤
│ + │ ${space-app-web-id.Arn}            │ Allow  │ s3:Abort*                          │ AWS:${Custom::CDKBucketDeployment869 │           │
│   │ ${space-app-web-id.Arn}/*          │        │ s3:DeleteObject*                   │ 3BB64968944B69AAFB0CC9EB8756C/Servic │           │
│   │                                    │        │ s3:GetBucket*                      │ eRole}                               │           │
│   │                                    │        │ s3:GetObject*                      │                                      │           │
│   │                                    │        │ s3:List*                           │                                      │           │
│   │                                    │        │ s3:PutObject                       │                                      │           │
├───┼────────────────────────────────────┼────────┼────────────────────────────────────┼──────────────────────────────────────┼───────────┤
│ + │ ${space-app-web-id.Arn}/*          │ Allow  │ s3:GetObject                       │ AWS:*                                │           │
├───┼────────────────────────────────────┼────────┼────────────────────────────────────┼──────────────────────────────────────┼───────────┤
│ + │ arn:${AWS::Partition}:s3:::cdk-hnb │ Allow  │ s3:GetBucket*                      │ AWS:${Custom::CDKBucketDeployment869 │           │
│   │ 659fds-assets-469225108435-eu-cent │        │ s3:GetObject*                      │ 3BB64968944B69AAFB0CC9EB8756C/Servic │           │
│   │ ral-1                              │        │ s3:List*                           │ eRole}                               │           │
│   │ arn:${AWS::Partition}:s3:::cdk-hnb │        │                                    │                                      │           │
│   │ 659fds-assets-469225108435-eu-cent │        │                                    │                                      │           │
│   │ ral-1/*                            │        │                                    │                                      │           │
└───┴────────────────────────────────────┴────────┴────────────────────────────────────┴──────────────────────────────────────┴───────────┘
IAM Policy Changes
┌───┬──────────────────────────────────────────────────────────────────┬──────────────────────────────────────────────────────────────────┐
│   │ Resource                                                         │ Managed Policy ARN                                               │
├───┼──────────────────────────────────────────────────────────────────┼──────────────────────────────────────────────────────────────────┤
│ + │ ${Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/Se │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasi │
│   │ rviceRole}                                                       │ cExecutionRole                                                   │
└───┴──────────────────────────────────────────────────────────────────┴──────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Resources
[+] AWS::S3::Bucket space-app-web-id spaceappwebidBC88228C 
[+] AWS::S3::BucketPolicy space-app-web-id/Policy spaceappwebidPolicyC98213F9 
[+] AWS::Lambda::LayerVersion space-app-web-deployment/AwsCliLayer spaceappwebdeploymentAwsCliLayer98282FF9 
[+] Custom::CDKBucketDeployment space-app-web-deployment/CustomResource spaceappwebdeploymentCustomResource9B7FB553 
[+] AWS::IAM::Role Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRole89A01265 
[+] AWS::IAM::Policy Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C/ServiceRole/DefaultPolicy CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756CServiceRoleDefaultPolicy88902FDF 
[+] AWS::Lambda::Function Custom::CDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C CustomCDKBucketDeployment8693BB64968944B69AAFB0CC9EB8756C81C01536 

Outputs
[+] Output spaceFinderWebS3Url spaceFinderWebS3Url: {"Value":{"Fn::GetAtt":["spaceappwebidBC88228C","WebsiteURL"]}}

---
 ✅  Space-Finder-Backend (SpaceFinder)

Outputs:
Space-Finder-Backend.IdentityPoolId = eu-central-1:51711005-da04-4a95-9154-96c73393713f
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/
Space-Finder-Backend.UserPoolClientId = 6hkmkdf2j11ft5potp0paoqo1p
Space-Finder-Backend.UserPoolId = eu-central-1_RsHsBNMan
Space-Finder-Backend.spaceFinderWebS3Url = http://space-app-web061d7a8cfc38.s3-website.eu-central-1.amazonaws.com
Space-Finder-Backend.spacesphotosbucketname = spaces-photos061d7a8cfc38

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38
```

Issues:

- ugly URL
- http only

=> Cloudfront

```text
✅  Space-Finder-Backend (SpaceFinder)

Outputs:
Space-Finder-Backend.IdentityPoolId = eu-central-1:51711005-da04-4a95-9154-96c73393713f
Space-Finder-Backend.SpaceApiEndpointDA7E4050 = https://67183kcdkf.execute-api.eu-central-1.amazonaws.com/prod/
Space-Finder-Backend.UserPoolClientId = 6hkmkdf2j11ft5potp0paoqo1p
Space-Finder-Backend.UserPoolId = eu-central-1_RsHsBNMan
Space-Finder-Backend.spaceFinderCloudfront3Url = d1e25ltf458g5k.cloudfront.net
Space-Finder-Backend.spaceFinderWebS3Url = http://space-app-web061d7a8cfc38.s3-website.eu-central-1.amazonaws.com
Space-Finder-Backend.spacesphotosbucketname = spaces-photos061d7a8cfc38

Stack ARN:
arn:aws:cloudformation:eu-central-1:469225108435:stack/SpaceFinder/5eea0820-5870-11ec-a226-061d7a8cfc38
```

- see the S3 client singleton function getS3Client()


Finished code in forked repos - see:

- <https://github.com/miroadamy/space-finder-backend>
- <https://github.com/miroadamy/space-finder-frontend>

null => avoid null check - variableName!


## 12 Advanced use cases
