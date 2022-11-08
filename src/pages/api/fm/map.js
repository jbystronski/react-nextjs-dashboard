const { map } = require("../../../lib/utils/node-utils");
const path = require("path");

export default async (req, res) => {
  try {
    const result = await map(path.join(proces.cwd(), "public"));

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
