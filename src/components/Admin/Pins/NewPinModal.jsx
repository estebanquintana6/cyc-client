import { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import {
  GoogleMap,
  LoadScript,
  MarkerF as Marker,
  GoogleMapProps,
} from "@react-google-maps/api";

import authFetch from "../../../utils/authFetch";
import { useAuthContext } from "../../contexts/AuthContext";

import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const NewPinModal = ({ isOpen, onClose, fetchPins }) => {
  const { token } = useAuthContext();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const onSave = async () => {
    try {
      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/pins/create`,
        "POST",
        token,
        {
          title,
          link,
          lat,
          lng
        },
      );
      if (status === 200) {
        successModal("El administrador ha sido creado");
        await fetchPins();
        onClose();
      }
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
    }
  };

  const onMapClick = (e) => {
    setLat(e.latLng.lat());
    setLng(e.latLng.lng());
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Crear nuevo pin</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={onSave}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Título" />
              </div>
              <TextInput
                className="w-full"
                id="title"
                type="text"
                placeholder="Titulo"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Link" />
            </div>
            <TextInput
              className="w-full"
              id="link"
              type="text"
              placeholder="Link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              required
            />

            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={3}
                center={{ lat, lng }}
                onClick={onMapClick}
                options={{
                  mapTypeId: "satellite",
                }}
              >
                <Marker position={{ lat, lng }} />
              </GoogleMap>
            </LoadScript>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button type="submit" onClick={onSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewPinModal;
