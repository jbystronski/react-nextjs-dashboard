import { makeDir } from "core/filesystem";
import { asyncWrap } from "core/utils/asyncWrap";

export default async (req, res) => {
  const [err, result] = await asyncWrap(makeDir(req.body.dir));

  return res.status(err ? 500 : 200).json({ status: err ? err : result });
};
