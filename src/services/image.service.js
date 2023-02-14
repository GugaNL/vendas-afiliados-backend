const imageRepository = require("../repositories/image.repository");

const create = async function (images = [], productId) {
  const imagesCreated = await imageRepository.create(images, productId);
  return imagesCreated;
};

const listWhere = async function (id) {
  const imagesExists = await imageRepository.listWhere(id) || [];

  return imagesExists;
};

const updateByProduct = async function (images, productId) {
  const imageExists = await imageRepository.listWhere(productId);

  if (imageExists.length < 1) {
    return;
  }

  const imagesToRemove = imageExists.filter(im => {
    return !images.includes(im.path);
  }) || [];

  if (imagesToRemove.length > 0) {
    await imageRepository.removeByIds(imagesToRemove);
  }

  return await imageRepository.find(productId);
};

module.exports = {
  create,
  listWhere,
  updateByProduct
};
