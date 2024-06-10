import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF as Marker,
} from "@react-google-maps/api";

import useIsMobile from "../../../hooks/useIsMobile";

import { fetch } from "../../../utils/authFetch";

const mapContainerStyle = {
  width: "100vw",
  height: "80vh",
};

const center = {
  lat: 0,
  lng: 0,
};

const EducationalMap = () => {
  const isMobile = useIsMobile();
  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    try {
      const { status, data } = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/pins`,
        "GET",
      );

      if (status === 200) {
        setPins(data);
      }
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      console.err(error);
    }
  };

  useEffect(() => {
    fetchPins();
  }, [])

  return (
    <section
      className="flex w-full min-h-screen xs:py-14 lg:py-32"
      id="proyectos"
    >
      <div className="mx-auto">
        <div className="flex flex-col mb-6 xs:px-4 sm:px-8 md:px-16 lg:px-32">
          <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Nuestra formación internacional
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
              draggableCursor: 'arrow',
              draggingCursor: 'arrow',
            }}
          >
            {pins.map(({ lat, lng}) => {
              return (
                <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lng) }} icon={{ url: '/img/pin.png' }}/>
              );
            })}
            
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
};

export default EducationalMap;
