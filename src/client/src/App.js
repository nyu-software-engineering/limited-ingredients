import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import logo from './logo.svg';

import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
    
    );
  }
}

/*
import io from 'socket.io-client';

import OAuth from './OAuth';

import { API_URL } from './config'
//import logo from './logo.svg';
import './App.css';
const socket = io(API_URL);
const providers = ['facebook']
class App extends Component {
  render() {
    return (

      <div className={'wrapper'}>
        <div className={'container'}>
          {providers.map(provider => 
            <OAuth 
              provider={provider}
              key={provider}
              socket={socket}
            />
          )}
        </div>
      </div>
    );
  }
}
*/
export default App;
