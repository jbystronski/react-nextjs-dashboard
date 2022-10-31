const { copy } = require("jb-fm-node-utils");

export default async (req, res) => {
  try {
    const result = await copy(req.query.target, res.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
