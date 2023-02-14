const { Image } = require("../database/models/index");
const fs = require("fs");

const create = async function (imagens = [], productId = 0) {
  if (imagens.length > 0) {
    for (let i = 0; i < imagens.length; i++) {
      await Image.create({
        //filename: imagens[i]?.filename,
        filename: imagens[i]?.key,
        mimetype: imagens[i]?.mimetype,
        path: imagens[i]?.location,
        //path: imagens[i]?.path,
        productId,
      });
    }
  }

  return true;
};

const listWhere = async function (productId) {
  const imagens = await Image.findAll({
    where: {
      productId,
    },
  });

  return imagens;
};

const find = async function (id) {
  const image = await Image.findByPk(id);
  return image;
};

const update = async function (imagens, id) {
  await Image.update(imagens, {
    where: {
      id,
    },
  });
};

const updateByProduct = async function (imagens, productId) {
  await Image.update(imagens, {
    where: {
      productId,
    },
  });
};

const removeByProduct = async function (productId) {
  return await Image.destroy({ where: { productId } });
};

const removeByIds = async function (imagesToRemove) {
  for (let i = 0; i < imagesToRemove.length; i++) {
    await Image.destroy({ where: { id: imagesToRemove[i]?.id } });

    const filePath = imagesToRemove[i]?.path.replace(/\\/g, "/");
    fs.unlink(filePath, (err) => {
      if (err) {
        return;
      }
    });
  }

  return true;
};

module.exports = {
  create,
  listWhere,
  find,
  update,
  updateByProduct,
  removeByProduct,
  removeByIds,
};
