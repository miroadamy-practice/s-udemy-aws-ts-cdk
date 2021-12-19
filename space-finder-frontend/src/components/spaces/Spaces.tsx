import { Component } from "react";
import { Space } from "../../model/Model";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";


interface SpacesState {
    spaces: Space[];
}

interface SpacesProps {
    dataService: DataService;
}

export class Spaces extends Component<SpacesProps, SpacesState> {

    async componentDidMount(){
        const spaces = await this.props.dataService.getSpaces();
        this.setState({
            spaces: spaces
        })
    }

    constructor(props: SpacesProps) {
        super(props);

        this.state = { spaces: []}

        this.reserveSpace = this.reserveSpace.bind(this);
    }

    private async reserveSpace(spaceId: string) {

    }

    private renderSpaces() {
        const rows: any[] = [];

        for (const space of this.state.spaces) {
            rows.push(
                <SpaceComponent
                    location={space.location}
                    name={space.name}
                    spaceId={space.spaceId}
                    reserveSpace={this.reserveSpace}
                />
            )
        }
    }

    render() {
            return (
            <div>
                <h2>Welcome to the Space Page</h2>
                {this.renderSpaces()}
            </div>
            )
    }

}