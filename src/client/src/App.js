import React, { Component } from 'react';
import io from 'socket.io-client';
import OAuth from './)Auth';
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

export default App;
