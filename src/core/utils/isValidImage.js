const extensions = ["jpeg", "jpg", "png", "webp"];

module.exports = (path) => extensions.includes(path.split(".")[-1]);
