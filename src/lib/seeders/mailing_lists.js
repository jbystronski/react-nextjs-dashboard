const faker = require("faker");

module.exports = () => {
  return {
    active: faker.datatype.boolean(),
    name: faker.company.catchPhrase(),
    description: faker.commerce.productDescription(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString()
  };
};
