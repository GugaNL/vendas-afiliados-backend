"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      brand: DataTypes.STRING,
      store: DataTypes.STRING,
      imageFilename: DataTypes.STRING,
      imagePath: DataTypes.STRING,
      imageMimetype: DataTypes.STRING,
      linkAfiliate: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      data: DataTypes.DATE,
      oldPrice: DataTypes.DECIMAL(20, 2),
      newPrice: DataTypes.DECIMAL(20, 2),
      discount: DataTypes.INTEGER,
      obs1: DataTypes.STRING,
      obs2: DataTypes.STRING,
      iframeUrl: DataTypes.STRING,
      imgUrlTag1: DataTypes.STRING,
      imgUrlTag2: DataTypes.STRING,
      imgUrlTag3: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: 'product',
    }
  );
  return Product;
};
