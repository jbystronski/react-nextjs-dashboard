import { mapFiles } from "core/filesystem";

const path = require("path");

export default async (req, res) => {
  const p = path.resolve("./", "public");
  console.log("PATH", p);

  try {
    const files = await mapFiles(p);

    res.status(200).json(files);
  } catch (e) {
    console.log(e);
  }
};
