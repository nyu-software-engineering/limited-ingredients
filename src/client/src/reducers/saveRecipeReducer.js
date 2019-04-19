import {SAVE_RECIPE} from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
    switch (action.type) {
      case SAVE_RECIPE:
        return action.payload;
      default:
        return state;
    }
  }
