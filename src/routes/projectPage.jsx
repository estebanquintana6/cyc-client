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
      const { status, data } = await authFetch(`http://localhost:4000/projects/get/${id}`, "GET", token);

      if (status === 200) setProject(data);

    } catch (err) {
      const { response: { data: { error } } } = err;
      errorModal(error);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  return (
    <>
      <Nav />
      <ProjectInfo {...project}/>
    </>
  );
};

export default ProjectPage;
