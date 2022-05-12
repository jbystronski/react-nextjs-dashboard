const faker = require("faker");
const path = require("path");

const { urlFromString } = require(path.resolve("src/core/utils"));

module.exports = async () => {
  const name = faker.commerce.department();

  return {
    name: name,
    url: urlFromString(name),
    depth: 0,
    branch: null,
    image: null,
    parent_id: null,
    parent_name: null,
    children: [],
    tag_groups: []
  };
};
