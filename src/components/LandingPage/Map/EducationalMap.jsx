import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF as Marker,
} from "@react-google-maps/api";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

import MapModal from "./MapModal";

import { fetch } from "../../../utils/authFetch";

const mapContainerStyle = {
  width: "100vw",
  height: "80vh",
};

const center = {
  lat: 0,
  lng: 0,
};

const PinModal = withReactContent(Swal)

const EducationalMap = () => {
  const [pins, setPins] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    loading: "async",
  });

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
  }, []);

  const onPinClick = (pin) => {
    PinModal.fire(<MapModal pin={pin} />);
  };

  return (
    <section
      className="flex w-full min-h-screen xs:py-14 lg:py-32"
      id="proyectos"
    >
      <div className="mx-auto">
        <div className="flex flex-col mb-6 xs:px-4 sm:px-8 md:px-16 lg:px-32">
          <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Experiencia Internacional
          </h1>
        </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={2}
            center={center}
            options={{
              mapTypeId: "satellite",
              draggableCursor: "arrow",
              draggingCursor: "arrow",
            }}
          >
            {pins.map((pin) => {
              return (
                <Marker
                  key={pin._id}
                  onClick={() => onPinClick(pin)}
                  position={{
                    lat: parseFloat(pin.lat),
                    lng: parseFloat(pin.lng),
                  }}
                  icon={{ url: "/img/pin.png" }}
                />
              );
            })}
          </GoogleMap>
        )}
      </div>
    </section>
  );
};

export default EducationalMap;
