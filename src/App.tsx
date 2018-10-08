import * as React from 'react';
import './App.css';


import MemberSearchTable from './components/MemberSearchTable.Component';

class App extends React.Component {

  

  public render() {
    return (
      <div className="App">
        <h1>Search for legislators in the senate or house of reps</h1>
        <MemberSearchTable />
      </div>
    );
  }
}

export default App;
