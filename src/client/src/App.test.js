import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';

import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16'

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component testing', function() {
  it('renders landing message', function() {
    const wrapper = shallow(<App />); 
    const router = 
    <div className="App">
    <Navbar />
    <Route exact path="/" component={Landing} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
  </div>
    expect(wrapper.contains(router)).to.equal(true);
  });
});