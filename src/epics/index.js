import { FETCH_PLACES, SHOW_PLACES } from '../constants/autoComplete';

const placesEpic = action$ =>
  action$.ofType(FETCH_PLACES)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: SHOW_PLACES });

export default placesEpic;
