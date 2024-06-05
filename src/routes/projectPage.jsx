import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Nav from "../components/ProjectPage/Nav/Nav";
import ProjectInfo from "../components/ProjectPage/ProjectInfo/ProjectInfo";

import { useAuthContext } from "../components/contexts/AuthContext";
import authFetch from "../utils/authFetch";
import { errorModal } from "../utils/errorModal";

const ProjectPage = () => {
  const { token } = useAuthContext();
  const { id } = useParams();

  const [project, setProject] = useState({});

  const fetchProject = async () => {
    try {
      const { status, data } = await authFetch(`${process.env.REACT_APP_SERVER_URL}/projects/get/${id}`, "GET", token);

      if (status === 200) setProject(data);

    } catch (err) {
      const { response: { data: { error } } } = err;
      errorModal(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProject();
  }, [id]);

  return (
    <>
      <Nav />
      <ProjectInfo {...project} id={id}/>
    </>
  );
};

export default ProjectPage;
