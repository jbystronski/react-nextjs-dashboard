import { Stack } from "@mui/material";
import IconButton from "../IconButton";

function InteractiveImageMenu({ menu, ...props }) {
  return (
    <Stack
      direction="row"
      sx={{
        p: 1,
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
        justifyContent: "flex-end",
      }}
    >
      {menu &&
        menu.map((props, index) => (
          <IconButton key={index}>{props}</IconButton>
        ))}
    </Stack>
  );
}

export default InteractiveImageMenu;
