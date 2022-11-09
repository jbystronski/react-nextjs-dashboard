const { map } = require("../../../lib/utils/node-utils");
const path = require("path");

export default async (req, res) => {
  try {
    console.log("p", path.join(process.cwd(), req.query.path));
    const result = await map(path.join(process.cwd(), req.query.path));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
