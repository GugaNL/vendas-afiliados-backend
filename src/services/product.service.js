const productRepository = require("../repositories/product.repository");
const imageRepository = require("../repositories/image.repository");
require("dotenv").config();
const createError = require("http-errors");
const fs = require("fs");

const create = async function (product) {

  const arrayImages = product.images || [];

  product.mainImage = arrayImages.length > 0 ? arrayImages[0]?.location : "";

  const productCreated = await productRepository.create(product, arrayImages);
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

  const imagesUrls = await imageRepository.listWhere(id);

  if (imagesUrls && imagesUrls.length > 0) {
    product.mainImage = imagesUrls[0]?.path || "";
  } else {
    product.mainImage = "";
  }

  await productRepository.update(product, id);

  return await productRepository.find(id);
};

const remove = async function (id) {
  const product = await productRepository.find(id);

  if (!product) {
    return createError(404, "Produto não encontrado");
  }

  const imagesToRemove = await imageRepository.listWhere(id);

  if (imagesToRemove && imagesToRemove.length > 0) {
    for (let i = 0; i < imagesToRemove.length; i++) {
      const filePath = imagesToRemove[i]?.path.replace(/\\/g, "/");
      fs.unlink(filePath, (err) => {
        if (err) {
          return;
        }
      });
    }
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
