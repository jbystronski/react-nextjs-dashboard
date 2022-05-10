const faker = require("faker");
const path = require("path");
const chalk = require("chalk");

const { numberRand, arrayRand } = require(path.resolve("src/core/utils"));

module.exports = () => {
  const gender = arrayRand(["male", "female"]);

  return {
    gender: gender,
    img: `https://randomuser.me/api/portraits/${arrayRand([
      "women",
      "men"
    ])}/${numberRand(1, 99)}.jpg`,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    street: faker.address.streetAddress(),
    city: faker.address.cityName(),
    zip_code: faker.address.zipCode(),
    country: faker.address.country(),
    company: faker.company.companyName(),
    tax_id:
      numberRand(10000, 99999).toString() +
      "-" +
      numberRand(10000, 99999).toString() +
      "-" +
      numberRand(10000, 99999).toString() +
      "-" +
      numberRand(10000, 99999).toString(),
    phone_number: faker.phone.phoneNumber(),

    password: "123123",
    active: faker.datatype.boolean(),
    logged_in: faker.datatype.boolean(),
    activation_token: "",
    role: "user",
    mailing_list_ids: [],
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
};
