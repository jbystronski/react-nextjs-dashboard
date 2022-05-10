const faker = require("faker");
const path = require("path");
const { cachedConnection } = require("jb-nodejs-database-adapter");

const { numberRand, arrayRand, generateUniqueArray } = require(path.resolve(
  "src/core/utils"
));

function formatPrice(value) {
  return parseFloat((value * 1).toFixed(2));
}

let products;
let users;
let shipping_methods;
let payment_methods;

(async function () {
  const db = await cachedConnection(
    path.join(__dirname, "/../../../public/db"),
    "local"
  );

  const productsPromise = await db.run(
    "find/products?limit=200&only=code,name,price_wo_tax,price_w_tax,_id"
  );

  const usersPromise = await db.run("find/users?limit=200");

  const shipping_methodsPromise = await db.run(
    "find/shipping_methods?only=name,fee"
  );

  const payment_methodsPromise = await db.run(
    "find/shipping_methods?only=name"
  );

  products = await productsPromise;
  users = await usersPromise;
  shipping_methods = await shipping_methodsPromise;
  payment_methods = await payment_methodsPromise;
})();

module.exports = () => {
  const productCount = numberRand(1, 10);

  const productsArray = generateUniqueArray(
    [],
    productCount,
    arrayRand,
    products
  );

  let subtotal = 0;
  let total = 0;

  const orderProducts = [];

  for (let product in productsArray) {
    const p = productsArray[product];
    const qty = numberRand(1, 10);

    orderProducts.push({
      product_id: p._id,
      code: p.code,
      name: p.name,
      qty: qty,
      unit_price_wo_tax: formatPrice(p.price_wo_tax),
      unit_price_w_tax: formatPrice(p.price_w_tax),
      product_subtotal: formatPrice(p.price_wo_tax * qty),
      product_total: formatPrice(p.price_w_tax * qty)
    });

    subtotal += p.price_wo_tax * qty;
    total += p.price_w_tax * qty;
  }

  const user = arrayRand(users);
  const shipping_method = arrayRand(shipping_methods);
  const payment_method = arrayRand(payment_methods);

  return {
    billing_details: {
      first_name: user.first_name,
      last_name: user.last_name,
      company: user.company,
      tax_id: user.tax_id,
      street: user.street,
      city: user.city,
      zip_code: user.zip_code,
      phone_number: user.phone_number,
      countr: user.country
    },
    package_tracking_code: null,
    shipping_method: shipping_method.name,
    shipping_status: arrayRand(["PREP", "DSPCH", "DELIV", "CXL"]),
    payment_method: payment_method.name,
    payment_status: arrayRand(["AWT", "PAR/P", "PD", "RFD", "CXL"]),
    subtotal: formatPrice(subtotal),
    total: formatPrice(total),
    total_to_pay: formatPrice(total + parseInt(shipping_method.fee)),
    shipping_fee: shipping_method.fee,
    order_number: numberRand(1000000, 9999999).toString(),
    products: orderProducts,
    comment: "...",
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    user_id: user._id
  };
};
