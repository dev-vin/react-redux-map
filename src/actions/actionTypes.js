import { FETCH_PLACES, SHOW_FOUND_PLACE } from '../constants';

export const fetchPlaces = place => ({ type: FETCH_PLACES, payload: place });
export const showFoundPlace = payload => ({ type: SHOW_FOUND_PLACE, payload });