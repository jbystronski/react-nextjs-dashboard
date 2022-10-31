const { create_folder } = require("jb-fm-node-utils");

export default async (req, res) => {
  try {
    const result = await create_folder(req.query.path, req.query.name);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
