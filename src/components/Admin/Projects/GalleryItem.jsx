import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { errorModal } from "../../../utils/errorModal";
import authFetch from "../../../utils/authFetch";

import { useAuthContext } from "../../contexts/AuthContext";

const GalleryItem = ({ id, title, imgUrl, fetchProjects }) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const handleSeeButton = (id) => {
    navigate(`/proyectos/${id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: `¿Estás segur@ de eliminar el proyecto ${title}?`,
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { status } = await authFetch(
            `${process.env.REACT_APP_SERVER_URL}/projects/delete`,
            "DELETE",
            token,
            { id },
          );

          if (status === 200) {
            Swal.fire({
              title: "Èxito!",
              text: `El proyecto ${title} se ha eliminado`,
              icon: "success",
            });
            await fetchProjects();
          }
        } catch (err) {
          const {
            response: {
              data: { error },
            },
          } = err;
          errorModal(error);
        }
      }
    });
  };

  return (
    <div className="relative flex">
      <Link to={`/proyectos/${id}`}>
        <img className="h-full max-w-full rounded-lg" src={imgUrl} alt="" />
        <div className="absolute rounded-lg top-0 flex w-full h-full bg-slate-600 bg-opacity-50">
          <span className="m-auto text-center inline-block xs:text-md xl:text-2xl text-white sm:text-3xl">
            {title}
          </span>
        </div>
      </Link>
      <div className="absolute z-1 t-0 bottom-0 flex w-full h-full">
        <Button
          className="ml-auto mr-2 w-12 h-12 mt-2"
          onClick={() => handleSeeButton(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokewidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Button>
        <Button className="mx-2 w-12 h-12 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </Button>
        <Button
          className="mr-auto ml-2 w-12 h-12 mt-2"
          color="failure"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default GalleryItem;
