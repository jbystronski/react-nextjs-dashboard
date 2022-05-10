module.exports = function (value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[ÀÁÂÃÄÅĄ]/g, "A")
    .replace(/[àáâãäåą]/g, "a")
    .replace(/[ę]/g, "e")
    .replace(/[Ę]/g, "e")
    .replace(/[ć]/g, "c")
    .replace(/[Ć]/g, "C")
    .replace(/[ń]/g, "n")
    .replace(/[Ń]/g, "N")
    .replace(/[Ś]/g, "S")
    .replace(/[ś]/g, "s")
    .replace(/[ŹŻ]/g, "Z")
    .replace(/[źż]/g, "z")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
