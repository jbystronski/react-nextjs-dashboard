const { rename } = require("jb-fm-node-utils");

export default async (req, res) => {
  try {
    const result = await rename(req.query.oldPath, res.query.newPath);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
