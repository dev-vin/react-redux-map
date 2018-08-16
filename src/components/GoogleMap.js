import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

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
            map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(card)
            // console.log(window.google.maps.places)
            var autocompleteservice = new window.google.maps.places.Autocomplete(input);
            // console.log(autocompleteservice)
            autocompleteservice.bindTo('bounds', map);

            autocompleteservice.setFields(['address_components', 'geometry', 'icon', 'name']);

            var marker = new window.google.maps.Marker({
                map: map,
                anchorPoint: new window.google.maps.Point(0, -29)
              });
      

            autocompleteservice.addListener('place_changed', function(){
                let place = autocompleteservice.getPlace();
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
            <div id={this.props.id} style={{ width: "100%", height: 500 }}>
                Loading map...
            </div>
        )
    }
}

GoogleMap.propTypes = {
    // google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    options: PropTypes.object,
    onMapLoad: PropTypes.func,
    // autoCompleteInput: PropTypes.object,
};

export default GoogleMap;