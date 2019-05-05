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
            savedRecipesIds: []
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
        const recipes = this.state.savedRecipes;
        
        return recipes.map( (rec, i) => {
            
            return <div key = {i} className='recipe-container'>
                        <div className='recipe-left'>
                            <img src={rec.imageURL} />
                        </div>
                        <div className='recipe-middle'>
                            <h3>{rec.name}</h3>
                            <p class='cook-time'>Prep Time: {rec.prepTime.replace("PT", "").replace("M"," minutes").replace("H"," hours ")}</p>
                            <p class='cook-time'>Cook Time: {rec.cookTime.replace("PT", "").replace("M"," minutes").replace("H"," hours ")}</p> 
                            <p class='cook-time'>Total Time: {rec.totalTime.replace("PT", "").replace("M"," minutes").replace("H"," hours ")}</p>
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
    renderHeart(recId){
        const savedRecipesIds = this.state.savedRecipesIds;
        if(savedRecipesIds.includes(recId)){
            return  <SaveButton recipe={recId} saved={true}></SaveButton>
        }else{
            return  <SaveButton recipe={recId} saved={false}></SaveButton>
        }
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
        axios.get("api/getRecipesUser", {
            params: {
                userId: user.id,justIds: true
            }
        })
        .then((res) => {
            this.setState({savedRecipesIds: res.data});
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