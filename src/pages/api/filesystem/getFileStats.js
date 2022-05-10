import { getStats } from "core/filesystem";
import { asyncWrap } from "core/utils/asyncWrap";

export default async (req, res) => {
  const [err, result] = await asyncWrap(getStats(req.query.path));

  res.status(err ? 500 : 200).json(err || result);
};
