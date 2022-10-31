import { Box } from "core/ui/_libs";
// import ReactFileManager from "jb-react-file-manager";

import { useAdmin } from "lib/contexts";

const Main = (props) => {
  const { managerOpen, setManagerOpen } = useAdmin();

  console.log("ORIG", window.location.origin);

  return (
    <Box component="main">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {props.children}

        {/* {managerOpen && (
          <ReactFileManager
            isOpen={managerOpen}
            onClose={() => setManagerOpen(false)}
            namespace="http://localhost:4000/api/fm"
            preview={true}
            tree={null}
            id="react-file-manager"
            root="public"
            host="localhost:4000"
            maxFileUploadSize="6291456"
            stackIndex={6000}
            lightTheme={{}}
            darkTheme={{}}
          />
        )} */}
      </Box>
    </Box>
  );
};

export default Main;
