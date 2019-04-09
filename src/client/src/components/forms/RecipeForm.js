import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../../actions/search";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import '../../recipes.css';
import selectedRecipeImg from '../../selected-recipe.png';
import unselectedRecipeImg from '../../unselected-recipe.png';

class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            selectedRecipeId: -1,
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
        console.log("this.props: ", this.props);
        
        const recipes = this.props.recipes.recipes;
        console.log("recipes in createRecipes: ", recipes);
        
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
                            {this.renderLikeButton(rec)}
                        </div>
                    </div>

        });
        
    }
    
    renderLikeButton = (rec) =>{
        // if(rec._id in user.savedRecipes){
            // return <img src={selectedRecipeImg}/>
        // }else{
            return <img  src={unselectedRecipeImg}/>
        //onclick={saveRecipe(rec)}
        
    }


    render() {
        const center = {
            margin: "20px 20% 20% 20%",
        }
        // redux debugging
        const received = this.props.received;
        
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
        console.log("state: ", state);
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