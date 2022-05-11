const { cachedConnection, Query } = require("@db-essentials/base");

const path = require("path");

export default async (req, res) => {
  try {
    const { url, body, query } = req;

    console.log("DIRNAME", __dirname);

    const conn = await cachedConnection(
      {
        database: process.env.localDbPath
      },
      "no_persist"
    );

    const q = new Query(conn);

    const data = await q.run(url, body);

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};
