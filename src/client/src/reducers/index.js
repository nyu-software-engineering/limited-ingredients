//defines rootReducer
import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import recipeReducers from "./recipeReducers";
import saveRecipeReducer from "./saveRecipeReducer";
import deleteRecipeReducer from "./deleteRecipeReducer";
export default combineReducers({
  auth: authReducer,
  recipe: recipeReducers,
  saveRecipe: saveRecipeReducer,
  deleteRecipe: deleteRecipeReducer,
  errors: errorReducer
});