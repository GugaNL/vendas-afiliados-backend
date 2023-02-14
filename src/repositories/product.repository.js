const { Product } = require("../database/models/index");

const create = async function (product) {
  try {
    const productCreated = await Product.create(product);
    return productCreated;
  } catch (error) {
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
  try {
    return await Product.destroy({ where: { id } });
  } catch (error) {
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
