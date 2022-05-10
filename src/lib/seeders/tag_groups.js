const faker = require("faker");
const path = require("path");

const {
  numberRand,

  generateUniqueArray
} = require(path.resolve("src/core/utils"));

module.exports = async (db, ...args) => {
  const [counter] = args;

  const namesArray = generateUniqueArray(
    [],
    counter,
    faker.commerce.productAdjective
  );
  const container = [];

  for (let i = 0; i < counter; i++) {
    let name = namesArray.slice(i, i + 1);

    const tagsCount = numberRand(1, 14);

    const ob = {
      group_name: name[0],
      tags: generateUniqueArray([], tagsCount, faker.commerce.color)
    };

    container.push(ob);
  }

  console.log(container);

  return container;
};
