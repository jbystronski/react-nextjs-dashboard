export const toType = (obj) =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
