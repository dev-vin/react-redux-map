import React from 'react';
import PropTypes from 'prop-types';
import { combineEpics, createEpicMiddleware, ofType } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { map } from 'rxjs/operators';
import { connect } from 'react-redux';
import { fetchPlaces } from '../actions/actionTypes';
// import { reducer as reduxFormReducer } from 'redux-form';

// const ACTIONS = {
//     FETCH_PLACES: 'FETCH_PLACES',
//     SHOW_FOUND_PLACE: 'SHOW_FOUND_PLACE',
// };

// const fetchPlaces = place => ({ type: ACTIONS.FETCH_PLACES, payload: place });
// const showFoundPlace = () => ({ type: ACTIONS.SHOW_FOUND_PLACE });

// const placesEpic = action$ => action$.pipe(
//     ofType(ACTIONS.FETCH_PLACES),
//     map(() => showFoundPlace())
// );

// const rootEpic = combineEpics(placesEpic);

// const places = (state = { isHappy: true }, action) => {
//     switch(action.type) {
//         case ACTIONS.SHOW_FOUND_PLACE:
//             return state;
//         default: 
//             return state;
//     }
// };

// const epicMiddleware = createEpicMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     combineReducers({
//         places,
//     }), 
//     applyMiddleware(epicMiddleware)
// );

// epicMiddleware.run(rootEpic)

// const { foundPlace } = store.getState();
export class GoogleMap extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.onScriptLoad = this.onScriptLoad.bind(this);
    // }

    onScriptLoad=()=>{
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
                this.props.options);
        if(this.props.hasAutoComplete) {
            // console.log(window.google)
            var card = document.getElementById('pac-card');
            var input = document.getElementById('search');

            // positioning of search bar
            map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);

            // Autocomplete API 
            var autocompleteservice = new window.google.maps.places.Autocomplete(input);
            autocompleteservice.bindTo('bounds', map);
            autocompleteservice.setFields(['address_components', 'geometry', 'icon', 'name']);

            var marker = new window.google.maps.Marker({
                map: map,
                anchorPoint: new window.google.maps.Point(0, -29)
            });
      
            
    
            autocompleteservice.addListener('place_changed', function(){
                console.log('changed')
                let place = autocompleteservice.getPlace();
                this.props.showFound()
                // store.dispatch(fetchPlaces(place))
                // console.log( `${foundPlace}`)
                if(!place.geometry){
                    alert(`No details available for ${place.name}`);
                    return
                }

                if(place.geometry.viewport){
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(15);  // Why 17? Because it looks good.
                }

                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

            });
        }
        this.props.onMapLoad(map)
    }

    componentDidMount(){
        this.loadMap();
    }

    loadMap(){
        if (window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD1Q2pMfJCzaG5GcvdrXWf426CaAhDzSks&libraries=places`;
            
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);

            s.addEventListener('load', e => {
                this.onScriptLoad();
            })
        }
        else {
            this.onScriptLoad()
        }
    }

    render(){
        return(
            <div id={this.props.id} style={{ width: "100%", minHeight: 500, overflow: "auto" }}>
                Loading map...
            </div>
        )
    }
}


GoogleMap.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    options: PropTypes.object,
    onMapLoad: PropTypes.func,
    // showFound: PropTypes.func, 
};

const mapStateToProps = function (state) {
    return {state};
}

function mapDispatchToProps (dispatch) {
    console.log('dispatch', dispatch)
    return {
      showFound() {
        dispatch(fetchPlaces());
      }
    }
};

// export default GoogleMap;

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);