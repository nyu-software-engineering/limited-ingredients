import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import unselectedRecipeImg from '../../unselected-recipe.png';
import selectedRecipeImg from '../../selected-recipe.png';
import { saveRecipe } from "../../actions/save";


class SaveButton extends Component{
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    save() {
        // send the request. this.props.recipe contains only the recipe id
        const newQuery = {recipe: this.props.recipe, userId: this.props.auth.user.id};
        this.props.saveRecipe(newQuery);
        //this.setState({imgSrc: '../../selected-recipe.png'});
    }

    render () {
        console.log("rendering");
        if (this.props.errors.errors){
            alert(this.props.errors.errors);
        }
        return (
            <img src={this.props.imgSrc} onClick={this.save}/>
        );
    }
}
SaveButton.propTypes = {
    saveRecipe: PropTypes.func.isRequired
  };
  const mapStateToProps = state => {
        console.log("state in saveButton: ", state);
        return {
            auth: state.auth,
            errors: state.errors,
            recipes: state.recipe,
            imgSrc: state.saveRecipe.status == 200 ? selectedRecipeImg : unselectedRecipeImg,
            saveRecipeResponse: state.saveRecipe
        }    
        
       //return state;
  }
export default connect(mapStateToProps,{saveRecipe})(withRouter(SaveButton));