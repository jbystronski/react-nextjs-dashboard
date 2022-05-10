import { useState } from "react";

const useUpload = () => {
  const [list, setList] = useState([]);

  const removeFromUploadQueue = (name) =>
    setList(list.slice().filter((f) => f.name !== name));

  const emptyUploadQueue = () => {
    setList([]);
  };

  const uploadFiles = async (dir) => {
    if (list.length) {
      const fd = new FormData();
      fd.append("destination", dir.key);
      list.length > 1
        ? list.forEach((f) => fd.append("files", f))
        : fd.append("file", list[0]);

      try {
        const res = await fetch("/api/filesystem/upload", {
          method: "POST",
          body: fd
        });
        setList([]);

        return await res.json();
      } catch (e) {
        return e;
      }
    }
  };

  const onFileChange = (e) =>
    setList(
      Object.values(e.target.files).reduce(
        (acc, curr) => [...acc, curr],
        list.slice()
      )
    );

  return {
    filesToUpload: list,
    setFileToUpload: setList,
    onFileChange,
    removeFromUploadQueue,
    emptyUploadQueue,
    uploadFiles
  };
};

export default useUpload;
