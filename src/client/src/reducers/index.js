//defines rootReducer
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import recipeReducers from "./recipeReducers";
import saveRecipeReducer from "./saveRecipeReducer";
export default combineReducers({
  auth: authReducer,
  recipe: recipeReducers,
  saveRecipe: saveRecipeReducer,
  errors: errorReducer
});