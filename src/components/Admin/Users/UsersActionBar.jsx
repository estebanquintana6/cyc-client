import { Fragment, useState } from "react";
import NewUserModal from "./NewUserModal";

const UsersActionBar = ({ fetchUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <div className="flex p-4 mb-4 sm:mb-0">
        <button
          className="bg-primary-100 hover:bg-primary-150 text-white font-bold py-2 px-4 rounded flex xs:mx-auto md:mr-0 md:ml-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="text-lg">Crear nuevo</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 my-auto ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <NewUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fetchUsers={fetchUsers}/>
      </div>
    </Fragment>
  );
};

export default UsersActionBar;
