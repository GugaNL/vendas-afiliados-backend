"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      //Product.hasOne(models.Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      brand: DataTypes.STRING,
      store: DataTypes.STRING,
      mainImage: DataTypes.STRING,
      linkAfiliate: DataTypes.STRING,
      category: DataTypes.STRING,
      data: DataTypes.DATE,
      oldPrice: DataTypes.DECIMAL(20, 2),
      newPrice: DataTypes.DECIMAL(20, 2),
      discount: DataTypes.INTEGER,
      obs1: DataTypes.STRING,
      obs2: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Product",
      tableName: 'product',
    }
  );
  return Product;
};
