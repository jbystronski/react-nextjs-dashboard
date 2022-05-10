module.exports = function (ob) {
  return new Proxy(ob, {
    get: (target, prop) =>
      prop.startsWith("_")
        ? undefined
        : typeof target[prop] === "function"
        ? target[prop].bind(target)
        : target[prop],
    set: (target, prop, value) => {
      if (prop.startsWith("_")) {
        throw new Error(`${prop} is a private property`);
      }
      target[prop] = value;
    }
  });
};
