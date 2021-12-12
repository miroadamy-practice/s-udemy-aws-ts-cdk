import {handler} from './services/node-lambda/hello'

// call the lambda, permissions do not matter
handler({}, {});