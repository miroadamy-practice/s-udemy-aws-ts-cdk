import {createBrowserHistory} from 'history';

if (false) {
    console.log('Why do I need to do this ?')
}

// TS1208: 'history.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.

export default createBrowserHistory();