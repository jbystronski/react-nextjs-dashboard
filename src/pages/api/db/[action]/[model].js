const { cachedConnection, Query } = require("@db-essentials/base");

const path = require("path");

export default async (req, res) => {
  try {
    const { url, body, query } = req;

    console.log("DIRNAME", path.resolve("./src/lib", "db"));

    console.log("Q", JSON.stringify(query));

    console.log("ENCODED", encodeURIComponent(url));
    console.log("DECODED", decodeURIComponent(url));
    console.log("DECODE URI", decodeURI(url));

    console.log("URL", url);

    const conn = await cachedConnection(
      {
        database: path.resolve("./src/lib", "db")
      },
      "no_persist"
    );

    const q = new Query(conn);

    const data = await q.run(url, body);

    console.log("DAATA", data);

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};
