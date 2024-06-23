import { useState, useRef } from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Textarea,
} from "flowbite-react";

import { useAuthContext } from "../../contexts/AuthContext";
import authFetch from "../../../utils/authFetch";
import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const NewBlogEntryModal = ({ isOpen, onClose, fetchBlogEntries }) => {
  const { token } = useAuthContext();

  const [blogEntry, setBlogEntry] = useState({
    title: "",
    subtitle: "",
    author: "",
    text: "",
    photoDescription: "",
  });

  const [photo, setPhoto] = useState();

  const photoRef = useRef();

  const onImageChange = () => {
    let file = photoRef.current?.files[0];
    if (file) {
      setPhoto({
        url: URL.createObjectURL(file),
        originalName: file.name,
      });
    } else {
      setPhoto(undefined);
    }
  };

  const onSave = async () => {
    try {
      let formData = new FormData();

      let file = photoRef.current?.files[0];
      if (file) formData.append("photo", file);

      formData.append("title", blogEntry.title);
      formData.append("subtitle", blogEntry.subtitle);
      formData.append("author", blogEntry.author);
      formData.append("text", blogEntry.text);
      formData.append("photoDescription", blogEntry.photoDescription);

      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/blogs/create`,
        "POST",
        token,
        formData,
        "multipart/form-data",
      );

      if (status === 200) {
        successModal("La entrada de blog ha sido creada");
        await fetchBlogEntries();
        onClose();
      }
    } catch(err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
    }
  };

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header>Crear nueva entrada de blog</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Foto" />
              <FileInput
                multiple={false}
                id="photo"
                ref={photoRef}
                onChange={onImageChange}
                helperText="Puedes seleccionar una foto"
              />
            </div>
            <div className="mb-2 block">
              {photo && (
                <>
                  <img alt="preview" className="w-full" src={photo.url} />
                  <div className="mt-2 block">
                    <Label htmlFor="title" value="Descripción de foto" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="photo-description"
                    type="text"
                    placeholder="Descripción de foto"
                    value={blogEntry.photoDescription}
                    onChange={(e) =>
                      setBlogEntry({ ...blogEntry, photoDescription: e.target.value })
                    }
                    required={false}
                  />
                </>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Título" />
              </div>
              <TextInput
                className="w-full"
                id="title"
                type="text"
                placeholder="Titulo"
                value={blogEntry.title}
                onChange={(e) =>
                  setBlogEntry({ ...blogEntry, title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="subtitle" value="Subtitulo" />
              <TextInput
                className="w-full"
                id="subtitle"
                type="text"
                placeholder="Subtitulo"
                value={blogEntry.subtitle}
                onChange={(e) =>
                  setBlogEntry({ ...blogEntry, subtitle: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="author" value="Autor" />
              <TextInput
                className="w-full"
                id="author"
                type="text"
                placeholder="Autor"
                value={blogEntry.author}
                onChange={(e) =>
                  setBlogEntry({ ...blogEntry, author: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-2 block">
              <Label htmlFor="text" value="Texto" />
              <Textarea
                id="text"
                value={blogEntry.text}
                rows={12}
                onChange={(e) =>
                  setBlogEntry({ ...blogEntry, text: e.target.value })
                }
                placeholder="Texto de la entrada"
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button type="submit" onClick={onSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewBlogEntryModal;
