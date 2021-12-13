import {handler} from './services/SpacesTable/Create'

// call the lambda, permissions do not matter

const event = {
    body: {
        location: 'Bratislava'
    }
}
handler(event as any, {} as any);