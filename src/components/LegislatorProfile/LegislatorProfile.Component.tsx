import * as React from 'react';
import PropublicaService from '../../lib/Propublica.Service';

interface IProps {
    id: string,
    match: any
}

const ppService = new PropublicaService();

class LegislatorProfile extends React.Component {
    public props: IProps;

    public constructor(props: IProps) {
        super(props);

        this.state = {};

    }


    public componentDidMount() {
        this.getLegislatorInfo();
    }

    public async getLegislatorInfo() {
        const { id } = this.props.match.params;
        const data = await ppService.getMemberById(id);
        console.log('got data');
        console.log(data);
        
        
    }

    public getLegislatorImage() {
        const { id } = this.props.match.params;
        
        const filePath = `../../static/original/${id}.jpg`;

        return <img src={filePath} />
    }

    public render() {

        const profilePic = this.getLegislatorImage();
        return(
            <div>
                <h3>hello legislator {this.props.match.params.id}</h3>
                {profilePic}
            </div>
        )
    }

}

export default LegislatorProfile;