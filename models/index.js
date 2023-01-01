const Surah = require("./surah");
const Ayat = require("./ayat");
const Author = require("./author");

module.exports = function (sequilize) {
  const models = [Surah(sequilize), Ayat(sequilize), Author(sequilize)];

  models.forEach((model) => model.associate(sequilize.models));
};
