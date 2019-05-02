import {
    UPDATE_RECIPE
  } from "../actions/types";

const ingredientState = {
    received: false,
    recipes: [],
    //new stuff
    isFetching: false,
    errorMessage: '',
    skip: 0,
    limit: 20,
    hasMore: true,
  }

export default function (state = ingredientState, action) {
    switch (action.type) {
        case UPDATE_RECIPE:
            //console.log("action in recipe reducer: ", action.payload);
            console.log("skip: ", state.skip);
            console.log("action: ", action);
            return Object.assign({}, state, {
                isFetching: false,
                //recipes: action.payload.recipes.concat(state.recipes),
                recipes: state.recipes.concat(action.payload.recipes),
                hasMore: action.hasMore,
                skip: state.skip + state.limit
            })
            
           //return action.payload;
        default:
            return state;
    }
}