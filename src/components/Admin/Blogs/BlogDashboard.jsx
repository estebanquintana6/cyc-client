import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import Swal from "sweetalert2";

import authFetch, { fetch } from "../../../utils/authFetch";
import { errorModal } from "../../../utils/errorModal";
import { useAuthContext } from "../../contexts/AuthContext";
import BlogActionBar from "./BlogActionBar";
import EditBlogEntryModal from "./EditBlogEntryModal";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const BlogDashboard = () => {
  const { token } = useAuthContext();
  const [blogEntries, setBlogEntries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(false);

  const fetchBlogEntries = async () => {
    try {
      const { status, data } = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/blogs`,
        "GET",
      );
      if (status === 200) {
        setBlogEntries(data);
      }
    } catch {
      console.error(
        "Error en el servidor al hacer fetch de las entradas del blog",
      );
    }
  };

  const onEditModalClose = async () => {
    setIsEditModalOpen(false);
  };

  const onEntryEdit = (id) => {
    setIsEditModalOpen(true);
    setSelectedEntry(id);
  };

  useEffect(() => {
    fetchBlogEntries();
  }, []);

  const deleteBlogHandler = (id, title) => {
    Swal.fire({
      title: `¿Estás segur@ de eliminar la entrada ${title}?`,
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
            `${process.env.REACT_APP_SERVER_URL}/blogs/delete/${id}`,
            "DELETE",
            token,
          );

          if (status === 200) {
            Swal.fire({
              title: "Èxito!",
              text: `La entrada ${title} se ha eliminado`,
              icon: "success",
            });
            await fetchBlogEntries();
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
    <section className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Entradas de blog
        </h1>
      </div>
      <BlogActionBar fetchBlogEntries={fetchBlogEntries} />
      <div className="overflow-x-scroll max-w-full">
        <Table>
          <Table.Head>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell className="max-w-48">Autor</Table.HeadCell>
            <Table.HeadCell>Fecha de creación</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {blogEntries.map((entry) => {
              const { _id, title, author, created_at } = entry;
              return (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={_id}
                >
                  <Table.Cell>{title}</Table.Cell>
                  <Table.Cell className="max-w-48 overflow-clip">
                    {author}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(created_at).toLocaleDateString(
                      "es-MX",
                      dateOptions,
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium hover:underline text-cyan-500"
                      onClick={() => onEntryEdit(_id)}
                    >
                      Editar
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-primary-150 hover:underline"
                      onClick={() => deleteBlogHandler(_id, title)}
                    >
                      Eliminar
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      {isEditModalOpen && (
        <EditBlogEntryModal
          id={selectedEntry}
          onClose={onEditModalClose}
          fetchBlogEntries={fetchBlogEntries}
        />
      )}
    </section>
  );
};

export default BlogDashboard;
