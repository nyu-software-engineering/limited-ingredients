import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../../actions/search";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class RecipeForm extends Component {
    constructor() {
        super();
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
        //this.props.search(newQuery);
        
        axios
        .post("api/search", newQuery)
        .then(res => {
            //end loading state
            console.log(res.data);
            // this.setState({ results: res.data});
            this.setState({ results: [{id: 7777, name:'Salad',directions:'do some things','ingredientes':'you need this'},{id: 9999, name:'another recipe',directions:'do some things','ingredientes':'you need this'}]});

        }) 
        .catch(err => {
            //end loading state
            console.log('catch err');
            console.log(err);
        });
    };
    onRecipeClick = (e,recId) => {
        //open more display
        // e.target.style['display'] = 'none';
        //set state of clickedRecipe = recipe id
        this.setState({selectedRecipeId: recId})
    }
    renderSubMenu = rec =>{
        if(this.state.selectedRecipeId === rec.id){
            const subHeading = {
                fontSize: '16px',
            }
            return <div>
                        <p style={subHeading}>Directions</p>
                        <p>{rec.directions}</p>
                        <p style={subHeading}>Ingredients</p>
                        <p>{rec.ingredients}</p>
                    </div>
        }
    }
    renderMoreButton = rec => {
        if(this.state.selectedRecipeId !== rec.id){
            const moreButton ={
                color: 'cornflowerblue',
            }
            return <a style={moreButton} onClick={(e)=>this.onRecipeClick(e,rec.id)}>More +</a>
        }
    } 
    //render the recipes
    createRecipes () {
        const recipe = {
            marginTop: '48px',
            borderTop: "1px solid lightgray",
        }
        
        const recipes = this.state.results;
        return recipes.map( rec => {

            return <div style={recipe}>
                        <h3>{rec.name}</h3>
                        {this.renderMoreButton(rec)}
                        {this.renderSubMenu(rec)}
                    </div>

        });
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
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                <div>
                    {this.createRecipes()}
                    {this.props.received}
                </div>
            </div>
        );
    }
}

RecipeForm.propTypes = {
    search: PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    received: state.received,
  });
/*
export default connect (
    mapStateToProps,
    {findRecipes}
)(RecipeForm)
*/
export default connect(mapStateToProps,{search})(withRouter(RecipeForm));