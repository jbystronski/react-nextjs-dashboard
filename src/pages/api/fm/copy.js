const { copy } = require("@jb_fmanager/node-utils");

export default async (req, res) => {
  try {
    await copy(req.query.target, req.body);

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
