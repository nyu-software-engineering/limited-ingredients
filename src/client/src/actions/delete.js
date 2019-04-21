import axios from "axios";
import {DELETE_RECIPE, GET_ERRORS} from "./types";
export const deleteRecipe = (request) => dispatch => {
    axios.post("api/deleteRecipe", request)
         .then (res => {
             dispatch(sendResponse(res));
         })
         .catch(err => {
             dispatch(sendError(err));
         }) 
    
}  
export const sendResponse = (response) => {
    //errors should be removed from the state   
    return {
        type: DELETE_RECIPE,
        payload: response 
    }
}
export const sendError = (response) => {
    return {
        type: GET_ERRORS,
        payload: response
    }
}