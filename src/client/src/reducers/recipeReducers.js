import {
    UPDATE_RECIPE
  } from "../actions/types";

const ingredientState = {
    received: false
  }

export default function (state = ingredientState, action) {
    switch (action.type) {
        case UPDATE_RECIPE:
            return {
                received: true
            }
        default:
            return state;
    }
}