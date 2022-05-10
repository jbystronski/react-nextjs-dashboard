import { React, useState, createContext, useContext } from "react";
import useDownload from "./hooks/useDownload";
import useFilesystem from "./hooks/useFilesystem";
import useUpload from "./hooks/useUpload";
import { useAdmin } from "lib/contexts/admin/context";

const FileManagerContext = createContext({});

const FileManagerProvider = (props) => {
  const { sharedFiles, handleShareFile } = useAdmin();

  const [isMaximized, setMaximized] = useState(false);

  const values = {
    ...useFilesystem(),
    ...useDownload(),
    ...useUpload(),
    setMaximized,

    isMaximized,

    sharedFiles,
    handleShareFile
  };

  return (
    <FileManagerContext.Provider value={values}>
      {props.children}
    </FileManagerContext.Provider>
  );
};

export const useManager = () => useContext(FileManagerContext);
export default FileManagerProvider;
