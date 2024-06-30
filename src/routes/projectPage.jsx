import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/ProjectPage/Nav/Nav";
import ProjectInfo from "../components/ProjectPage/ProjectInfo/ProjectInfo";

import { fetch } from "../utils/authFetch";
import { errorModal } from "../utils/errorModal";

const ProjectPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});

  const fetchProject = async () => {
    try {
      const { status, data } = await fetch(`${process.env.REACT_APP_SERVER_URL}/projects/get/${id}`, "GET");

      if (status === 200) setProject(data);

    } catch (err) {
      const { response: { data: { error } } } = err;
      errorModal(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProject();
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <Nav />
      <ProjectInfo {...project} id={id}/>
    </>
  );
};

export default ProjectPage;
