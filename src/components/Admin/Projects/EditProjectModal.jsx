import { useEffect, useState } from "react";
import {
  Button,
  FileInput,
  Modal,
  Select,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";

import { useAuthContext } from "../../contexts/AuthContext";
import authFetch, { fetch } from "../../../utils/authFetch";
import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const EditProjectModal = ({ id, onClose, fetchProjects }) => {
  const { token } = useAuthContext();
  const [project, setProject] = useState({});
  const [toDeletePhotos, setToDeletePhotos] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/projects/get/${id}`,
          "GET",
        );
        if (status === 200) {
          setProject(data);
        }
      } catch {
        setProject({});
      }
    };
    fetchProject();
  }, [id]);

  const onSave = async () => {
    let formData = new FormData();

    formData.append("id", id);
    formData.append("name", project.name);
    formData.append("designer", project.designer);
    formData.append("projectType", project.projectType);
    formData.append("description", project.description);
    formData.append("surface", project.surface);
    formData.append("toDeletePhotos", JSON.stringify(toDeletePhotos));

    try {
      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/projects/update`,
        "POST",
        token,
        formData,
        "multipart/form-data",
      );

      if (status === 200) {
        successModal("Projecto editado");
        await fetchProjects();
      }
      onClose();
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
    }
  };

  const { photos } = project;

  return (
    <Modal show={true} onClose={onClose}>
      <Modal.Header>Editar proyecto: {project?.name}</Modal.Header>
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
              value={project?.name}
              onChange={(e) => {
                setProject({
                  ...project,
                  name: e.target.value,
                });
              }}
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
              value={project?.designer}
              onChange={(e) => {
                setProject({
                  ...project,
                  designer: e.target.value,
                });
              }}
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
              value={project?.projectType}
              onChange={(e) => {
                setProject({
                  ...project,
                  projectType: e.target.value,
                });
              }}
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
            value={project?.surface}
            onChange={(e) => {
              setProject({
                ...project,
                surface: e.target.value,
              });
            }}
            required
          />
          <div className="block">
            <Label htmlFor="comment" value="Descripción" />
          </div>
          <Textarea
            id="description"
            placeholder="Descripción..."
            required
            value={project?.description}
            onChange={(e) => {
              setProject({
                ...project,
                description: e.target.value,
              });
            }}
            rows={4}
          />
          <div className="mb-2 block">
            <Label htmlFor="file" value="Fotos" />
          </div>
          <FileInput
            multiple={true}
            id="photos"
            helperText="Puedes seleccionar varias fotos a la vez"
          />
          <div className="mb-2 block"></div>
          {(photos || [])
            .filter(({ _id }) => !toDeletePhotos.includes(_id))
            .map((photo) => {
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
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button onClick={() => onSave()}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
