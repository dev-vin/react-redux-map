import React from 'react';
import ReactDOM, {render} from 'react-dom';
import GoogleMap from '../components/GoogleMap.js';
// import InfoWindow from '../components/InfoWindow.js';
import AutoComplete from '../components/AutoComplete.js';
import { TextField, Card } from '@material-ui/core';

class MapContainer extends React.Component {
    constructor() {
        super();
        // this.createInfoWindow = this.createInfoWindow.bind(this)
      }
    // will need to create a separate component
    // createInfoWindow(e, map){
    //     const iw = new window.google.maps.InfoWindow({
    //         content: '<div id="infoWindow" />',
    //         position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    //     })
    //     iw.addListener('domready', e => {
    //       render(<InfoWindow />, document.getElementById('infoWindow'))
    //     })
    //     iw.open(map)
    // }

    render(){
        return (
            <div>
                <Card id="pac-card">
                    <TextField id="search" label="Search places" type="search" />
                </Card>
                <GoogleMap 
                    id="myMap"
                    options={{
                        center: {lat: 41.0082, lng: 28.9784},
                        zoom: 14 
                    }}
                    onMapLoad={map=>{
                        let marker = new window.google.maps.Marker({
                            position: { lat: 41.0082, lng: 28.9784 },
                            map: map,
                        });
                        // marker.addListener('click', e => {
                        //     this.createInfoWindow(e, map)
                        // })
                    }}
                    hasAutoComplete={true} 
                />
            </div>
        )
    }
}

export default MapContainer;