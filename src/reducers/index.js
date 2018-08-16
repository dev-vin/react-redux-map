import {FETCH_PLACES, SHOW_PLACES } from '../constants/autoComplete.js'

export default (state = { isPinging: false }, action) => {
    switch (action.type) {
      case FETCH_PLACES:
        return { isPinging: true };
  
      case SHOW_PLACES:
        return { isPinging: false };
  
      default:
        return state;
    }``
  };
  