const { upload } = require("../../../lib/utils/node-utils");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    const result = await upload(
      req,
      res,
      req.query.destination,
      req.query.max_size
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
};
