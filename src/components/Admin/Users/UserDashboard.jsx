import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import Swal from "sweetalert2";

import authFetch from "../../../utils/authFetch";
import genericErrorModal, { errorModal } from "../../../utils/errorModal";

import { useAuthContext } from "../../contexts/AuthContext";
import UsersActionBar from "./UsersActionBar";

const UserDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const { token } = useAuthContext();

  const fetchUsers = async () => {
    const { status, data } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/users`, 'GET', token);
    if (status === 200) {
        setAdmins(data);
    } else {
        genericErrorModal();
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const deleteHandler = async (username) => {
    Swal.fire({
      title: `¿Estás segur@ de eliminar al usuario ${username}?`,
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { status } = await authFetch(`/users/delete`, "DELETE", token, { username });

          if (status === 200) {
            Swal.fire({
              title: "Èxito!",
              text: `El usuario ${username} se ha eliminado`,
              icon: "success"
            });

            await fetchUsers();
          }
        } catch(err) {
          const { response: { data: { error } } } = err;
          errorModal(error);
        }
      }
    });
  }


  return (
    <section className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Administradores
        </h1>
      </div>
      <UsersActionBar fetchUsers={fetchUsers} />
      <div className="overflow-x-scroll">
        <Table>
          <Table.Head>
            <Table.HeadCell>Usuario</Table.HeadCell>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Fecha de creación</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            { admins.map(({ username, name, created_at, _id }) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{ username }</Table.Cell>
                <Table.Cell>{ name }</Table.Cell>
                <Table.Cell>{ new Date(created_at).toLocaleDateString('es-MX', dateOptions) }</Table.Cell>
                <Table.Cell>
                <button className="font-medium text-primary-150 hover:underline dark:text-cyan-500" onClick={() => deleteHandler(username)}>
                    Eliminar
                </button>
                </Table.Cell>
            </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </section>
  );
};

export default UserDashboard;
