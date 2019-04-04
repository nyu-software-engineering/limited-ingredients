import {
    UPDATE_RECIPE
  } from "../actions/types";

const ingredientState = {
    received: false,
    recipes: []
  }

export default function (state = ingredientState, action) {
    switch (action.type) {
        case UPDATE_RECIPE:
            /*
            return {
                received: true
            }
            */
           return action.payload;
        default:
            return state;
    }
}