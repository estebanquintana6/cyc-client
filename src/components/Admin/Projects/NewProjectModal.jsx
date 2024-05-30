import { useRef } from "react";

import {
  Button,
  FileInput,
  Modal,
  Select,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";

import useClickOutside from "../../../hooks/useClickOutside";

const NewProjectModal = ({ isOpen, onSave, onClose }) => {
  const modalRef = useRef();
  useClickOutside(modalRef, onClose);

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
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Tipo de proyecto" />
              </div>
              <Select id="type" required>
                <option></option>
                <option>Ciudad</option>
                <option>Desarrollo</option>
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
              required
            />
            <div className="block">
              <Label htmlFor="comment" value="Descripción" />
            </div>
            <Textarea
              id="description"
              placeholder="Descripción..."
              required
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
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button onClick={() => onSave()}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewProjectModal;
