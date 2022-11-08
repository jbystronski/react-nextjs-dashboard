import { React, useState, createContext, useContext } from "react";
import { FileshareProvider } from "@jb_fmanager/react";
import { useTheme } from "@mui/material/styles";

const AdminContext = createContext({});

const AdminContextProvider = (props) => {
  const [managerOpen, setManagerOpen] = useState(false);

  const serverPath = (path, url) => url + path.replace("./public", "");

  const { palette } = useTheme();

  const values = {
    setManagerOpen,
    managerOpen,

    serverPath,
  };

  return (
    <AdminContext.Provider value={values}>
      <FileshareProvider>{props.children}</FileshareProvider>
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
export default AdminContextProvider;
