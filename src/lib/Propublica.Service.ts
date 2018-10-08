class PropublicaService {
    public baseUrl: string;
    private _API_KEY: string;

    public constructor() {
        
        this.baseUrl = 'https://api.propublica.org/congress/v1';
        this._API_KEY = '04VcutIuRh2JR6XjLRzVg2vwFpKe5vKXp4iuI0Yd';
    }

    public async getMembersList() {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': this._API_KEY
        });
    
        const congress = 115; // 102-115 for house
                              // 80-115 for senat
        const chamber = 'house'; // 'house' | 'senate'
        
        const response = await fetch(`${this.baseUrl}/${congress}/${chamber}/members.json`, {headers});
        const data = await response.json();
        
        return data;
    }
};


// let x = new PropublicaService();

// x.getMembersList();
// debugger;

export default PropublicaService;