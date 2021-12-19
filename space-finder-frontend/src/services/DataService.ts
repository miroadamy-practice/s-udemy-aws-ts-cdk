import { Space } from "../model/Model";


export class DataService {
    public async getSpaces(): Promise<Space[]> {
        const result: Space[] = [];

        result.push({
            location: 'Valencia',
            name: 'Turia',
            spaceId: 'VLC-1'
        });

        result.push({
            location: 'Bratislava',
            name: 'Hradny Kopec',
            spaceId: 'BTS-1'
        });
        result.push({
            location: 'Ottawa',
            name: 'Gatineau Park',
            spaceId: 'YOW-1'
        });
        return result;
    }

    public async reserveSpace(spaceId: string) : Promise<string | undefined>{
        if (spaceId === 'BTS-1') {
            return '555';
        } else {
            return undefined
        }

    }
}