const { create_folder } = require("../../../lib/utils/node-utils");
const path = require("path");
import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  console.log("browsr only false, creating dir");
  console.log("dir new", req.query.path);
  console.log("resolved", path.resolve("./public", req.query.path));
  console.log("joined", path.resolve("./public", req.query.path));
  try {
    await create_folder(
      path.resolve("./public", req.query.path),
      req.query.name
    );

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
