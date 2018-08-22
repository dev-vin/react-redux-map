import { FETCH_PLACES, SHOW_FOUND_PLACE } from '../constants/autoComplete';

export const fetchPlaces = place => ({ type: FETCH_PLACES, payload: place });
export const showFoundPlace = () => ({ type: SHOW_FOUND_PLACE });