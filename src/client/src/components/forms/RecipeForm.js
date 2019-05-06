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
import './responsive.css';
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
            isLoading: false,
            savedRecipes: [], // this array indicates whether the recipe be displayed as saved or not
            // this array indicates whether the recipe be displayed as saved or not
        }

        this.loadRecipes = this.loadRecipes.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        //set loading state
        this.props.recipes.recipes = [];
        e.preventDefault();
        //const {skip, limit} = this.props.recipeEntity;

        const newQuery = {
            query: this.state.query,
            limit: this.props.recipeEntity.limit,
            skip: this.props.recipeEntity.skip + this.props.recipeEntity.limit
        };
        if (this.props.recipes.recipes.length == 0) {
            newQuery.skip = 0;
        }
        //submit form using redux way
        this.loadSavedRecipes();
        this.props.search(newQuery);
    };
    loadRecipes() {
        console.log("in loadRecipe");
        if (this.state.query) {
            const newQuery = {
                query: this.state.query,
                limit: this.props.recipeEntity.limit,
                skip: this.props.recipeEntity.skip + this.props.recipeEntity.limit
            };
            if (this.props.recipes.recipes.length == 0) {
                newQuery.skip = 0;
            }
            this.props.search(newQuery);
        }

    }
    onRecipeClick = (e, recId) => {
        //open more display
        // e.target.style['display'] = 'none';
        //set state of clickedRecipe = recipe id
        this.setState({ selectedRecipeId: recId })
    }
    renderSubMenu = rec => {
        if (this.state.selectedRecipeId === rec._id) {
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
        if (this.state.selectedRecipeId !== rec._id) {
            const moreButton = {
                color: 'cornflowerblue',
            }
            return <a style={moreButton} className='more-button' onClick={(e) => this.onRecipeClick(e, rec._id)}>More +</a>
        }
    }


    //render the recipes
    createRecipes() {
        //console.log("this.props: ", this.props);
        const recipes = this.props.recipes.recipes;
        console.log("recipes in createRecipes: ", recipes);
        //issue: reloading the page does not reflect that a saved recipe was saved

        return recipes.map((rec, i) => {

            return <div key={i} className='recipe-container container'>
                <div className='recipe-left'>
                    <img alt="recipe" id="image-icon" src={rec.imageURL} />
                </div>
                <div className='recipe-middle'>
                    <h3 id="recipe-name">{rec.name}</h3>
                    <p class='cook-time cook-time-responsive' >Prep Time: {rec.prepTime.replace("PT", "").replace("M", " minutes").replace("H", " hours ")}</p>
                    <p class='cook-time cook-time-responsive'>Cook Time: {rec.cookTime.replace("PT", "").replace("M", " minutes").replace("H", " hours ")}</p>
                    <p class='cook-time cook-time-responsive' >Total Time: {rec.totalTime.replace("PT", "").replace("M", " minutes").replace("H", " hours ")}</p>
                    <br></br>
                    {this.renderMoreButton(rec)}
                    {this.renderSubMenu(rec)}
                </div>
                <div className='recipe-right'>
                    {this.renderHeart(rec._id)}
                </div>
            </div>

        });

    }
    renderHeart(recId) {
        const savedRecipes = this.state.savedRecipes;
        if (savedRecipes.includes(recId)) {
            return (<SaveButton key={recId} recipe={recId} saved={true}></SaveButton>)
        } else {
            return (<SaveButton key={recId} recipe={recId} saved={false}></SaveButton>)
        }
    }
    loadSavedRecipes() {
        const { user } = this.props.auth;

        axios.get("api/getRecipesUser", {
            params: {
                userId: user.id,
                justIds: true
            }
        })
            .then((res) => {
                this.setState({ savedRecipes: res.data });
            });
    }
    componentDidMount() {
        this.loadSavedRecipes();
    }

    render() {
        const center = {
            margin: "80px ",
        }
        // redux debugging
        const received = this.props.received;
        const { isFetching, errorMessage, hasMore } = this.props.recipeEntity;

        return (
            <div style={center} id="body">
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.query}
                            id="query"
                            type="text"
                        />
                        <label id="label-overflow" htmlFor="query">Enter your ingredients (separate each ingredient with a space)</label>
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
                {/* {
                <div className="recipes">
                    {this.createRecipes()}
                </div> 
                } */}
                {
                    <div className="recipes">
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
                                <div className="alert alert-success all-loaded">All the recipes have been loaded successfully.</div>
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
export default connect(mapStateToProps, { search })(withRouter(RecipeForm));
