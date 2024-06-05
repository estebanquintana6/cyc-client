import { useRef, useState } from "react";

import {
  Button,
  FileInput,
  Modal,
  Select,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";

import authFetch from "../../../utils/authFetch";
import successModal from "../../../utils/sucessModal";
import { errorModal } from "../../../utils/errorModal";

import { useAuthContext } from "../../contexts/AuthContext";
import useClickOutside from "../../../hooks/useClickOutside";

const NewProjectModal = ({ isOpen, onClose, fetchProjects }) => {
  const { token } = useAuthContext();
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

  const [name, setName] = useState();
  const [designer, setDesigner] = useState();
  const [projectType, setProjectType] = useState();
  const [surface, setSurface] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);

  const filesRef = useRef();

  const onSave = async () => {
    let formData = new FormData();

    let files = filesRef.current?.files;

    for (const file of files) {
      formData.append("photos", file);
    }

    formData.append("name", name);
    formData.append("designer", designer);
    formData.append("projectType", projectType);
    formData.append("description", description);
    formData.append("surface", surface);
    formData.append("imageDescriptions", JSON.stringify(images));

    try {
      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/projects/register`,
        "POST",
        token,
        formData,
        "multipart/form-data",
      );

      if (status === 200) {
        successModal("Nuevo proyecto creado");
        await fetchProjects();
      }
    } catch (err) {
      const { response: { data: { error } } } = err;
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

      setImages(urls);
    }
  };

  const onImageDescriptionHandle = (index, description) => {
    let newArr = [...images];
    newArr[index] = {
      ...newArr[index],
      description,
    };

    setImages(newArr);
  };

  const handleImageDelete = (originalName) => {
    let files = filesRef.current?.files;
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name !== originalName) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    filesRef.current.files = dt.files;

    let newArr = [...images].filter(
      ({ originalName: name }) => name !== originalName,
    );

    setImages(newArr);
  };

  const isValidForm = 
    name?.length > 0 &&
    description?.length > 0 &&
    designer?.length > 0 &&
    surface?.length > 0 &&
    projectType?.length > 0 &&
    images?.length > 0;

  return (
    <>
      <Modal show={isOpen} onClose={onClose} ref={modalRef}>
        <Modal.Header>Crear nuevo proyecto</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre del proyecto" />
              </div>
              <TextInput
                className="w-full"
                id="name"
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="designer" value="Diseñador" />
              </div>
              <TextInput
                className="w-full"
                id="designer"
                type="text"
                placeholder="Diseñador"
                value={designer}
                onChange={(e) => setDesigner(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Tipo de proyecto" />
              </div>
              <Select
                id="type"
                required
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option></option>
                <option value={"Ciudad"}>Ciudad</option>
                <option value={"Desarrollo"}>Desarrollo</option>
              </Select>
            </div>
            <div className="mb-2 block">
              <Label htmlFor="surface" value="Superficie" />
            </div>
            <TextInput
              className="w-full"
              id="surface"
              type="text"
              placeholder="Ejemplo: 2 hectáreas"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              required
            />
            <div className="block">
              <Label htmlFor="comment" value="Descripción" />
            </div>
            <Textarea
              id="description"
              placeholder="Descripción..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
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
              {images.map(({ url, originalName, description }, index) => (
                <div className="grid grid-cols-2 gap-4 my-5 ">
                  <img alt="preview image" className="w-full" src={url} />
                  <div className="w-full flex flex-col">
                    <Textarea
                      id={`desc-${originalName}`}
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
                      className="w-9 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mt-2 mx-auto"
                      onClick={() => handleImageDelete(originalName)}
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
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button disabled={!isValidForm} onClick={() => onSave()}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewProjectModal;
