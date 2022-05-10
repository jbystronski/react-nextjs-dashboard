import { styled } from "@mui/styles";

const Overlay = styled("div")({
  position: "absolute",
  left: 0,
  top: 0,
  cursor: "pointer",
  width: "100%",
  height: "100%",
  backgroundImage:
    "-webkit-linear-gradient(rgba(255,255,255, 0) 70%, rgba(0,0,0, 0.80) 100%)",
  overflow: "hidden",
  zIndex: 1000,
  transition: "all 0.6s ease-in-out"
});

export default Overlay;
