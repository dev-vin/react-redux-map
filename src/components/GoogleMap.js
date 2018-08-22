import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showFoundPlace } from '../actions/actionTypes';

export class GoogleMap extends React.Component {

    state = {
        googleMap: {},
        marker: {}
    }

    renderPlaceFound=()=>{
        let map = this.state.googleMap;
        let marker = this.state.marker;
        let place = this.props.placeFound.placeFound;

        if(!place.geometry){
            alert(`No details available for ${place.name}`);
            return
        }

        if(place.geometry.viewport){
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    }

    onScriptLoad=()=>{
        const map = new window.google.maps.Map(
            document.getElementById(this.props.id),
                this.props.options);
        if(this.props.hasAutoComplete) {
            let marker = new window.google.maps.Marker({
                map: map,
                anchorPoint: new window.google.maps.Point(0, -29)
            });
            this.setState({ googleMap: map, marker: marker}, ()=>this.renderAutoComplete());
        }
        this.props.onMapLoad(map)
    }

    renderAutoComplete=()=>{
        var card = document.getElementById('pac-card');
        var input = document.getElementById('search');
        let map = this.state.googleMap;
        // positioning of search bar
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card);

        // Autocomplete API 
        var autocompleteservice = new window.google.maps.places.Autocomplete(input);
        autocompleteservice.bindTo('bounds', map);
        autocompleteservice.setFields(['address_components', 'geometry', 'icon', 'name']);

        autocompleteservice.addListener('place_changed', function(){
            let place = autocompleteservice.getPlace();
            this.props.showFound(place);
            this.renderPlaceFound();
        }.bind(this));
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
            <div id={this.props.id} style={{ width: "100%", minHeight: 700, overflow: "auto" }}>
                Loading map...
            </div>
        )
    }
}


GoogleMap.propTypes = {
    // zoom: PropTypes.number,
    // initialCenter: PropTypes.object,
    // options: PropTypes.object,
    onMapLoad: PropTypes.func,
    showFound: PropTypes.func, 
    placeFound: PropTypes.object, 
};

const mapStateToProps = function (state) {
    return { placeFound: state.placesReducer };
}

function mapDispatchToProps (dispatch) {
    return {
      showFound: payload => dispatch(showFoundPlace(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);