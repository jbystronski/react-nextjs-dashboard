require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const { asyncWrap } = require("../utils/asyncWrap");

const readFile = async (path) => {
  const [err, res] = await asyncWrap(fs.readFile(path));
  if (err) throw err;

  return res.toString();
};
const writeToFile = async (path, content, options = {}) => {
  const [err, res] = await asyncWrap(fs.writeFile(path, content, options));

  if (err) throw err;
  return res;
};

const append = async (path, content) => {
  const [err, res] = await asyncWrap(
    fs.appendFile(path, JSON.stringify(content))
  );
  if (err) throw err;
  return res;
};

const getStats = async (path) => {
  const [err, res] = await asyncWrap(fs.lstat(path));
  if (err) throw err;
  return res;
};

const getFileSizeInBytes = async (path) => {
  const [err, res] = await asyncWrap(fs.lstat(path));

  if (err) throw err;
  return res.size;
};

const getFileSize = async (path, format = 1024) => {
  const [err, res] = await asyncWrap(fs.lstat(path));

  if (err) throw err;
  return format ? res.size / format : res.size;
};

const copyFile = async (src, target) => {
  const [err, res] = await asyncWrap(fs.copyFile(src, target));
  if (err) throw err;
  return res;
};

const isDirectory = async (path) => {
  const [err, res] = await asyncWrap(fs.lstat(path));

  if (res) {
    return res.isDirectory();
  }

  if (err) return err;
};

const makeDir = async (dir) => {
  const exists = await isDirectory(dir);

  if (exists instanceof Error && exists.code === "ENOENT") {
    const [err, res] = await asyncWrap(fs.mkdir(dir));
    if (err) throw err;
    return "Directory created";
  } else {
    return "Directory already exists";
  }
};

const remove = async (path) => {
  const isDir = await isDirectory(path);

  const [err, res] = await asyncWrap(
    isDir ? removeDir(path) : removeFile(path)
  );

  if (err) throw err;
  return res;
};

const removeFile = async (path) => {
  const [err, res] = await asyncWrap(fs.unlink(path));
  if (err) throw err;
  return res;
};

const removeDir = async (dir) => {
  const [err, res] = await asyncWrap(fs.rmdir(dir, { recursive: true }));

  if (err) throw err;
  return res;
};

const rename = async (path, originalName, newName) => {
  const [err, res] = await asyncWrap(
    fs.rename(path, path.replace(originalName, newName))
  );

  if (err) throw err;
  return res;
};

const isFile = async (path) => {
  const [err, res] = await asyncWrap(fs.lstat(path));
  if (err) throw err;

  return res;
};

const mapFiles = async (path = "./public", target = []) => {
  try {
    for (const file of await fs.readdir(path)) {
      const key = path + "/" + file;
      const fileObject = {
        key: key,
        value: file
      };

      if (await isDirectory(key)) {
        fileObject["children"] = await mapFiles(key, []);
      }

      target.push(fileObject);
    }

    return target;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  append,
  copyFile,
  getStats,
  isFile,
  makeDir,
  mapFiles,
  readFile,
  remove,
  rename,
  writeToFile
};
