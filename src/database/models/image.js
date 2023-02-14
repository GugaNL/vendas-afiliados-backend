'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Image.init({
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    mimetype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'image',
  });
  return Image;
};