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

## 10 Using AWS in React with Amplify

## 11 Deployment

## 12 Advanced use cases
