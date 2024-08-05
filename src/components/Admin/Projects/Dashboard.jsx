import { useEffect, useState } from "react";

import { GridContainer, BlockWrapper } from "@tackboon/react-grid-rearrange";

import GalleryItem from "./GalleryItem";
import ActionBar from "./ActionBar";
import EditProjectModal from "./EditProjectModal";

import authFetch from "../../../utils/authFetch";
import { useAuthContext } from "../../contexts/AuthContext";

import { errorModal } from "../../../utils/errorModal";
import { getFirstPhoto } from "../../../utils/photosUtils";


const Dashboard = () => {
  const { token } = useAuthContext();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const { status, data } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/projects/`,
        "GET",
        token,
      );
      if (status === 200) {
        setProjects(data);
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
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const callback = async ({ isDragging, order, lastMovingIndex, isClick }) => {
    if (lastMovingIndex !== -1 && !isDragging && !isClick) {
      const positions = order.map((o, index) => ({
        id: projects[o]._id,
        name: projects[o].name,
        position: index
      }));

      try {
        await authFetch(
          `${process.env.REACT_APP_SERVER_URL}/projects/update-position`,
          "POST",
          token,
          { positions }
        );  
      } catch(e) {
        console.error("Error", e);
      }
    }
  };

  return (
    <section
      className="flex flex-col min-h-screen px-4 py-16 sm:max-w-full"
      id="project-info"
    >
      <div className="flex flex-col mb-8">
        <h1 className="text-left text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Administrar proyectos
        </h1>
      </div>
      <ActionBar fetchProjects={fetchProjects} />
      <GridContainer
        totalItem={(projects.length)}
        itemHeight={200}
        itemWidth={300}
        colGap={30}
        rowGap={30}
        cb={callback}
        disableInitialAnimation={true}
      >
        {(styles) =>
          styles.map((style, i) => {
            const item = projects[i];
            const { _id = '', name = '', photos = [], favorite = false } = item;
            const firstPhoto = getFirstPhoto(photos);
            const imgUrl = firstPhoto
              ? `${process.env.REACT_APP_SERVER_URL}/${firstPhoto?.url}`
              : "";

            return (
              <BlockWrapper index={i} animationStyle={style} key={_id}>
                <GalleryItem
                  id={_id}
                  title={name}
                  imgUrl={imgUrl}
                  key={_id}
                  fetchProjects={fetchProjects}
                  setSelectedProjectId={setSelectedProjectId}
                  favorite={favorite}
                  openEditModal={() => setEditModalOpen(true)}
                />
              </BlockWrapper>
            );
          })
        }
      </GridContainer>
      {editModalOpen && (
        <EditProjectModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          id={selectedProjectId}
          fetchProjects={fetchProjects}
        />
      )}
    </section>
  );
};

export default Dashboard;
