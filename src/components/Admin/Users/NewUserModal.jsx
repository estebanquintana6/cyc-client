import { useEffect, useRef, useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import authFetch from "../../../utils/authFetch";
import useClickOutside from "../../../hooks/useClickOutside";
import { useAuthContext } from "../../contexts/AuthContext";

import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const NewUserModal = ({ isOpen, onClose, fetchUsers }) => {
  const modalRef = useRef();
  const { token } = useAuthContext();

  useClickOutside(modalRef, onClose);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [passwordValidator, setPasswordValidator] = useState(true);
  const [passwordLengthValidator, setPasswordLengthValidator] = useState(true);

  useEffect(() => {
    setPasswordValidator(password2.length < 1 ? true : password === password2);
  }, [password, password2]);

  useEffect(() => {
    setPasswordLengthValidator(
      password.length < 1 ? true : password.length >= 6,
    );
  }, [password]);


  const validForm = (
    passwordValidator &&
    passwordLengthValidator &&
    password.length >= 6 &&
    password2.length >= 6 &&
    name.length > 1 &&
    username.length > 1
  );

  const onSave = async () => {
    if (!validForm) return;
    try {
        const { status } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/users/create`, "POST", token, {
            name,
            username,
            password
        });
        if ( status === 200) {
            successModal('El administrador ha sido creado');
            await fetchUsers();
        };
    } catch(err) {
        const { response: { data: { error } } } = err;
        errorModal(error);
    };
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose} ref={modalRef}>
        <Modal.Header>Crear nuevo administrador</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4" onSubmit={onSave}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre del administrador" />
              </div>
              <TextInput
                className="w-full"
                id="name"
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Usuario" />
            </div>
            <TextInput
              className="w-full"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <div className="block">
              <Label htmlFor="password" value="Contraseña" />
            </div>
            <TextInput
              type="password"
              id="password"
              placeholder="Contraseña"
              required
              value={password}
              color={!passwordLengthValidator ? "failure" : "gray"}
              onChange={(event) => setPassword(event.target.value)}
              rows={4}
              helperText={
                <>
                  {!passwordLengthValidator && (
                    <>
                      <span className="font-medium">
                        Las contraseña debe tener al menos 6 cáracteres!
                      </span>
                    </>
                  )}
                </>
              }
            />

            <div className="block">
              <Label htmlFor="password2" value="Confirmar contraseña" />
            </div>
            <TextInput
              type="password"
              id="password2"
              placeholder="Confirmar ontraseña"
              required
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              rows={4}
              color={!passwordValidator ? "failure" : "gray"}
              helperText={
                <>
                  {!passwordValidator && (
                    <>
                      <span className="font-medium">
                        Las contraseñas no coinciden!
                      </span>
                    </>
                  )}
                </>
              }
            />
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button type="submit" disabled={!passwordValidator || !passwordLengthValidator || !validForm} onClick={onSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewUserModal;
