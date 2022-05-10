import React from "react";
import useWindowSize from "core/hooks/useWindowSize";
import { FixedSizeGrid as FixedGrid } from "react-window";
import { FixedSizeList } from "react-window";
import { useManager } from "../context";
import { Box, Text, Divider, IconButton, useTheme } from "core/ui/_libs";
import _Tile from "../ui/_Tile";
import DocumentIcon from "../ui/DocumentIcon";
import BottomInput from "./BottomInput";
import { UiAvatar, IconMapper } from "core/ui";
import Image from "next/image";
import { Avatar } from "core/ui/_libs";

const GUTTER = 20;

const DataTile = ({ style, rowIndex, columnIndex, data }) => {
  const { isImage, serverPath } = useManager();

  const index =
    rowIndex === 0 ? columnIndex : columnIndex + data.columnCount * rowIndex;

  return index >= data.itemCount ? null : (
    <div
      style={{
        ...style,
        left: style.left + GUTTER,
        top: style.top + GUTTER,
        width: style.width - GUTTER,
        height: style.height - GUTTER
      }}
    >
      <_Tile
        label={data.items[index]["value"]}
        node={data.items[index]}
        onClick={() => alert("clicked")}
      >
        {isImage(data.items[index]["value"]) ? (
          <UiAvatar
            styling={{ borderRadius: 2 }}
            size={[230, 230]}
            path={process.env.baseUrl + serverPath(data.items[index]["key"])}
          />
        ) : (
          <Box>
            <DocumentIcon
              // hasChildren={data.items[index]?.["children"]?.length}
              ext={data.items[index]["value"].split(".").slice(-1)[0]}
              styling={{
                width: { xs: "24px", md: "230px" },
                height: { xs: "24px", md: "230px" }
              }}
            />
          </Box>
        )}
      </_Tile>
    </div>
  );
};

const getImageDimensions = (windowSize, bp) => {
  switch (true) {
    case windowSize.width > 0 && windowSize.width <= bp.sm:
      return 60;

    case windowSize.width > bp.sm:
      return 90;
  }
};

const ItemRenderer = ({ index, style, data }) => {
  const {
    breakpoints: { values: bp }
  } = useTheme();

  const windowSize = useWindowSize();

  const dimensions = getImageDimensions(windowSize, bp);
  const {
    isImage,
    handleContextMenu,
    handleShareFile,
    sharedFiles,
    serverPath,
    setFocusedFile
  } = useManager();
  return (
    <>
      <Box
        onContextMenu={(e) => handleContextMenu(e, data[index])}
        onClick={() => {
          setFocusedFile(data[index]);
          handleShareFile(data[index]["key"]);
        }}
        sx={{
          // bgcolor: "background.paper",
          height: dimensions + 20,
          bgcolor: sharedFiles.includes(
            data[index]["key"].replace("./public", "")
          )
            ? "primary.light"
            : "background.dark",
          display: "flex",
          color: sharedFiles.includes(
            data[index]["key"].replace("./public", "")
          )
            ? "primary.contrastText"
            : "text.primary",
          alignItems: "center",
          width: "400px",
          borderLeft: "1px solid",
          // borderBottom: "1px solid",
          borderColor: "primary.light",
          cursor: "pointer",
          ...style
        }}
      >
        <Box
          sx={{
            borderColor: "primary.light",
            borderBottomWidth: "1px",
            borderStyle: "solid",
            width: "40px",
            mr: 2,
            borderTop: "none",
            borderLeft: "none",
            borderRigth: "none"
          }}
        />
        <div>
          {isImage(data[index]["value"]) ? (
            // <UiAvatar
            //   styling={{ borderRadius: 1 }}
            //   size={[70, 70]}
            //   path={data[index]["key"].replace("./public", process.env.baseUrl)}
            // />
            <Avatar
              sx={{ width: dimensions, height: dimensions, borderRadius: 1 }}
              // src={data[index]["key"].replace("./public", process.env.baseUrl)}
            >
              <Image
                width={dimensions}
                height={dimensions}
                src={
                  process.env.baseUrl +
                  data[index]["key"].replace("./public", "")
                }
              />
            </Avatar>
          ) : (
            <Box>
              <DocumentIcon
                // hasChildren={data.items[index]?.["children"]?.length}
                ext={data[index]["value"].split(".").slice(-1)[0]}
                styling={{
                  width: dimensions,
                  height: dimensions
                }}
              />
            </Box>
          )}
        </div>
        <Text sx={{ ml: 2, borderRadius: 2 }} variant="caption">
          {data[index]["value"]}
        </Text>
      </Box>
    </>
  );
};

const DataGrid = ({ children }) => {
  const { isMaximized } = useManager();
  const windowSize = useWindowSize();
  const {
    breakpoints: { values: bp }
  } = useTheme();

  const calculateManagerWidth = (windowSize) => {
    let width;

    switch (true) {
      case windowSize <= bp.xl && windowSize > bp.lg:
        width = 50;
        break;
      case windowSize <= bp.lg && windowSize > bp.md:
        width = 60;
        break;
      case windowSize <= bp.md && windowSize > bp.sm:
        width = 80;
        break;
      case windowSize < bp.sm:
        width = 95;
        break;
      default:
        width = 50;
    }

    return width / 100;
  };

  const mW = isMaximized ? 0.85 : 0.75;

  if (!children || !children.length) {
    return (
      <Box
        sx={{
          bgcolor: "background.dark",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Text>No files found</Text>
      </Box>
    );
  }

  const getRowHeight = () => {
    switch (true) {
      case windowSize.width > 0 && windowSize.width <= bp.sm:
        return 70;
      case windowSize.width > bp.sm:
        return 100;
    }
  };

  const getRowWidth = () => {
    if (windowSize.width <= bp.sm) {
      return windowSize.width;
    }
  };

  return (
    <Box
      sx={{
        // bgcolor: "background.dark",
        boxSizing: "border-box"
        // p: 2
      }}
    >
      <FixedSizeList
        height={isMaximized ? windowSize.height * 0.9 : 700}
        itemCount={children?.length}
        itemSize={getRowHeight()}
        itemData={children}
        width={getRowWidth()}
        // width={
        //   windowSize.width *
        //     (isMaximized ? 1 : calculateManagerWidth(windowSize.width)) *
        //     mW -
        //   20
        // }
        overscanCount={1}
        layout="vertical"
      >
        {ItemRenderer}
      </FixedSizeList>
    </Box>
  );
};

// const DataGrid = ({ children }) => {
//   const { isMaximized } = useManager();
//   const windowSize = useWindowSize();
//   const columnWidth = 280;
//   const getGridWidth = () =>
//     ((isMaximized ? 1 : 0.4) * windowSize.width * 9) / 12;
//   const columnCount = Math.floor(getGridWidth() / columnWidth);

//   const layoutOptions = {
//     columnWidth: columnWidth,
//     columnCount: columnCount,
//     rowCount: Math.ceil(children?.length / columnCount),
//     rowHeight: columnWidth,
//     height: 700,
//     width: getGridWidth(),
//     overscanRowCount: 1,
//     itemCount: children?.length
//   };

//   const itemOptions = {
//     items: children,
//     itemCount: children?.length,
//     columnCount: columnCount
//   };

//   return (
//     <>
//       {children?.length ? (
//         <>
//           <Box sx={{ bgcolor: "background.dark" }}>
//             <FixedGrid
//               style={{ overflow: "auto", width: "100%" }}
//               {...layoutOptions}
//               itemData={{
//                 ...itemOptions
//               }}
//             >
//               {DataTile}
//             </FixedGrid>
//           </Box>

//           {/* <BottomInput /> */}
//         </>
//       ) : (
//         <p>No files found</p>
//       )}
//     </>
//   );
// };

export default DataGrid;
