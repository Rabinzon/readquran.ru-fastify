const { DataTypes, Model } = require("sequelize");

class Surah extends Model {}

module.exports = function (sequelize) {
  Surah.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      chronological_order: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      traditional_order: {
        type: DataTypes.INTEGER,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Surah",
      tableName: "surahs",
      timestamps: false,
    }
  );

  Surah.associate = (models) => {
    models.Surah.hasMany(models.Ayat, { foreignKey: "surah_id" });
  };

  return Surah;
};
