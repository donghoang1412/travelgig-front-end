import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const containerStyle = {
    width: '30%',
    height: '30%'
  }
export class GoogleMapView extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    render() {
        return (
            <Map 
                google={this.props.google}
                containerStyle={containerStyle}
            >
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBLYQNo3d0_IMvcX-gw6uF2UrQw8Mh-2q4")
})(GoogleMapView)