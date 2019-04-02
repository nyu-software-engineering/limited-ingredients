import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { search } from "../../actions/search";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
/* other method of creating components
const RecipeForm = (props) => {
    return
}
*/
class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: []
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
        const newQuery = {
            query: this.state.query

        };
        console.log(newQuery);
        //submit form using redux way
        this.props.search(newQuery);
        /*
        //using react way to make requests
        axios
        .post("api/search", newQuery)
        .then(res => {
            console.log(res.data);
            this.setState({ results: res.data});
        }) 
        .catch(err => {
            console.log('catch err');
            console.log(err);
        });
        */
    };
    //render the recipes
    createRecipes () {
        const recipes = this.props.recipes.recipes;
        return recipes.map( (x, i) => {
            //let recipe_ingredients = x.ingredients
            return <div key={i} style = {{border: "1 px solid black"}}>
                        <h2>{x.name}</h2>
                        <h3>Directions</h3>
                        <p>{x.directions}</p>
                        <h3>Ingredients</h3>
                        <p>{x.ingredients}</p>
                    </div>

        });
    }
    

    render() {
        const center = {
            margin: "20%"
        }
        // redux debugging
        console.log('rendered');
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
                <div className="recipes">
                    {this.createRecipes()}
                    {/* {this.renderRecipe()} */}
                </div>
            </div>
        );
    }
}

RecipeForm.propTypes = {
    search: PropTypes.func.isRequired
};
const mapStateToProps = state => {
    console.log(state);
    return {
        auth: state.auth,
        errors: state.errors,
        recipes: state.recipes
    }
}
/*
export default connect (
    mapStateToProps,
    {findRecipes}
)(RecipeForm)
*/


export default connect(mapStateToProps, { search })(withRouter(RecipeForm));