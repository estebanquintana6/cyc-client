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

const EditProjectModal = ({ id, isOpen, onClose, fetchProjects }) => {
  const { token } = useAuthContext();
  const [project, setProject] = useState({});

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
        errorModal("Error al acceder a este projecto");
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
      console.log(err);
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
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
        </form>
      </Modal.Body>
      <Modal.Footer className="justify-end">
        <Button onClick={() => onSave()}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
