const path = require("path");
const fs = require("fs").promises;
let active = {};

const getCollection = async (db, name) => {
  try {
    if (name === "settings") {
      console.log("dbbbb", `${db}/${name}.json`);
      console.log("file", JSON.parse(await fs.readFile(`${db}/${name}.json`)));
    }

    const coll = JSON.parse(await fs.readFile(`${db}/${name}.json`));
    return JSON.parse(JSON.stringify(coll));
  } catch (error) {
    console.error(error);
    if (error.code === "ENOENT") {
      console.log(`Collection "${name}" doesn't exist yet`);
      return [];
    } else {
      console.error(error);
    }
  }
};

const getAllCollections = async (db) => {
  try {
    const collectionsGroup = {};
    for (const file of await fs.readdir(db)) {
      const name = file.replace(".json", "");

      collectionsGroup[name] = await getCollection(db, name);
    }

    return collectionsGroup;
  } catch (error) {
    console.error(error);
  }
};

const dropCollection = async (db, name) =>
  await fs.unlink(`${db}/${name}.json`);

exports.create = async ({ database, mode, label }) => {
  if (active.hasOwnProperty(label)) {
    return active[label];
  }

  const db = path.resolve(database);

  active[label] = {
    label,
    database: db,
    mode,
    getCollection: async (name) => await getCollection(db, name),
    getAllCollections: async () => await getAllCollections(db),
    dropCollection: async (name) => await dropCollection(db, name),
  };

  return active[label];
};

exports.getConnection = (label) => active[label];

exports.getActiveConnections = () => active;

exports.close = (label) => {
  if (active.hasOwnProperty(label)) {
    Object.keys(active[label]).forEach((key) => delete active[label][key]);

    delete active[label];
  }
};
