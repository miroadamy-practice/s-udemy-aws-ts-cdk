import {handler} from './services/SpacesTable/Read'

// call the lambda, permissions do not matter

const event = {
    body: {
        location: 'Bratislava'
    }
}

const result = handler({} as any, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log(items)
})