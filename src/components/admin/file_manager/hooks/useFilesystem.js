import { useState, useEffect } from "react";

import { formatDate } from "core/utils/dateHelpers";

import Tree from "core/utils/tree/Tree";
import TreeNode from "core/utils/tree/TreeNode";
import { useManager } from "../context";

const useFilesystem = () => {
  const { handleShareFile, serverPath } = useManager();

  const [data, setData] = useState(null);
  const [focusedFile, setFocusedFile] = useState(null);
  const [directory, setDirectory] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [renameInput, setRenameInput] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);

  const [viewIndex, setViewIndex] = useState(0);

  const isImage = (path) =>
    [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "ico",
      "webp",
      "tiff",
      "tif",
      "avif",
      "apng"
    ].includes(...path.split(".").slice(-1));

  const handleContextMenu = (event, node = null) => {
    event.preventDefault();

    if (node) {
      setFocusedFile(node);
    }

    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const navigateFs = (node) => {
    node = node.split("/").reverse()[0] === "public" ? "/public" : node;

    const n = data.find(node);
    setFocusedFile(n);
    if (n.hasChildren) {
      setDirectory(n);

      setViewIndex(0);
    } else {
      setViewIndex(2);
    }
  };

  function convertToTree(arr) {
    function convertToNodes(data, parent, container = []) {
      data &&
        data.forEach((el) => {
          const n = new TreeNode(el.key, el.value, parent);
          n.children =
            el.hasOwnProperty("children") && el.children.length
              ? convertToNodes(el.children, n)
              : [];

          container.push(n);
        });

      return container;
    }

    const tree = new Tree("/public");
    const root = tree.find("/public");
    root.children = convertToNodes(arr, root);
    setDirectory(root);
    setFocusedFile(root);
    return tree;
  }

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/filesystem/map");
      const data = await res.json();
      const treeData = convertToTree(data);

      setData(treeData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const makeDirectory = async (dirName) => {
    try {
      await fetch("/api/filesystem/makedir", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dir: directory.key + "/" + dirName
        })
      });

      data.insert(directory.key, directory.key + "/" + dirName, dirName);
    } catch (e) {
      console.log(e);
    }
  };

  const remove = async () => {
    if (!focusedFile) return;

    try {
      await fetch(`/api/filesystem/remove?path=${focusedFile.key}`);

      data.remove(focusedFile.key);
      handleShareFile(serverPath(focusedFile.key));
    } catch (e) {
      console.log(e);
    }
  };

  const getFileStats = async () => {
    if (!focusedFile) return;
    try {
      const res = await fetch(
        `/api/filesystem/getFileStats?path=${focusedFile.key}`
      );
      const stats = await res.json();

      return {
        created: formatDate(stats.mtime, "."),
        modified: formatDate(stats.ctime, "."),
        sizeKb: (parseInt(stats.size) / 1024).toFixed(2) + " KiB",
        location: focusedFile.key
      };
    } catch (e) {
      console.log(e);
    }
  };

  const rename = async (originalPath, originalName, newName) => {
    try {
      await fetch(
        `/api/filesystem/rename?path=${originalPath}&originalName=${originalName}&newName=${newName}`
      );

      setRenameInput(false);
      const n = data.find(originalPath);

      n.value = newName;
      await fetchFiles();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    contextMenu,
    data,
    directory,
    fetchFiles,
    focusedFile,
    fullscreenImage,
    getFileStats,
    handleContextMenu,
    isImage,
    makeDirectory,
    navigateFs,
    remove,
    rename,
    renameInput,
    setContextMenu,
    setFocusedFile,
    setFullscreenImage,
    setRenameInput,
    searchFilter,
    setSearchFilter,
    setViewIndex,

    viewIndex
  };
};

export default useFilesystem;
