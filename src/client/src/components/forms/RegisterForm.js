import React, { Component } from "react";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password

    };
    console.log(newUser);
    //submit form
  };
  render() {
    const { errors } = this.state;
    return (
        <form noValidate onSubmit={this.onSubmit}>
          <div className="input-field col s12">
            <input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s12">
            <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
            />
            <label htmlFor="password">Password</label>

          </div>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Sign up
            </button>
          </div>
        </form>
    );
  }
}
export default RegisterForm;