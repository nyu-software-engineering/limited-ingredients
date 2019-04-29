import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {deleteRecipe} from "../../actions/delete";
import axios from "axios";

class DeleteButton extends Component {
    constructor (props){
        super(props);
        this.delete = this.delete.bind(this);
        /*
        this.state = {
            clicked: false,
            recipeId: this.props.recipeId,
            userId: this.props.auth.user.id,
            style: {}
        }
        */
    }
    delete(){
        const requestBody = {recipeId: this.props.recipeId,  userId: this.props.auth.user.id};
        //this.props.deleteRecipe(requestBody);
        axios.post("api/deleteRecipe", requestBody)
         .then (res => {
            if (res.status == 200){
                alert("deleted!");
                //this.setState({clicked:true});
            }
         })
         .catch(err => {
            console.log("err deleting recipe: ", err);
            //this.setState({clicked:false});
         }) 
    }

    render(){
        /*
        if (this.props.clicked){
            //this.style['backgroundColor'] = 'gray';
            this.setState({style: {backgroundColor: 'gray'}});
        }
        else{
            //this.style['backgroundColor'] = 'beige';
            this.setState({style: {backgroundColor: 'beige'}});
        }
        */
        return(
            <button onClick = {this.delete}>DELETE</button>
        )
    }
}
DeleteButton.propTypes = {
    deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
   return {
        auth: state.auth,
        errors: state.errors,
        recipes: state.recipe,
   } 
}
export default connect(mapStateToProps,{deleteRecipe})(withRouter(DeleteButton));