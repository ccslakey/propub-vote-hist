import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import LegislatorProfile from './components/LegislatorProfile/LegislatorProfile.Component';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';




ReactDOM.render(
  <Router>
    
    
    <Switch>
      <Route exact={true} path='/' component={App}/>
      
      <Route path='/legislator/:id' component={LegislatorProfile}/>
    </Switch>
    </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
