import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import placesReducer from './reducers';
import placesEpic from './epics';

export const rootEpic = combineEpics(placesEpic);

export const rootReducer = combineReducers({
    placesReducer
});