import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.scss';

import TopBar from './components/TopBar/TopBar';
// import faker from 'faker';

class App extends Component {
  render() {
    const data = {};
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <TopBar data={data}/>
        {/*
            <Router>
            <Route path='/' component={} />
        </Router>
        */}
      </div>
    );
  }
}

export default App;
