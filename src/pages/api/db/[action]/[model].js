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

    console.log("CONN", conn);

    const q = await Query.create({ connection: conn, url, body });

    console.log("Q", q);

    const data = await q.run();

    console.log("DATA", data);

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
};
