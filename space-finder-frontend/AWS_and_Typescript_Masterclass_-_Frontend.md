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

#### First class component:

- model - holds data types
- dummy version of the AuthService - returns user based on hardcoded creds
- this will be passed to child comp

09-model

## 10 Using AWS in React with Amplify

## 11 Deployment

## 12 Advanced use cases

