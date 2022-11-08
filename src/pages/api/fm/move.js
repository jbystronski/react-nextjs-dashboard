const { move } = require("../../../lib/utils/node-utils");

export default async (req, res) => {
  try {
    await move(req.query.target, req.body);

    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
