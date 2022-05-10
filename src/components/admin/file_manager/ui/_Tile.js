import { useManager } from "../context";
import { Box, Text, Tooltip, Zoom } from "core/ui/_libs";

const _Tile = ({ node, ...props }) => {
  const { handleContextMenu } = useManager();

  return (
    <Box
      onContextMenu={(e) => handleContextMenu(e, node)}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        justifyContent: "flex-end",
        alignItems: "center",
        width: 1,
        height: 1,
        border: 1,
        backgroundColor: "background.dark",
        borderRadius: "8px",
        border: "none"
      }}
    >
      {props.children}
      <Box sx={{ width: "90%", overflow: "hidden" }}>
        <Tooltip
          title={props.label}
          placement="bottom"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 150 }}
          sx={{
            bgcolor: "rgba(0,0,0,0.2)"
          }}
        >
          <Text
            sx={{
              cursor: "pointer",
              fontSize: "0.65rem",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              boxSizing: "border-box",
              px: 1,
              pb: 1,
              textAlign: "center"
            }}
          >
            {props.label}
          </Text>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default _Tile;
