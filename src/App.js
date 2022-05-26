import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Config from './pages/Config';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/config" component={ Config } />
          <Route exact path="/trivia" component={ Trivia } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    );
  }
}

export default App;
