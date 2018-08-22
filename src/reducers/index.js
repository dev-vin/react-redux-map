import {FETCH_PLACES, SHOW_FOUND_PLACE } from '../constants/index.js'

export default (state = {}, action) => {
    switch (action.type) {
      // case FETCH_PLACES:
      //   return { isPinging: true };
      case SHOW_FOUND_PLACE:
        // return { ...state, placeFound: action.payload };
        return { placeFound: action.payload };
      default:
        return state;
    }
  };
  