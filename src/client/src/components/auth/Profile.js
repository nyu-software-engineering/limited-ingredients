import React, { Component } from "react";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SaveButton from "../forms/SaveButton";
import selectedRecipeImg from '../../selected-recipe.png';
import unselectedRecipeImg from '../../unselected-recipe.png';
import axios from "axios";

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            selectedRecipeId: -1,
            savedRecipes: [], // this array indicates whether the recipe be displayed as saved or not
        }
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    onRecipeClick = (e,recId) => {
        //open more display
        // e.target.style['display'] = 'none';
        //set state of clickedRecipe = recipe id
        this.setState({selectedRecipeId: recId})
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
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
    createRecipes () {
        console.log("this.props: ", this.props);
        const recipes = this.state.savedRecipes;
        //console.log(recipes);
        //console.log("recipes in createRecipes: ", recipes);
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
                        </div>
                    </div>

        });
        
    }
    componentDidMount () {

        const { user } = this.props.auth;

        axios.get("api/getRecipesUser", {
            params: {
                userId: user.id
            }
        })
        .then((res) => {
            this.setState({savedRecipes: res.data});
        });
    }
    render() {
        const space = {
            margin: "20px 20% 20% 20%",
        }
        const { user } = this.props.auth;

        return (        
        <div style={space}>
            <center>
                <h1>{user.name}</h1>
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                Logout
                </button>
            </center>
            <div className="recipes">
                {this.createRecipes()}
                {this.props.recieved}
            </div>
        </div>
        );


    }
}
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    recipes: state.recipe
});
export default connect(
    mapStateToProps,
    { logoutUser }
  )(Profile);