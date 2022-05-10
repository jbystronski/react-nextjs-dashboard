import React from "react";

import { useManager } from "../context";
import DataGrid from "./DataGrid";
import UploadList from "./UploadList";
import FileInfo from "./FileInfo";
import { Box } from "core/ui/_libs";

const Main = () => {
  const { focusedFile, viewIndex, searchFilter, directory } = useManager();

  const filterData = (filter, data) => {
    if (filter === null || filter === "") return data;
    return data.filter((node) =>
      node.value.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return {
    0: directory ? (
      <DataGrid>{filterData(searchFilter, directory.children)}</DataGrid>
    ) : null,

    1: <UploadList />,
    2: (
      <>
        {focusedFile ? (
          <Box sx={{ p: 3 }}>
            <FileInfo file={focusedFile} />
          </Box>
        ) : null}
      </>
    )
  }[viewIndex];
};

export default Main;
