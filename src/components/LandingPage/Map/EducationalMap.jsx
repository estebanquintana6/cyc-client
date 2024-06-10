import React from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF as Marker,
  GoogleMapProps,
  
} from "@react-google-maps/api";

import useIsMobile from "../../../hooks/useIsMobile";

const mapContainerStyle = {
  width: "100vw",
  height: "80vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const CustomMarker = ({ location, url }) => {
  return (
    <Marker
      position={location}
      icon={{
        url: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circleClip">
            <circle cx="100" cy="100" r="100" />
          </clipPath>
        </defs>
        <image href="${url}" x="0" y="0" width="200" height="200" clip-path="url(#circleClip)" />
        <circle cx="100" cy="100" r="100" fill="none" stroke="black" />
      </svg>`,
      size: [40, 40]
      }}
    />
  );
};

const EducationalMap = () => {

  const isMobile = useIsMobile();

  return (
    <section
      className="flex w-full min-h-screen xs:py-14 lg:py-32"
      id="proyectos"
    >
      <div className="mx-auto">
        <div className="flex flex-col mb-6 xs:px-4 sm:px-8 md:px-16 lg:px-32">
          <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Nuestra formación
          </h1>
        </div>

        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={isMobile ? 2 : 3}
            center={center}
            options={{
              mapTypeId: 'satellite',
            }}
          >
            <Marker position={center} icon={{ url: '/img/pin.png' }}/>
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
};

export default EducationalMap;
