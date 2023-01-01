const { DataTypes, Model } = require("sequelize");

class Ayat extends Model {}

module.exports = function (sequelize) {
  Ayat.init(
    {
      text: {
        type: DataTypes.STRING(1500),
        allowNull: false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      surah_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      _search: {
        type: DataTypes.TSVECTOR,
      },
    },
    {
      sequelize,
      modelName: "Ayat",
      tableName: "ayats",
      timestamps: false,
    }
  );

  Ayat.associate = (models) => {
    models.Ayat.belongsTo(models.Surah, { foreignKey: "surah_id" });
    models.Ayat.belongsTo(models.Author, { foreignKey: "author_id" });
  };

  return Ayat;
};
