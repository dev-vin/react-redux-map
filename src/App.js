import React, { Component } from 'react';
import './App.css';
import MapContainer from './containers/MapContainer.js'

class App extends Component {
  render() {

    return (
      <div className="App">
        <div>
            <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
