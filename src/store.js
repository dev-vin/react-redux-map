import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import pingReducer from './reducers';
import placesEpic from './epics';

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(placesEpic)


export default function configureStore() {

    const store = createStore(
        pingReducer,
        applyMiddleware(epicMiddleware),
    );

    epicMiddleware.run(rootEpic);

    return store;
}