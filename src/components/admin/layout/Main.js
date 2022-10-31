import { Box } from "core/ui/_libs";
// import ReactFileManager from "jb-react-file-manager";

import { useAdmin } from "lib/contexts";

const Main = (props) => {
  const { managerOpen, setManagerOpen } = useAdmin();

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
            namespace="/api/fm"
            preview={true}
            tree={null}
            id="react-file-manager"
            root="public"
            host="localhost:5000"
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
