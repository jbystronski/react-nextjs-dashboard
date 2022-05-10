import { useState } from "react";

import { Box, Slide, Fade } from "core/ui/_libs";

import { Image, InteractiveImageMenu, Overlay } from "..";

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
          {/* <Slide direction="up" timeOut={500} in={overlay}> */}
          <InteractiveImageMenu menu={menu} />
          {/* </Slide> */}
        </Overlay>
      </Fade>
      {/* <Slide in={overlay}></Slide> */}
    </Image>
  );
};

export default InteractiveImage;
