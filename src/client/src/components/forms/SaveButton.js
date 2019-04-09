import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import unselectedRecipeImg from '../../unselected-recipe.png';
import { saveRecipe } from "../../actions/save";

class SaveButton extends Component{
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    save() {
        //console.log("recipe: this.props.recipe");
        console.log("user Id: ", this.props.userId);
        // send the request.
        const newQuery = {recipe: this.props.recipe, userId: this.props.auth.user.id};
        /*
        if (this.props.auth.user.recipes.includes(newQuery.recipe)){
            alert("Already saved this recipe");
        }
        */
        this.props.saveRecipe(newQuery);
    }

    render () {
        return (
            <img src={unselectedRecipeImg} onClick={this.save}/>
            // <button >Hello Click Me</button>
        );
    }
}
SaveButton.propTypes = {
    saveRecipe: PropTypes.func.isRequired
  };
  const mapStateToProps = state => {
        //console.log("state: ", state);
        return {
            auth: state.auth
            //errors: state.errors,
            //recipes: state.recipe
        }
      
  }
export default connect(mapStateToProps,{saveRecipe})(withRouter(SaveButton));