import axios from "axios";
import {SAVE_RECIPE, GET_ERRORS} from "./types";
import { get } from "http";

export const saveRecipe = (request) => dispatch => {
    //console.log("in save Recipe reducer");
    //console.log(request);
    axios.post("api/saveRecipe", request)
         .then(res => {
             //console.log("res: ", res);
             dispatch(sendResponse(res));
         })
         .catch(err => {
            console.log("err in saveRecipe: ", err);
            //want this to send an error response, saveRecipe should not be in the state....
            //{errors: "User already saved this recipe"}}
            //dispatch({type: GET_ERRORS, {payload: err});
            dispatch(sendError(err));
         });
}

export const sendResponse = (response) => {
    console.log("send response");
    //console.log(response);
    return {
        type: SAVE_RECIPE,
        payload: response 
    }
}
export const sendError = (response) => {
    return {
        type: GET_ERRORS,
        payload: response
    }
}