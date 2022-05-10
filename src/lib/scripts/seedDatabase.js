require("dotenv").config();
const client = process.env.DB_CLIENT;
const db = require(`../../core/db/clients/${client}/index`);
const args = process.argv.slice(2);
const chalk = require("chalk");

const model = args[0];
const counter = args[1] || 1;

if (!model)
  throw new Error("An argument specyfing the model or collection is required!");

const buildFromPattern = require(`../seeders/` + model + ".js");

(async function run() {
  console.time("time");

  try {
    const conn = await db.establishDatabaseConnection();
    const payload = await buildFromPattern(conn, counter);
    console.log(chalk.black.bgYellow.bold("Seeder output"));
    console.log(chalk.yellow.bgBlack.bold(JSON.stringify(payload)));
    const res = await conn.run("save_many", model, [payload]);
    console.log(chalk.black.bgYellow.bold(res));
  } catch (e) {
    console.error(e);
  }

  console.timeEnd("time");
})();
