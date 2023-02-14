const { Product, Image } = require("../database/models/index");
const imageRepository = require("./image.repository");
const db = require("../database/models/index");

const create = async function (product, images = []) {
  const t = await db.sequelize.transaction();

  try {
    const productCreated = await Product.create(product);

    images.length > 0 &&
      productCreated.id &&
      (await imageRepository.create(images, productCreated.id));

    await t.commit();
    return productCreated;
  } catch (error) {
    await t.rollback();
    return error;
  }
};

const list = async function () {
  const products = await Product.findAll();
  return products;
};

const listWhere = async function (where) {
  const products = await Product.findAll({
    where,
  });

  return products;
};

const find = async function (id) {
  const product = await Product.findByPk(id);
  return product;
};

const findWhere = async function (where) {
  const product = await Product.findOne({
    where,
  });

  return product;
};

const update = async function (product, id) {
  await Product.update(product, {
    where: {
      id,
    },
  });
};


const remove = async function (id) {
  const t = await db.sequelize.transaction();

  try {
    await imageRepository.removeByProduct(id);

    return await Product.destroy({ where: { id } });
  } catch (error) {
    await t.rollback();
    return error;
  }
};

module.exports = {
  create,
  list,
  listWhere,
  find,
  findWhere,
  update,
  remove,
};
