import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div class="nav-wrapper green">
            <a href="/" class="brand-logo">Limited Ingredients<i class="material-icons">restaurant_menu</i></a>
              <ul class="right hide-on-med-and-down">
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