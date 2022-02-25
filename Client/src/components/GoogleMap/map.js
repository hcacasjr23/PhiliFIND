import React, {Component} from 'react';

// Styling Dependencies
import {TextField} from '@mui/material'

// Google Map Dependencies
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Geocode from 'react-geocode';
// import AutoComplete from 'react-google-autocomplete';

Geocode.setApiKey("AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI")

class map extends Component {

    // changable variables 
    state = {
        address:this.props.address,
        zoom: 15,
        height: 500,
        zip: this.props.address,
        mapPos: {
            lat: 0,
            lng: 0,
        },
        markerPos: {
            lat: 0,
            lng: 0
        },
        text: ''
    }

    // get current location

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPos: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPos: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }

                }, () => {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        response => {
                            const address = response.results[0].formatted_address,
                                addressArray = response.results[0].address_components,
                                zip = this.getCode(addressArray);

                            this.setState({
                                address: (address) ? address : "",
                                zip: (zip) ? zip : "",
                            })

                        }
                    )
                })
            })
        }
    }

    


    // get Zip Code for the location
    getCode = (addressArray) => {
        let zip = '';
        for (let index=0; index < addressArray.length; index++){
            if(addressArray[index].types[0] && 'postal_code' === addressArray[index].types[0]){
                zip = addressArray[index].long_name;
                return zip;
            }
        }
    }

    onInfoWindowClose = (event) => { };

    // Update the longitude and latitude of the marker
    handleDragMarker = (event) => {
        let newLat = event.latLng.lat();
        let newLng = event.latLng.lng();
        // window.location.reload();

        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    zip = this.getCode(addressArray);
                
                this.setState({
                    address: (address) ? address : "",
                    zip: (zip) ? zip : "",
                    markerPos: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPos: {
                        lat: newLat,
                        lng: newLng
                    }
                })
            })
    }  


    render() {

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: this.state.mapPos.lat, lng: this.state.mapPos.lng }}
            >

                {/* Map Marker */}
                <Marker
                    draggable={true}
                    onDrag={this.handleDragMarker}
                    position={{ lat: this.state.markerPos.lat, lng: this.state.markerPos.lng }}
                >

                    {/* mini tooltip for marker */}
                    <InfoWindow

                        onClose={this.onInfoWindowClose}

                        position={{ lat: (this.state.markerPos.lat + 0.0018), lng: this.state.markerPos.lng }}
                    >
                        <div>
                            <span style={{padding:0,margin:0}}>Address: {this.state.address}</span>
                        </div>
                    </InfoWindow>

                </Marker>
            </GoogleMap>
        ));

        return (
            <div>
                {/* google maps API*/}
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: this.state.height }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
        
    }


}

export default map;
