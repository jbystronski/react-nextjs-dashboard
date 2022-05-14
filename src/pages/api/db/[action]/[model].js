const {
  cachedConnection,
  resolveConnection,
  Query
} = require("@db-essentials/base");

const path = require("path");

export default async (req, res) => {
  try {
    const { url, body, query } = req;

    const Instance = resolveConnection(process.env.db);
    const noCache = await new Instance(
      { database: path.resolve("./src/lib", "db") },
      "no_persist"
    ).establishConnection();

    const conn = await cachedConnection(
      {
        database: path.resolve("./src/lib", "db")
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
