import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper green">
            <a href="/" className="brand-logo">Limited Ingredients<i className="material-icons">restaurant_menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/login">Profile</a></li>
              </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;