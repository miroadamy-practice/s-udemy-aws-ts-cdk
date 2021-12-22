import { Space } from "../model/Model";
import { ICreateSpaceState } from "../components/spaces/CreateSpace";
import {S3, config} from 'aws-sdk';
import { config as appConfig}  from './config';


config.update({
    region: appConfig.REGION
})
export class DataService {

    private s3Client = new S3({region: appConfig.REGION});

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

    public async createSpace(iCreateSpace: ICreateSpaceState) {
        if (iCreateSpace.photo) {
            const photoUrl = await this.uploadPublicFile(iCreateSpace.photo, appConfig.SPACES_PHOTOS_BUCKET);
            console.log(photoUrl);
        }
        return 123;
    }

    private async uploadPublicFile(file: File, bucket: string) {
        const fileName = file.name;
        const uploadResult = await this.s3Client.upload({
            Bucket: bucket,
            Key: fileName,
            Body: file,
            ACL: 'public-read'
        }).promise();
        return uploadResult.Location;
    }
}