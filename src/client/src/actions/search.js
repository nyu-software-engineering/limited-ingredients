
import axios from "axios";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// search recipes
export const search = (query) => dispatch => {
  axios
    .post("api/search", query)
    .then(res => {console.log("res: ", res)}) // re-direct to login on successful register
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};