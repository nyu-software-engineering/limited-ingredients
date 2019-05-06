import React, { Component } from "react";
import { Link } from "react-router-dom";
import './responsive.css'
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper green">
            <a href="/" className="brand-logo logo-responsive">Limited Ingredients<i className="material-icons icon-responsive">restaurant_menu</i></a>
              <ul className="right ">
                <li><a href="/">Home</a></li>
                <li><a href="/profile">Profile</a></li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;