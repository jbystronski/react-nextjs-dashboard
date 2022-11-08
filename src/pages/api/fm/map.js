const { map } = require("@jb_fmanager/node-utils");

export default async (req, res) => {
  try {
    const result = await map(req.query.path);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
