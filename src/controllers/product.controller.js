const productService = require("../services/product.service");
const { validationResult } = require("express-validator");
const createError = require("http-errors");
//const multer = require("multer");
require("dotenv").config();

const create = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    // if (req.files && req.files.length > 0) {
    //   const { files = [] } = req;
    //   req.body.images = files;
    // }

    const response = await productService.create(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, product: response });
  } catch (error) {
    return next(error);
  }
};

const list = async function (req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const response = await productService.list(page, limit);

    res.send({ success: true, products: response });
  } catch (error) {
    return next(error);
  }
};

const listLight = async function (req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const response = await productService.listLight(page, limit);

    res.send({ success: true, products: response });
  } catch (error) {
    return next(error);
  }
};

const listRandomIframesByStore = async function (req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { idsToExclude } = req.body || [];

    const response = await productService.listRandomIframesByStore(page, limit, idsToExclude);

    res.send({ success: true, products: response });
  } catch (error) {
    return next(error);
  }
};

const listProductsByTitle = async function (req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { title } = req.body || "";

    const response = await productService.listProductsByTitle(page, limit, title);

    res.send({ success: true, products: response });
  } catch (error) {
    return next(error);
  }
};

const listProductsByCategory = async function (req, res, next) {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const { categoryId } = req.body || "";

    const response = await productService.listProductsByCategory(page, limit, categoryId);

    res.send({ success: true, products: response });
  } catch (error) {
    return next(error);
  }
};

const find = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const responseProduct = await productService.find(req.params.id);

    if (responseProduct && responseProduct.message) {
      throw responseProduct;
    }

    res.send({
      success: true,
      product: responseProduct
    });
  } catch (error) {
    return next(error);
  }
};

const update = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    // if (req.files && req.files.length > 0) {
    //   const { files = [] } = req;
    //   req.body.images = files;
    // }

    const response = await productService.update(req.body, req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, product: response });
  } catch (error) {
    return next(error);
  }
};

const remove = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await productService.remove(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, product: response });
  } catch (error) {
    return next(error);
  }
};

//Local
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./resources/uploads");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// var uploadImage = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) => {
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/png"
//     ) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//       req.fileError = "Formato não válido";
//     }
//   },
// });

module.exports = {
  create,
  list,
  listLight,
  listRandomIframesByStore,
  listProductsByTitle,
  listProductsByCategory,
  find,
  update,
  remove,
  //uploadImage,
};
