const { Op } = require("sequelize");
const { Product } = require("../database/models/index");

const create = async function (product) {
  try {
    const productCreated = await Product.create(product);
    return productCreated;
  } catch (error) {
    return error;
  }
};

const list = async function (page, limit) {
  const skip = (page - 1) * limit;
  const products = await Product.findAndCountAll({
    attributes: { exclude: ['data', 'createdAt', 'updatedAt'] },
    offset: skip,
    limit
  });
  return products;
};

const listLight = async function (page, limit) {
  const skip = (page - 1) * limit;
  const products = await Product.findAndCountAll({
    attributes: ['id', 'title', 'store', 'categoryId'],
    offset: skip,
    limit
  });
  return products;
};

const listWhere = async function (where) {
  const products = await Product.findAll({
    where,
  });

  return products;
};

const listRandomIframesByStore = async function (page, limit, idsToExclude) {
  const products = await Product.findAll({
    attributes: ['id', 'iframeUrl'],
    where: {
      id: {
        [Op.not]: idsToExclude
      },
      iframeUrl: {
        [Op.not]: null
      }
    }
  });

  return products;
}

const listProductsByTitle = async function (page, limit, searchTerm) {
  const skip = (page - 1) * limit;
  const products = await Product.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    offset: skip,
    limit,
    where: {
      title: {
        [Op.like]: `%${searchTerm}%`
      }
    }
  });

  return products;
}

const listProductsByCategory = async function (page, limit, category) {
  const skip = (page - 1) * limit;
  const products = await Product.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    offset: skip,
    limit,
    where: {
      categoryId: {
        [Op.eq]: category
      }
    }
  });

  return products;
}

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
  listLight,
  listWhere,
  listRandomIframesByStore,
  listProductsByTitle,
  listProductsByCategory,
  find,
  findWhere,
  update,
  remove,
};
