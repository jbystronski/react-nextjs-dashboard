const faker = require("faker");
const path = require("path");
const { cachedConnection, Query } = require("@db-essentials/base");

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

async function getProducts() {
  const conn = await cachedConnection(
    {
      database: path.resolve("./src/lib", "db")
    },
    "no_persist"
  );

  if (products) {
    return products;
  } else {
    products = await new Query(conn).run(
      "find/products?_limit=200&_only=code,name,price_wo_tax,price_w_tax,_id"
    );
    return products;
  }
}

async function getUsers() {
  const conn = await cachedConnection(
    {
      database: path.resolve("./src/lib", "db")
    },
    "no_persist"
  );

  if (users) {
    return users;
  } else {
    users = await new Query(conn).run("find/users?_limit=200");
    return users;
  }
}

async function getShippingMethods() {
  const conn = await cachedConnection(
    {
      database: path.resolve("./src/lib", "db")
    },
    "no_persist"
  );

  if (shipping_methods) {
    return shipping_methods;
  } else {
    shipping_methods = await new Query(conn).run(
      "find/shipping_methods?_only=name,fee"
    );
    return shipping_methods;
  }
}

async function getPaymentMethods() {
  const conn = await cachedConnection(
    {
      database: path.resolve("./src/lib", "db")
    },
    "no_persist"
  );

  if (payment_methods) {
    return payment_methods;
  } else {
    payment_methods = await new Query(conn).run(
      "find/payment_methods?_only=name"
    );
    return payment_methods;
  }
}

module.exports = async () => {
  const productCount = numberRand(1, 10);

  const productsArray = generateUniqueArray(
    [],
    productCount,
    arrayRand,
    await getProducts()
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

  const user = arrayRand(await getUsers());
  const shipping_method = arrayRand(await getShippingMethods());
  const payment_method = arrayRand(await getPaymentMethods());

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
