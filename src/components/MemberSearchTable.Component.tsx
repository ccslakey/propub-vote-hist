import { filter } from 'lodash';
import * as React from 'react';
import PropublicaService from '../lib/Propublica.Service';

// interface Props {
//     onclick: (e: any) => void;
    
// };

const ppService = new PropublicaService();

interface ISearchStateType {
    firstNameInput: string,
    lastNameInput: string,
    members: any[],
    filteredMembers: any[],
    numMembers: number,
    serving?: boolean | null
};


class MemberSearchTable extends React.Component {
    public state: ISearchStateType
    public props: any;
    public constructor(props: any) {
        super(props);
        this.state = {
            filteredMembers: [],
            firstNameInput: '',
            lastNameInput: '',
            
            members: [],
            numMembers: 0,
            serving: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public componentDidMount() {
        this.loadMembers();
    }

    public loadMembers(){
        ppService.getMembersList().then(data => {
            console.log("data");
            console.log(data);
            const { members, num_results } = data.results[0];

            this.setState({ numMembers: num_results, members });
        }).catch(e => {
            console.log(e);
        });
    }

    public async handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setState({[name]: value});
        this.findMembers();
    }

    public findMembers() {
        const { firstNameInput, lastNameInput } = this.state;
        if(this.state.members && (this.state.firstNameInput.length || this.state.lastNameInput.length)) {
            const filteredMembers = filter(this.state.members, (member: any) => {
                return member.first_name.toLowerCase().includes(firstNameInput.toLowerCase() || '') && member.last_name.toLowerCase().includes(lastNameInput.toLowerCase() || '');
            });
            this.setState({filteredMembers});
        }
    }

    public handleSubmit(event: any) {
        alert(`A name was submitted: ${this.state.firstNameInput} ${this.state.lastNameInput}`);
        event.preventDefault();
    }
    
    public render () {
        let tableContent;
        let members;
        if(this.state.members.length) {
            members = this.state.filteredMembers.length ? this.state.filteredMembers: this.state.members; // use the input as filter or the base list
            tableContent = members.map(legislator => {
                return <div key={legislator.id}>{legislator.first_name} {legislator.last_name}</div>
            })
        } else {
            tableContent = <div>Loading...</div>
        }
        
        
        return(
            <div className='member-search-form'>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.firstNameInput} name='firstNameInput' onChange={this.handleInputChange}/>
                    <input type='text' value={this.state.lastNameInput} name='lastNameInput' onChange={this.handleInputChange}/>
                    <input type='submit' value='Submit' />
                </form>
            
                <br />
                {tableContent}
            </div>
        )
    }
};

export default MemberSearchTable;
