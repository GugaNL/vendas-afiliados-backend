const productRepository = require("../repositories/product.repository");
const categoryRepository = require("../repositories/category.repository");
require("dotenv").config();
const createError = require("http-errors");
const fs = require("fs");

const create = async function (product) {
  const categoryExists = await categoryRepository.findCategory(
    product.categoryId
  );

  if (!categoryExists) {
    return createError(409, "Categoria não encontrada");
  }

  const arrayImages = product.images || [];

  if (arrayImages.length > 0) {
    product.imageFilename = arrayImages[0]?.filename;
    product.imagePath = arrayImages[0]?.path;
    product.imageMimetype = arrayImages[0]?.mimetype;
  }

  const productCreated = await productRepository.create(product);
  return productCreated;
};

const list = async function () {
  const products = await productRepository.list();
  return products;
};

const listWhere = async function (id, where) {
  const productExists = await productRepository.find(id);

  if (!productExists) {
    return createError(409, "Produto não encontrado");
  }

  const products = await productRepository.listWhere(where);
  return products;
};

const find = async function (id) {
  const product = await productRepository.find(id);

  if (!product) {
    return createError(404, "Produto não encontrado");
  }

  return product;
};

const update = async function (product, id) {
  const productExists = await productRepository.find(id);

  if (!productExists) {
    return createError(404, "Produto não encontrado");
  }

  const arrayImages = product.images || [];

  if (arrayImages.length > 0) {
    const productWithImage = await productRepository.find(id);

    if (productWithImage.imagePath) {
      const filePath = productWithImage.imagePath.replace(/\\/g, "/");
      fs.unlink(filePath, (err) => {
        if (err) {
          return;
        }
      });
    }

    product.imageFilename = arrayImages[0]?.filename;
    product.imagePath = arrayImages[0]?.path;
    product.imageMimetype = arrayImages[0]?.mimetype;
  }

  await productRepository.update(product, id);

  return await productRepository.find(id);
};

const remove = async function (id) {
  const product = await productRepository.find(id);

  if (!product) {
    return createError(404, "Produto não encontrado");
  }

  if (product.imagePath) {
    const filePath = product.imagePath.replace(/\\/g, "/");
    fs.unlink(filePath, (err) => {
      if (err) {
        return;
      }
    });
  }

  await productRepository.remove(id);

  return product;
};

module.exports = {
  create,
  list,
  listWhere,
  find,
  update,
  remove,
};
