import { useEffect, useState } from "react";

import { useManager } from "../context";
import _Tile from "../ui/_Tile";
import DocumentIcon from "../ui/DocumentIcon";
import { Box, Text } from "core/ui/_libs";
import { UiAvatar } from "core/ui";

export default function FileInfo({ file }) {
  const { isImage, handleContextMenu, getFileStats, serverPath } = useManager();
  const [stats, setStats] = useState(null);

  useEffect(async () => {
    try {
      const data = await getFileStats(file);

      setStats(data);
    } catch (e) {
      console.log(e);
    }
  }, [file]);

  const renderImage = (file) => (
    <UiAvatar
      styling={{ borderRadius: 2 }}
      size={[200, 200]}
      path={process.env.baseUrl + file.key.replace("./public", "")}
    />
  );

  const renderIcon = (file) => (
    <UiAvatar
      styling={{ borderRadius: 2, bgcolor: "background.dark" }}
      size={[200, 200]}
      fallback={
        <DocumentIcon
          ext={file && file.value.split(".").slice(-1)[0]}
          styling={{
            fontSize: "5rem"
          }}
        />
      }
    />
  );

  const renderFile = (file) => {
    return (
      <>
        <Box sx={{ mb: 3 }} onContextMenu={(e) => handleContextMenu(e, file)}>
          {isImage(file.key) ? renderImage(file) : renderIcon(file)}
        </Box>
        {stats ? (
          <Box sx={{ minWidth: "100px" }}>
            <Text variant="body1" sx={{ mb: 2 }}>
              File details
            </Text>
            <Text>Location: {stats.location}</Text>
            <Text>Created: {stats.created}</Text>
            <Text>Modified: {stats.modified}</Text>
            <Text>Size: {stats.sizeKb}</Text>
          </Box>
        ) : null}
      </>
    );
  };

  return <>{file && renderFile(file)}</>;
}
