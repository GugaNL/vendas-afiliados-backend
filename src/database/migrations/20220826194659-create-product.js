"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      store: {
        type: Sequelize.STRING,
      },
      imageFilename: {
        type: Sequelize.STRING
      },
      imagePath: {
        type: Sequelize.STRING
      },
      imageMimetype: {
        type: Sequelize.STRING
      },
      linkAfiliate: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      data: {
        type: Sequelize.DATE,
      },
      oldPrice: {
        type: Sequelize.DECIMAL(20, 2),
      },
      newPrice: {
        type: Sequelize.DECIMAL(20, 2),
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      obs1: {
        type: Sequelize.STRING,
      },
      obs2: {
        type: Sequelize.STRING,
      },
      iframeUrl: {
        type: Sequelize.STRING,
      },
      imgUrlTag1: {
        type: Sequelize.STRING,
      },
      imgUrlTag2: {
        type: Sequelize.STRING,
      },
      imgUrlTag3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product");
  },
};
