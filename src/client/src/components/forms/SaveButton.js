import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import unselectedRecipeImg from '../../unselected-recipe.png';
import selectedRecipeImg from '../../selected-recipe.png';
import { saveRecipe } from "../../actions/save";
import axios from "axios";

class SaveButton extends Component{
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        //this.imgSrcList = new Array(this.props.lenofitems);
    }

    save() {
        // send the request. this.props.recipe contains only the recipe id
        const newQuery = {recipe: this.props.recipe, userId: this.props.auth.user.id};
        this.props.saveRecipe(newQuery);
        /*
        axios.post("api/saveRecipe", newQuery)
         .then(res => {
            console.log("SAVE RECIPE RESPONSE:", res);
            if (res.status == 200){
                console.log("setting imgSrc");
                this.setState({imgSrc: selectedRecipeImg});
                alert("saved!");
            }
         }).catch(err => {
            console.log("err in saveRecipe: ", err);
            alert("Already saved this recipe");
         });
         */
    }

    render () {
        console.log("save button rendering");
        if (this.props.errors.errors){
            //alert(this.props.errors.errors);
            console.log("has error: ", this.props.errors.errors);
        }
        return (
            <img src={this.props.imgSrc} onClick={this.save}/>
        );
    }

    // shouldComponentUpdate(nextProps){
        
    // }
}

SaveButton.propTypes = {
    saveRecipe: PropTypes.func.isRequired
  };
  const mapStateToProps = (state, ownProps) => {
        console.log("state in saveButton: ", state);
        //console.log("own props: ", ownProps);
        let currentRecipeSaved = false;
        if (state.saveRecipe["data"]){
            if (state.saveRecipe["data"]["recipes"]){
                //console.log("response has recipes");
                let recipe_length = state.saveRecipe.data.recipes.length;
                if (state.saveRecipe.data.recipes[recipe_length - 1] == ownProps.recipe){
                    //console.log("current recipe saved");
                    currentRecipeSaved = true
                }
            }
        }
        return {
            auth: state.auth,
            errors: state.errors,
            recipes: state.recipe,
            imgSrc: state.saveRecipe.status == 200 && currentRecipeSaved ? selectedRecipeImg : unselectedRecipeImg
            //saveRecipeResponse: state.saveRecipe
        }    
        
       //return state;
  }
export default connect(mapStateToProps,{saveRecipe})(withRouter(SaveButton));