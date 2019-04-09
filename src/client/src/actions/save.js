import axios from "axios";
//import {SAVE_RECIPE} from "./types";

export const saveRecipe = (request) => dispatch => {
    axios.post("api/saveRecipe", request)
         .then(res => {
             console.log("res: ", res);
         })
         .catch(err => {
             console.log("err in saveRecipe: ", err);
         });
}