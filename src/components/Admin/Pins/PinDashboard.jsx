import { useEffect, useState } from "react";
import { Table } from "flowbite-react";

import PinActionBar from "./PinActionBar";

import { fetch } from "../../../utils/authFetch";
import genericErrorModal, { errorModal } from "../../../utils/errorModal";

const dateOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const PinDashboard = () => {
  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    try {
      const { status, data } = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/pins`,
        "GET",
      );

      if (status === 200) {
        setPins(data);
      } else {
        genericErrorModal();
      }
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <section className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Pines
        </h1>
      </div>
      <PinActionBar fetchPins={fetchPins} />
      <div className="overflow-x-scroll">
        <Table>
          <Table.Head>
            <Table.HeadCell>Ubicación</Table.HeadCell>
            <Table.HeadCell>Titulo</Table.HeadCell>
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>Fecha de creación</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {pins.map(({ title, link, lat, lng, created_at }) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{`[${lat} , ${lng}]`}</Table.Cell>
                <Table.Cell>{title}</Table.Cell>
                <Table.Cell>{link}</Table.Cell>
                <Table.Cell>
                  {new Date(created_at).toLocaleDateString(
                    "es-MX",
                    dateOptions,
                  )}
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="font-medium text-primary-150 hover:underline dark:text-cyan-500"
                  >
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

export default PinDashboard;
