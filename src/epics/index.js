import { FETCH_PLACES } from '../constants/autoComplete';
import { showFoundPlace } from '../actions/actionTypes';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

const placesEpic = action$ => action$.pipe(
  ofType(FETCH_PLACES),
  map(() => showFoundPlace())
);

export default placesEpic;
