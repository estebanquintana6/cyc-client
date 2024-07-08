import { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Textarea,
  Select
} from "flowbite-react";

import { useAuthContext } from "../../contexts/AuthContext";
import authFetch, { fetch } from "../../../utils/authFetch";
import { errorModal } from "../../../utils/errorModal";
import successModal from "../../../utils/sucessModal";

const EditBlogEntryModal = ({ id, onClose, fetchBlogEntries }) => {
  const { token } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [blogEntry, setBlogEntry] = useState({
    title: "",
    subtitle: "",
    author: "",
    text: "",
    photos: [],
  });

  const [toDeletePhotos, setToDeletePhotos] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const photoRef = useRef();

  const { photos = [] } = blogEntry;

  const nonDeletedPhotos = photos.filter(
    ({ _id }) => !toDeletePhotos.includes(_id),
  );

  useEffect(() => {
    const fetchBlogEntry = async () => {
      if (!id) return;
      try {
        const { status, data } = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/blogs/get/${id}`,
          "GET",
        );
        if (status === 200) {
          setBlogEntry(data);
        }
      } catch (err) {
        console.log(err);
        setBlogEntry({});
      }
    };
    fetchBlogEntry();
  }, [id]);

  const onImageChange = (event) => {
    let files = photoRef.current?.files;

    if (files) {
      const urls = [];

      for (const f of files) {
        if (f.size > 5000000) {
          alert(
            "Hay una foto que pesa más de 5mb, por favor comprimela antes de subirla",
          );
          event.target.value = ""; // clear the file input
          continue;
        }
        urls.push({
          url: URL.createObjectURL(f),
          originalName: f.name,
          description: "",
        });
      }

      setNewImages(urls);
    }
  };

  const onNewImageDescriptionHandle = (index, description) => {
    let newArr = [...newImages];
    newArr[index] = {
      ...newArr[index],
      description,
    };

    setNewImages(newArr);
  };

  const onNewImagePositionHandle = (index, position) => {
    let newArr = [...newImages];
    newArr[index] = {
      ...newArr[index],
      position,
    };

    setNewImages(newArr);
  };

  const onImageDescriptionHandle = (index, description) => {
    let newArr = [...photos];
    newArr[index] = {
      ...newArr[index],
      description,
    };

    setBlogEntry({
      ...blogEntry,
      photos: newArr,
    });
  };

  const onPositionChangeHandle = (index, position) => {
    let newArr = [...photos];
    newArr[index] = {
      ...newArr[index],
      position,
    };

    setBlogEntry({
      ...blogEntry,
      photos: newArr,
    });
  };

  const handleImageDelete = (originalName) => {
    let files = photoRef.current?.files;
    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name !== originalName) dt.items.add(file); // here you exclude the file. thus removing it.
    }

    photoRef.current.files = dt.files;

    let newArr = [...newImages].filter(
      ({ originalName: name }) => name !== originalName,
    );

    setNewImages(newArr);
  };

  const onSave = async () => {
    setIsLoading(true);

    try {
      let formData = new FormData();

      let files = photoRef.current?.files;

      for (const file of files) {
        formData.append("newPhotos", file);
      }

      formData.append("id", blogEntry._id);
      formData.append("title", blogEntry.title);
      formData.append("subtitle", blogEntry.subtitle);
      formData.append("author", blogEntry.author);
      formData.append("text", blogEntry.text);
      console.log(newImages);
      formData.append("imageDescriptions", JSON.stringify(newImages));
      formData.append(
        "photos",
        JSON.stringify(
          blogEntry.photos.filter(({ _id }) => !toDeletePhotos.includes(_id)),
        ),
      );
      console.log(blogEntry.photos.filter(({ _id }) => !toDeletePhotos.includes(_id)));
      formData.append("toDeletePhotos", JSON.stringify(toDeletePhotos));

      const { status } = await authFetch(
        `${process.env.REACT_APP_SERVER_URL}/blogs/update`,
        "POST",
        token,
        formData,
        "multipart/form-data",
      );

      setIsLoading(false);

      if (status === 200) {
        successModal("La entrada de blog ha sido editada");
        await fetchBlogEntries();
        onClose();
      }
    } catch (err) {
      const {
        response: {
          data: { error },
        },
      } = err;
      errorModal(error);
      setIsLoading(false);
    }
  };

  const { title, author, text } = blogEntry;

  const btnEnabled =
    !isLoading &&
    title.length > 0 &&
    author.length > 0 &&
    text.length > 0;

  return (
    <>
      <Modal show={true} onClose={onClose}>
        <Modal.Header>Modificar entrada de blog</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Foto" />
              <FileInput
                multiple={false}
                accept="image/*"
                id="photo"
                ref={photoRef}
                onChange={onImageChange}
                helperText="Puedes seleccionar una foto"
              />
            </div>
            <div className="mb-2 block">
            {nonDeletedPhotos.map((photo, index) => {
            const { _id, url, description, position } = photo;
            return (
              <div className="grid grid-cols-2 gap-4 my-5" key={_id}>
                <img
                  alt="preview to upload"
                  className="w-full"
                  src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                />
                <div className="w-full flex flex-col">
                  <Textarea
                    id={`desc-${_id}`}
                    rows={4}
                    value={description}
                    onChange={(e) =>
                      onImageDescriptionHandle(index, e.target.value)
                    }
                    placeholder="Descripción de foto"
                    required={false}
                  />
                  <div className="flex flex-row mt-2">
                    <Select
                      id="img-position"
                      value={position}
                      className="mr-auto"
                      onChange={(e) =>
                        onPositionChangeHandle(index, e.target.value)
                      }
                    >
                      <option></option>
                      {Array(nonDeletedPhotos.length + newImages.length)
                        .fill(0)
                        .map((_, i) => (
                          <option value={i+1}>{i + 1}</option>
                        ))}
                    </Select>
                    <button
                      type="button"
                      className="w-9 ml-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mt-2"
                      onClick={() =>
                        setToDeletePhotos([...toDeletePhotos, _id])
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {newImages.map(
            ({ _id, url, originalName, description, position }, index) => (
              <div className="grid grid-cols-2 gap-4 my-5" key={_id}>
                <img alt="preview to upload" className="w-full" src={url} />
                <div className="w-full flex flex-col">
                  <Textarea
                    id={`desc-${originalName}`}
                    rows={4}
                    value={description}
                    onChange={(e) =>
                      onNewImageDescriptionHandle(index, e.target.value)
                    }
                    placeholder="Descripción de foto"
                    required={false}
                  />
                  <div className="flex flex-row mt-2">
                    <Select
                      id="img-position"
                      value={position}
                      className="mr-auto"
                      onChange={(e) =>
                        onNewImagePositionHandle(index, e.target.value)
                      }
                    >
                      <option></option>
                      {Array(nonDeletedPhotos.length + newImages.length)
                        .fill(0)
                        .map((_, i) => (
                          <option>{i + 1}</option>
                        ))}
                    </Select>
                    <button
                      type="button"
                      onClick={() => handleImageDelete(originalName)}
                      className="w-9 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mt-2 mx-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ),
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
          <Button type="submit" onClick={onSave} disabled={!btnEnabled}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBlogEntryModal;
