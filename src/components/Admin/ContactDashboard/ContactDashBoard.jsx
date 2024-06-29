import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useAuthContext } from "../../contexts/AuthContext";
import authFetch from "../../../utils/authFetch";
import { errorModal } from "../../../utils/errorModal";

const CheckMark = () => (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-slate-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  </div>
);

const TrashIcon = ({ onClick }) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </div>
);

const ToDoIcon = ({ onClick }) => (
  <div onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-slate-500 hover:text-indigo-600 hover:cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);

const ContactDashboard = () => {
  const { token } = useAuthContext();
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const { status, data } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/contact`,
        "GET",
        token,
      );

      if (status === 200) {
        setContacts(data);
      }
    } catch {
      errorModal("Error al obtener los datos del servidor");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: `¿Estás segur@ de eliminar este dato?`,
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await authFetch(
          `${process.env.REACT_APP_SERVER_URL}/contact/delete/${id}`,
          "DELETE",
          token,
        );
        await fetchContacts();
      }
    });
  };

  const handleMarkAsDone = async (id) => {
    await authFetch(
      `${process.env.REACT_APP_SERVER_URL}/contact/attend`,
      "POST",
      token,
      { id },
    );
    await fetchContacts();
  };

  return (
    <div className="h-[80vh]">
      <div className="max-w-lg max-h-full overflow-y-scroll mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-medium">Lista de contactos</h1>
          </div>
        </div>
        <p className="text-slate-500">
          Estos son los visitantes que han dejado sus datos
        </p>

        <div id="tasks" className="my-5">
          {contacts.map(({ _id, email, attended }) => (
            <div
              id={_id}
              className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
            >
              <div className="inline-flex items-center space-x-2">
                {attended ? (
                  <CheckMark />
                ) : (
                  <ToDoIcon onClick={() => handleMarkAsDone(_id)} />
                )}
                <div
                  className={`text-slate-500 ${attended ? "line-through" : ""}`}
                >
                  {email}
                </div>
              </div>
              <TrashIcon onClick={() => handleDelete(_id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDashboard;
