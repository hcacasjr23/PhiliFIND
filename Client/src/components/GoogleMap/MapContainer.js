import React, { Component } from 'react'

// Google Map Sytling
import mapStyles from './mapStyles.js';

// Google Map Dependencies
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";

import AutoComplete from 'react-google-autocomplete';

// Geocode to acquire address, city, area, state, and ...
import Geocode from 'react-geocode';
Geocode.setApiKey('AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI');

// Constants
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default class MapContainer extends Component {

    state = {
        address: '',
        mapPosition: {
            lat: '',
            lng: '',
        },
        markerPosition: {
            lat: '',
            lng: '',
        },
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const newLat = position.coords.latitude;
                const newLng = position.coords.longitude;

                this.setState({
                    mapPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                    markerPosition: {
                        lat: newLat,
                        lng: newLng,
                    }
                }, () => {
                    Geocode.fromLatLng(newLat, newLng)
                        .then(response => {

                            console.log(response);
                            const address = response.results[0].formatted_address;

                            this.setState({
                                address: { address } ? address : '',
                            });
                        });
                })
            })
        }
    }

    // Handlers
    onMarkerDragEnd = (e) => {
        let newLat = e.latLng.lat();
        let newLng = e.latLng.lng();

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {

                console.log(response);
                const address = response.results[0].formatted_address;

                this.setState({
                    address: { address } ? address : '',
                    mapPosition: {
                        lat: newLat,
                        lng: newLng,
                    },
                    markerPosition: {
                        lat: newLat,
                        lng: newLng,
                    }
                });
            });
    }

    onPlaceSelected = (place) => {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();
        const address = place.formatted_address;

        this.setState({
            address: { address } ? address : '',
            mapPosition: {
                lat: newLat,
                lng: newLng,
            },
            markerPosition: {
                lat: newLat,
                lng: newLng,
            }
        })
    }


    render() {

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                options={options}
            >
                <Marker
                    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                    onDragEnd={this.onMarkerDragEnd}
                    draggable={true}
                >
                    <InfoWindow>
                        <div>
                            InfoWindow Placeholder
                        </div>
                    </InfoWindow>
                </Marker>

                <AutoComplete
                    style={{ width: '100%', height: '40px', marginTop: '1rem' }}
                    onPlaceSelected={this.onPlaceSelected}
                />

            </GoogleMap>
        ));

        return (
            <MapWithAMarker
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `480px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}
