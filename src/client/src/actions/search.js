
import axios from "axios";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_RECIPE
} from "./types";
// search recipes
export const search = (query) => dispatch => {
  console.log('search query: ', query);
  axios
    .post("api/search", query)
    .then(res => {
      //console.log("res: ", res);
      dispatch(setResults(res));
    }) 
    .catch(err => {
      //console.log('catch err');
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const setResults = (recipes) => {
  return {
    type: UPDATE_RECIPE,
    payload: {
      recieved: true,
      recipes: recipes.data
    }

  };
};

