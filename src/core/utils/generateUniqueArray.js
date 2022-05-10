const generateUniqueArray = function (
  container,
  counter,
  generator,
  ...generatorArgs
) {
  if (counter === 0) return container;

  const value = generator(...generatorArgs);

  if (container.indexOf(value) === -1) {
    container.push(value);
    counter--;
  }
  return generateUniqueArray(container, counter, generator, ...generatorArgs);
};

module.exports = generateUniqueArray;
