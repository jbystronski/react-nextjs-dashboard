import { React, useState, createContext, useContext } from "react";

import { Portal, Box } from "core/ui/_libs";

import FileManager from "components/admin/file_manager/FileManager";

const AdminContext = createContext({});

const AdminContextProvider = (props) => {
  const [managerOpen, setManagerOpen] = useState(false);

  const [sharedFiles, setSharedFiles] = useState([]);

  const serverPath = (path, url) => url + path.replace("./public", "");

  const handleShareFile = (filePath) => {
    const cp = sharedFiles.slice();

    const path = filePath.replace("./public", "");

    const index = cp.indexOf(path);

    index !== -1 ? cp.splice(index, 1) : cp.push(path);
    setSharedFiles(cp);
  };

  const values = {
    setManagerOpen,
    managerOpen,

    sharedFiles,

    handleShareFile,
    serverPath
  };

  return (
    <AdminContext.Provider value={values}>
      {props.children}
      {managerOpen ? (
        <Portal>
          <Box sx={{ display: "block" }}>
            <FileManager />
          </Box>
        </Portal>
      ) : null}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContextProvider;
