const { create_folder } = require("../../../lib/utils/node-utils");

export default async (req, res) => {
  try {
    await create_folder(req.query.path, req.query.name);

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
