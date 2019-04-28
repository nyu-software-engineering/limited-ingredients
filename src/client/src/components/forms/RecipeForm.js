import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../../actions/search";
import { saveRecipe } from "../../actions/save";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SaveButton from "./SaveButton";
import DeleteButton from "../dashboard/DeleteButton";
import ReduxLazyScroll from "../lazyscroll/ReduxLazyScroll";
import classnames from "classnames";
import '../../recipes.css';
import selectedRecipeImg from '../../selected-recipe.png';
import unselectedRecipeImg from '../../unselected-recipe.png';
import axios from "axios";
import { UPDATE_RECIPE } from "../../actions/types";

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        //this.search = this.props.search.bind(this);
        this.state = {
            query: "",
            results: [],
            selectedRecipeId: -1,
            error: false,
            hasMore: true,
            isLoading: false
        }
        /*
        window.onscroll = () => {
            const {
                loadRecipes,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;
            if (error || isLoading || !hasMore) return;
                // Checks that the page has scrolled to the bottom
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                loadRecipes();
            }
        };
        */
       this.loadRecipes = this.loadRecipes.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        //set loading state
        e.preventDefault();
        //const {skip, limit} = this.props.recipeEntity;
        const newQuery = {
            query: this.state.query,
            limit: this.props.recipeEntity.limit,
            skip: this.props.recipeEntity.skip + this.props.recipeEntity.limit
        };
        
        //submit form using redux way
        this.props.search(newQuery);
    };
    loadRecipes() {
        if (this.state.query){
            const newQuery = {
                query: this.state.query,
                limit: this.props.recipeEntity.limit,
                skip: this.props.recipeEntity.skip + this.props.recipeEntity.limit
            };    
            this.props.search(newQuery);
        }
       
    }
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
        console.log("recipes in createRecipes: ", recipes);
        //issue: reloading the page does not reflect that a saved recipe was saved
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
                            {/*this.renderLikeButton(rec)*/}
                            <SaveButton key={i} recipe={rec._id} userId={this.props.auth.user.id}></SaveButton>
                            {/* The delete button is rendered here for testing, it would ideally be in the user dashboard */}
                            <DeleteButton recipeId={rec._id} userId={this.props.auth.user.id} clicked={false}></DeleteButton>
                        </div>
                    </div>

        });
        
    }
   
    render() {
        const center = {
            margin: "20px 20% 20% 20%",
        }
        // redux debugging
        const received = this.props.received;
        const {isFetching, errorMessage, hasMore} = this.props.recipeEntity;

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
                {/*
                <div className="recipes">
                    {this.createRecipes()}
                </div> 
                */}
                {
                <div className="container posts-lazy-scroll">
                    <ReduxLazyScroll
                    isFetching={isFetching}
                    errorMessage={errorMessage}
                    loadMore={this.loadRecipes}
                    hasMore={this.props.recipes.recipes.length <= 100}
                    >
                    {this.createRecipes()}
                    
                    </ReduxLazyScroll>
                    <div className="row posts-lazy-scroll__messages">
                    {isFetching && <div className="alert alert-info"> Loading more recipes... </div>}

                    {!hasMore && !errorMessage &&
                        <div className="alert alert-success">All the recipes have been loaded successfully.</div>
                    }

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    </div>
                </div> 
                }
                
            </div>
        );
    }
}

RecipeForm.propTypes = {
    
    recipeEntity: PropTypes.shape({
        errorMessage: PropTypes.string,
        isFetching: PropTypes.bool,
        limit: PropTypes.number,
        skip: PropTypes.number,
        recipes: PropTypes.array,
        hasMore: PropTypes.bool
    }),
    
    search: PropTypes.func.isRequired
  };
  const mapStateToProps = state => {
        console.log("state: ", state);
        
        return {
            auth: state.auth,
            errors: state.errors,
            recipes: state.recipe,
            recipeEntity: state.recipe
            //payload: state.payload

        }
        
       

      
  }
    
/*
export default connect (
    mapStateToProps,
    {findRecipes}
)(RecipeForm)
*/
export default connect(mapStateToProps,{search})(withRouter(RecipeForm));