const { remove } = require("jb-fm-node-utils");

export default async (req, res) => {
  try {
    const result = await remove(req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
