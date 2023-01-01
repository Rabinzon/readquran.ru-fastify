const { DataTypes, Model } = require("sequelize");

class Author extends Model {}

module.exports = function (sequelize) {
  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Author",
      tableName: "authors",
    }
  );

  Author.associate = (models) => {
    models.Author.hasMany(models.Ayat, { foreignKey: "author_id" });
  };

  return Author;
};
