import React, { useState, useCallback, useRef, useEffect } from "react";

// Google Maps Dependencies 
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

// Auto Completes Search
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

// MUI Dependencies
import { Button } from '@mui/material'

// Styling
import './GMap.css'
import mapStyles from './mapStyles';

// Geocode to acquire address
import Geocode from 'react-geocode';

// Constants
const apiKey = 'AIzaSyBL5x46MJOCjf0uohywjsG6p2zFNBEkaYI';
const libraries = ["places"];
const mapContainerStyle = {
    height: "480px",
    width: "100%",
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

Geocode.setApiKey(apiKey);

export default function GMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({
        lat: 0,
        lng: 0,
    })
    const [address, setAddress] = useState('');

    // Detects Marker Movement
    const onMarkerMove = useCallback((e) => {
        getAddress(e.latLng.lat(), e.latLng.lng());
        setMarkers([]);
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            },
        ]);
    }, []);

    // Moves Marker
    const moveMarker = useCallback(({ lat, lng }) => {
        setMarkers([]);
        getAddress(lat, lng);
        setMarkers((current) => [
            ...current,
            {
                lat: lat,
                lng: lng,
            },
        ]);
    }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;

        // Sets Center to Current Location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const newLat = position.coords.latitude;
                const newLng = position.coords.longitude;
                setCenter({ lat: newLat, lng: newLng })
            })
        }
    }, []);

    // Pans to Requested Position
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    // Gets Address of Passed in Latitude and Longitude
    const getAddress = (newLat, newLng) => {
        Geocode.fromLatLng(newLat, newLng)
            .then(response => {
                const address = response.results[0].formatted_address;
                setAddress(address);
                console.log(address)
            })
    };

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className="google-map-container">
            <div className="row">
                <div className="column-left">
                    <Search
                        panTo={panTo}
                        markers={markers}
                        moveMarker={moveMarker}
                        getAddress={getAddress}
                    />
                </div>
                <div className="column-right">
                    <Locate
                        panTo={panTo}
                        moveMarker={moveMarker}
                        getAddress={getAddress}
                    />
                </div>
            </div>

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMarkerMove}
                onLoad={onMapLoad}
                clickableIcons={false} // Prevents Pre-placed Icons from being Clickable
            >
                {markers.map((marker) => (
                    <Marker
                        draggable={true}
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onLoad={() => setSelected(marker)}
                        onClick={() => setSelected(marker)}
                        onDragEnd={onMarkerMove}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        options={{
                            pixelOffset: new window.google.maps.Size(0, -30)
                        }}
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            {address}
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div >
    );
}

function Locate({ panTo, moveMarker, getAddress }) {
    return (
        <Button
            id="locate"
            onClick={(e) => {
                e.preventDefault();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const newLat = position.coords.latitude;
                        const newLng = position.coords.longitude;
                        panTo({
                            lat: newLat,
                            lng: newLng,
                        });
                        moveMarker({
                            lat: newLat,
                            lng: newLng,
                        });
                        getAddress(newLat, newLng);
                    },
                    () => null
                );

            }}
            sx={{
                width: {
                    xs: '100%',
                    sm: 180,
                },
                height: 56
            }}
        >
            Find Me
        </Button>
    );
}

function Search({ panTo, markers, moveMarker, getAddress }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => markers.lat, lng: () => markers.lng },
            radius: 100 * 1000,
        },
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            moveMarker({ lat, lng });
            getAddress(lat, lng);
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    const changeValue = (address) => {
        setValue(address);
    }

    return (
        <div>
            <Combobox onSelect={handleSelect} id='Combobox'>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Name of Place/Location"
                />
                <ComboboxPopover id='ComboboxPopover'>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}