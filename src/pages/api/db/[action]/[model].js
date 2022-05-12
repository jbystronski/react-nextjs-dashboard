const { cachedConnection, Query } = require("@db-essentials/base");

const path = require("path");

export default async (req, res) => {
  try {
    const { url, body, query } = req;

    const conn = await cachedConnection(
      {
        database: path.resolve("./src/lib", "db")
      },
      "no_persist"
    );

    const q = new Query(conn);

    const data = await q.run(decodeURIComponent(url), body);

    console.log("conn", JSON.stringify(conn));

    console.log("DAATA", data);

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};
