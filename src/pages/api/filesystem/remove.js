import { remove } from "core/filesystem";
import { asyncWrap } from "core/utils/asyncWrap";

export default async (req, res) => {
  const {
    query: { path }
  } = req;

  const [err, result] = await asyncWrap(remove(path));
  return res
    .status(err ? 404 : 200)
    .json({ status: err ? err.message : result });
};
