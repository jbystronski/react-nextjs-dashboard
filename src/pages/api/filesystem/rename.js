import { rename } from "core/filesystem";
import { asyncWrap } from "core/utils/asyncWrap";

export default async (req, res) => {
  const {
    query: { path, originalName, newName }
  } = req;

  const [err, result] = await asyncWrap(rename(path, originalName, newName));
  return res
    .status(err ? 404 : 200)
    .json({ status: err ? err.message : result });
};
