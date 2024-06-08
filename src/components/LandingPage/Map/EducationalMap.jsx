import React, { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


//map api AIzaSyA1HOkiXLains2WaGhQyS1Ub2Tnp141Iic
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const EducationalMap = () => {  
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={{lat: 53.54992, lng: 10.00678}}
      >
        <Marker position={{lat: 53.54992, lng: 10.00678}} />
      </GoogleMap>
    </LoadScript>
  );
};

export default EducationalMap;
