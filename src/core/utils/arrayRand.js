module.exports = function (array) {
  if (!array.length) throw new Error("Array is empty");
  return array[Math.floor(Math.random() * array.length)];
};
