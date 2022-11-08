const { Query, Connection } = require("@db-essentials/base");
const path = require("path");

export default async (req, res) => {
  try {
    const { url, body, query } = req;

    const conn =
      Connection.getConnection("default") ||
      (await Connection.create({
        database: "./src/lib/db",
        label: "default",
        mode: "no_persist",
      }));

    const q = await Query.create({ connection: conn, url, body });

    const data = await q.run();

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
