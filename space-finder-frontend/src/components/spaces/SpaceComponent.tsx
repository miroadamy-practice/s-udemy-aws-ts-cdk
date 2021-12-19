import { Component } from "react";
import './SpaceComponent.css';

// This did not work for me
import genericImage from '../../assets/generic-image.jpg';
// See https://stackoverflow.com/questions/52759220/importing-images-in-typescript-react-cannot-find-module

// const genericImage = require('../../assets/generic-image.jpg');

interface SpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string
    reserveSpace: (spaceId: string) => void
}

export class SpaceComponent extends Component<SpaceComponentProps> {

    private renderImage() {
        if (this.props.photoUrl) {
            return <img src={this.props.photoUrl} alt=" "/>
        } else {
            return <img src={genericImage} alt=" "/>
        }
    }

    render() {

        return <div className='spaceComponent'>
        {this.renderImage()}
        <label className='name' >{this.props.name}</label><br/>
        <label className='spaceId'>{this.props.spaceId}</label><br/>
        <label className='location'>{this.props.location}</label><br/>
        <button onClick={()=>this.props.reserveSpace(this.props.spaceId)}>Reserve</button>
    </div>
    }
}