const { rename } = require("@jb_fmanager/node-utils");

export default async (req, res) => {
  try {
    await rename(req.query.oldPath, res.query.newPath);

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
