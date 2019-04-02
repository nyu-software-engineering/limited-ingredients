
import axios from "axios";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_RECIPE
} from "./types";
// search recipes
export const search = (query) => dispatch => {
  axios
    .post("api/search", query)
    .then(res => {
      console.log("res: ", res);
      dispatch(setResults(res));
    }) 
    .catch(err => {
      console.log('catch err');
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setResults = (recipes) =>{
  return {
    type: UPDATE_RECIPE,
    payload: {
      received: true,
      recipes: recipes.data
    }
  };
};

