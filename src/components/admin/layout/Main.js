import { Box } from "core/ui/_libs";

const Main = (props) => {
  return (
    <Box component="main">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Main;
