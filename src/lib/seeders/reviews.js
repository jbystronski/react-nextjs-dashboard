const faker = require("faker");
const path = require("path");
const { cachedConnection } = require("jb-nodejs-database-adapter");

let users;
let products;
let orders;

(async function () {
  const db = await cachedConnection(
    path.join(__dirname, "/../../../public/db"),
    "local"
  );

  const [usersPromise, productsPromise, ordersPromise] =
    await db._dumpDocumentIds(["users", "products", "orders"]);

  users = await usersPromise;
  products = await productsPromise;
  orders = await ordersPromise;
})();

const { numberRand } = require(path.resolve("src/core/utils"));

module.exports = () => {
  const getRandomId = (model) => model[numberRand(0, model.length)];

  return {
    content: faker.commerce.productDescription(),
    posted_by: faker.name.firstName() + " " + faker.name.lastName(),
    rate: numberRand(1, 6),
    published: faker.datatype.boolean(),
    order_id: getRandomId(orders),
    product_id: getRandomId(products),
    user_id: getRandomId(users),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
};
