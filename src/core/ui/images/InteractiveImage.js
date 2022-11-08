import { useState } from "react";
import { Fade } from "@mui/material";
import Image from "./Image";
import InteractiveImageMenu from "./InteractiveImageMenu";
import Overlay from "../Overlay";

const InteractiveImage = ({ path, menu }) => {
  const [overlay, setOverlay] = useState(false);

  return (
    <Image
      path={path}
      onMouseEnter={() => setOverlay(true)}
      onMouseLeave={() => setOverlay(false)}
    >
      <Fade timeout={300} in={overlay}>
        <Overlay style={{ display: overlay ? "block" : "none" }}>
          <InteractiveImageMenu menu={menu} />
        </Overlay>
      </Fade>
    </Image>
  );
};

export default InteractiveImage;
