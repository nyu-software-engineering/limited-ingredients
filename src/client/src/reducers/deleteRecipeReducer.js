import {DELETE_RECIPE} from "../actions/types";
const initialState = {};
export default function(state = initialState, action) {
    switch (action.type) {
      case DELETE_RECIPE:
        return action.payload;
      default:
        return state;
    }
}