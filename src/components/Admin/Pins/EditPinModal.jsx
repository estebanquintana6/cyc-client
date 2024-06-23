import { useRef, useState, useEffect } from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Textarea,
} from "flowbite-react";
import {
  GoogleMap,
  MarkerF as Marker,
  useLoadScript
} from "@react-google-maps/api";

import authFetch, { fetch } from "../../../utils/authFetch";
import { useAuthContext } from "../../contexts/AuthContext";

import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const libraries = ["places"]; 

const EditPinModal = ({ id, onClose, fetchPins }) => {
  const { token } = useAuthContext();
  const filesRef = useRef();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    loading: "async",
  });

  const [pin, setPin] = useState({});
  const [toDeletePhotos, setToDeletePhotos] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const { title, link, lat = 0, lng = 0, photos } = pin;

  useEffect(() => {
    const fetchPin = async () => {
      if (!id) return;
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/pins/get/${id}`,
          "GET",
        );
        console.log(status, data);
        if (status === 200) {
          setPin(data);
        }
      } catch (err) {
        console.log(err);
        setPin({});
      }
    };
    fetchPin();
  }, [id]);

  const onSave = async () => {
    try {
      let formData = new FormData();
      let files = filesRef.current?.files;

      for (const file of files) {
        formData.append("newPhotos", file);
      }

      formData.append("id", id);
      formData.append("title", title);
      formData.append("link", link);
      formData.append("lat", lat);
      formData.append("lng", lng);
      formData.append("imageDescriptions", JSON.stringify(newImages));
      formData.append(
        "photos",
        JSON.stringify(
          pin.photos.filter(({ _id }) => !toDeletePhotos.includes(_id)),
        ),
      );
      formData.append("toDeletePhotos", JSON.stringify(toDeletePhotos));

      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/pins/update`,
        "POST",
        token,
        formData,
        "multipart/form-data",
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

  const onImagesChange = () => {
    let files = filesRef.current?.files;

    if (files) {
      const urls = [];

      for (const f of files) {
        urls.push({
          url: URL.createObjectURL(f),
          originalName: f.name,
          description: "",
        });
      }

      setNewImages(urls);
    }
  };

  const onNewImageDescriptionHandle = (index, description) => {
    let newArr = [...newImages];
    newArr[index] = {
      ...newArr[index],
      description,
    };

    setNewImages(newArr);
  };

  const handleImageDelete = (originalName) => {
    let files = filesRef.current?.files;
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name !== originalName) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    filesRef.current.files = dt.files;

    let newArr = [...newImages].filter(
      ({ originalName: name }) => name !== originalName,
    );

    setNewImages(newArr);
  };

  const onImageDescriptionHandle = (index, description) => {
    let newArr = [...photos];
    newArr[index] = {
      ...newArr[index],
      description,
    };

    setPin({
      ...pin,
      photos: newArr,
    });
  };

  const onMapClick = (e) => {
    setPin({
      ...pin,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <>
      <Modal show={true} onClose={onClose}>
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
                onChange={(event) =>
                  setPin({ ...pin, title: event.target.value })
                }
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
              onChange={(event) => setPin({ ...pin, link: event.target.value })}
              required
            />
            <div className="mb-2 block">
              <Label htmlFor="file" value="Fotos" />
            </div>
            <FileInput
              multiple={true}
              id="photos"
              ref={filesRef}
              onChange={onImagesChange}
              helperText="Puedes seleccionar varias fotos a la vez"
            />

            <div className="mb-2 block">
              {(photos || [])
                .filter(({ _id }) => !toDeletePhotos.includes(_id))
                .map((photo, index) => {
                  const { _id, url, description } = photo;
                  return (
                    <div className="grid grid-cols-2 gap-4 my-5 ">
                      <img
                        alt="preview image"
                        className="w-full"
                        src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                      />
                      <div className="w-full flex flex-col">
                        <Textarea
                          id={`desc-${_id}`}
                          rows={4}
                          value={description}
                          onChange={(e) =>
                            onImageDescriptionHandle(index, e.target.value)
                          }
                          placeholder="Descripción de foto"
                          required={false}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setToDeletePhotos([...toDeletePhotos, _id])
                          }
                          className="w-9 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mt-2 mx-auto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              {newImages.map(({ url, originalName, description }, index) => (
                <div className="grid grid-cols-2 gap-4 my-5 ">
                  <img alt="preview image" className="w-full" src={url} />
                  <div className="w-full flex flex-col">
                    <Textarea
                      id={`desc-${originalName}`}
                      rows={4}
                      value={description}
                      onChange={(e) =>
                        onNewImageDescriptionHandle(index, e.target.value)
                      }
                      placeholder="Descripción de foto"
                      required={false}
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(originalName)}
                      className="w-9 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mt-2 mx-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {isLoaded && (
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
            )}
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

export default EditPinModal;
