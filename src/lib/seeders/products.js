const faker = require("faker");
const path = require("path");
const { cachedConnection } = require("jb-nodejs-database-adapter");

const { urlFromString, numberRand, arrayRand } = require(path.resolve(
  "src/core/utils"
));

const categoriesPromise = (async function () {
  const db = await cachedConnection(
    path.join(__dirname, "/../../../public/db"),
    "local"
  );

  const categories = await db.run("find/categories?only=name,_id");

  return categories;
})();
function formatPrice(value) {
  return parseFloat((value * 1).toFixed(2));
}

let categories;
categoriesPromise.then((res) => {
  categories = res;
});

module.exports = () => {
  if (!categories.length) {
    console.log(
      "Found 0 categories, you must add some categories first, quitting."
    );
    process.exit(1);
  }

  const pPrice = faker.datatype.float();
  const pPriceWithTax = pPrice + pPrice * 0.23;
  const category = arrayRand(categories);
  let name = faker.commerce.productName();

  return {
    name: name,
    code: numberRand(1000000, 9999999).toString(),
    url: urlFromString(name),
    description: faker.commerce.productDescription(),
    published: faker.datatype.boolean(),
    in_stock: faker.datatype.number(),
    priority: numberRand(1, 10),
    price_wo_tax: formatPrice(pPrice),
    price_w_tax: formatPrice(pPriceWithTax),
    category_id: category["_id"],
    category: category["name"],
    primary_image: null,
    secondary_images: [],
    sold: numberRand(1, 9999),
    tags: [],
    rating: Math.floor(Math.random() * (6 - 1)) + 1,
    applied_discounts_ids: [],
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
};
