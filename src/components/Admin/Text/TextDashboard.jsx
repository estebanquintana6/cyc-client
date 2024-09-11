import { useState, useEffect } from "react";

import { getSiteTexts } from "../../../utils/fetchTexts";
import { useAuthContext } from "../../contexts/AuthContext";
import authFetch from "../../../utils/authFetch";

const TextDashboard = () => {
  const { token } = useAuthContext();
  const [texts, setTexts] = useState({
    landing_project_title: "",
    landing_map_title: "",
    landing_blog_title: "",
    landing_contact_title: "",
    landing_about_section: "",
    landing_project_section: "",
    landing_map_section: "",
    landing_blog_section: "",
    landing_contact_section: "",
    dashboard_projects: "",
    dashboard_blog: "",
  });

  useEffect(() => {
    const getTexts = async () => {
      const data = await getSiteTexts();
      setTexts(data);
    };
    try {
      getTexts();
    } catch {
      console.error("Error al obtener el archivo de textos");
    }
  }, []);

  const updateTexts = async () => {
    const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/texts/update`,
        "POST",
        token,
        { texts }
      );

    console.log(status);
  };

  return (
    <section className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full">
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Actualizar textos
        </h1>
      </div>
      <div>
        <form className="w-full grid grid-cols-3">
          <div className="col-span-1">
            <div className="my-8">
              <h2 className="text-4xl font-bold">Títulos</h2>
            </div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Proyectos
              </label>
              <input
                type="text"
                id="base-input"
                value={texts.landing_project_title}
                onChange={(e) => {
                    setTexts({
                        ...texts,
                        landing_project_title: e.target.value,
                    })
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mapa
              </label>
              <input
                type="text"
                id="small-input"
                value={texts.landing_map_title}
                onChange={(e) => {
                    setTexts({
                        ...texts,
                        landing_map_title: e.target.value,
                    })
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Blog
              </label>
              <input
                type="text"
                id="small-input"
                value={texts.landing_blog_title}
                onChange={(e) => {
                    setTexts({
                        ...texts,
                        landing_blog_title: e.target.value,
                    })
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        </form>
        <div className="flex pt-6">
          <button
            className="bg-primary-100 hover:bg-primary-150 text-white font-bold py-2 px-4 rounded flex mx-auto"
            onClick={updateTexts}
          >
            <p className="text-lg">Guardar</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextDashboard;
