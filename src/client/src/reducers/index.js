//defines rootReducer
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import recipeReducers from "./recipeReducers";
export default combineReducers({
  auth: authReducer,
  recipes: recipeReducers,
  errors: errorReducer
});