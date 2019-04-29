import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../../actions/search";
import { saveRecipe } from "../../actions/save";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SaveButton from "./SaveButton";
import classnames from "classnames";
import '../../recipes.css';
import selectedRecipeImg from '../../selected-recipe.png';
import unselectedRecipeImg from '../../unselected-recipe.png';
import axios from "axios";
import { UPDATE_RECIPE } from "../../actions/types";

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            selectedRecipeId: -1,
            savedRecipes: [], // this array indicates whether the recipe be displayed as saved or not
            // this array indicates whether the recipe be displayed as saved or not
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        //set loading state
        e.preventDefault();
        const newQuery = {
            query: this.state.query
        };
        console.log(newQuery);
        //submit form using redux way
        this.loadSavedRecipes();
        this.props.search(newQuery);
    };
    onRecipeClick = (e,recId) => {
        //open more display
        // e.target.style['display'] = 'none';
        //set state of clickedRecipe = recipe id
        this.setState({selectedRecipeId: recId})
    }
    renderSubMenu = rec =>{
        if(this.state.selectedRecipeId === rec._id){
            const dir = [];
            for (const [index, value] of rec.directions.entries()) {
                dir.push(<li className='sub-details'>{value}</li>);
            }
            const ingred = [];
            for (const [index, value] of rec.ingredients.entries()) {
                ingred.push(<li>{value}</li>);
            }
            return <div className='sub-menu'>
                        <p className='sub-heading'>Directions</p>
                        {dir}
                        <p className='sub-heading'>Ingredients</p>
                        {ingred}
                    </div>
        }
    }
    renderMoreButton = rec => {
        if(this.state.selectedRecipeId !== rec._id){
            const moreButton ={
                color: 'cornflowerblue',
            }
            return <a style={moreButton} className='more-button' onClick={(e)=>this.onRecipeClick(e,rec._id)}>More +</a>
        }
    } 


    //render the recipes
    createRecipes () {
        //console.log("this.props: ", this.props);
        const recipes = this.props.recipes.recipes;
        //console.log("recipes in createRecipes: ", recipes);
        //issue: reloading the page does not reflect that a saved recipe was saved
        
        console.log(this.state.savedRecipes);
        console.log(recipes);
        return recipes.map( (rec, i) => {
            
            return <div key = {i} className='recipe-container'>
                        <div className='recipe-left'>
                            <img src={rec.imageURL} />
                        </div>
                        <div className='recipe-middle'>
                            <h3>{rec.name}</h3>
                            <p>Prep Time: {rec.prepTime} Cook Time: {rec.cookTime} Total Time: {rec.totalTime}</p>
                            {this.renderMoreButton(rec)}
                            {this.renderSubMenu(rec)}
                        </div>
                        <div className='recipe-right'>
                            {this.renderHeart(rec._id)}
                        </div>
                    </div>

        });
        
    }
    renderHeart(recId){
        const savedRecipes = this.state.savedRecipes;
        if(savedRecipes.includes(recId)){
            return  <SaveButton recipe={recId} saved={true}></SaveButton>
        }else{
            return  <SaveButton recipe={recId} saved={false}></SaveButton>
        }
    }
   loadSavedRecipes () {
        const { user } = this.props.auth;

        axios.get("api/getRecipesUser", {
            params: {
                userId: user.id,
                justIds: true
            }
        })
        .then((res) => {
            this.setState({savedRecipes: res.data});
        });
    }
    componentDidMount(){
        this.loadSavedRecipes();
    }

    render() {
        const center = {
            margin: "20px 20% 20% 20%",
        }
        // redux debugging
        const received = this.props.received;
        //console.log("Rendering Recipei Form");
        return (
            <div style={center} >
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                            value={this.state.query}
                            id="query"
                            type="text"
                        />
                        <label htmlFor="query">Enter your ingredients (separate each ingredient with a space)</label>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >Search
                        </button>
                    </div>
                </form>
                <div className="recipes">
                    {this.createRecipes()}
                    {this.props.recieved}
                </div>
            </div>
        );
    }
}

RecipeForm.propTypes = {
    search: PropTypes.func.isRequired
  };
  const mapStateToProps = state => {
        //console.log("state: ", state);
        return {
            auth: state.auth,
            errors: state.errors,
            recipes: state.recipe
        }
      
  }
    
/*
export default connect (
    mapStateToProps,
    {findRecipes}
)(RecipeForm)
*/
export default connect(mapStateToProps,{search})(withRouter(RecipeForm));