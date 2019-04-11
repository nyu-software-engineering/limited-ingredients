import axios from "axios";
import {SAVE_RECIPE, GET_ERRORS} from "./types";

export const saveRecipe = (request) => dispatch => {
    axios.post("api/saveRecipe", request)
         .then(res => {
             //console.log("res: ", res);
             dispatch(sendResponse(res));
         })
         .catch(err => {
            console.log("err in saveRecipe: ", err);
            dispatch({type: GET_ERRORS, payload: {errors: "User already saved this recipe"}});
         });
}

export const sendResponse = (response) => {
    return {
        type: SAVE_RECIPE,
        payload: response 
    }
}