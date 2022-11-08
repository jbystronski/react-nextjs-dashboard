const { map } = require("@jb_fmanager/node-utils");
const path = require("path");

export default async (req, res) => {
  try {
    const result = await map(path.resolve(process.cwd(), req.query.path));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
