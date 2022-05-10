// require(dotenv.config());
import React from "react";

import { useManager } from "../context";
import useFilesystem from "../hooks/useFilesystem";
import { IconButton, IconMapper } from "core/ui";

import SearchBar from "./SearchBar";

import { Text, Stack, Box } from "core/ui/_libs";

// const storagePath = process.env.STORAGE_PATH;

export default function Navigation() {
  const {
    searchBarVisible,
    focusedFile,
    directory,
    navigateFiles,
    traverseFiles
  } = useManager();

  return (
    <>
      {searchBarVisible ? (
        <SearchBar />
      ) : (
        <>
          {directory &&
            directory
              .split("/")
              .filter((el) => el !== "")
              .map((segment) => (
                <React.Fragment key={segment}>
                  <IconMapper icon="right" color="icons.primary" />
                  <Text
                    variant="caption"
                    onClick={() => navigateFiles(directory, segment)}
                    sx={{ cursor: "pointer", color: "secondary.main" }}
                  >
                    {segment}
                  </Text>
                </React.Fragment>
              ))}
        </>
      )}
    </>
  );
}
