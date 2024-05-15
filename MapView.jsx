import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const binLocation = {
  lat:  9.513138, // latitude of the bin's location
  lng: 76.551712, // longitude of the bin's location
};

const binID = 'B001'; // Replace 'B001' with the actual ID of the bin

const MapView = () => {
  return (
    <div>
      <MapContainer
        style={mapContainerStyle}
        zoom={15} // Adjust zoom level as needed
        center={binLocation} // Use binLocation as the center
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={binLocation}>
          <Popup>
            Bin ID: {binID}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
