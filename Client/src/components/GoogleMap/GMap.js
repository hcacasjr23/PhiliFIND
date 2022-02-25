import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import mapStyles from './mapStyles.js';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100%',
    height: '480px',
};
const center = {
    // CHANGE: make this to current location
    lat: 14.625483,
    lng: 121.124481,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

function GMap() {
    const {isLoaded, loadError} = useLoadScript({
        //googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        googleMapsApiKey: "AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI",
        libraries,
    });

    if(loadError) return 'Error Loading Maps';
    if(!isLoaded) return 'Loading Maps';

    return (
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
            >

            </GoogleMap>
        </div>
    );
} 

export default GMap;