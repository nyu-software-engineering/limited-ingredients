import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class RecipeForm extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return (<p> Hello, this is where you will search ingredients </p>);
    }
}
/*
const mapStateToProps = state => {

}
export default connect (
    mapStateToProps,
    {findRecipes}
)(RecipeForm)
*/
export default RecipeForm