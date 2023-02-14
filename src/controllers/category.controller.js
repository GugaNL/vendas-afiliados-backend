const categoryService = require("../services/category.service");
const { validationResult } = require("express-validator");
const createError = require("http-errors");

const create = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await categoryService.create(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, category: response });
  } catch (error) {
    return next(error);
  }
};


const listCategories = async function (req, res, next) {
  try {
    const response = await categoryService.listCategories(req.body);

    res.send({ success: true, categories: response });
  } catch (error) {
    return next(error);
  }
};

const findCategory = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await categoryService.findCategory(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, category: response });
  } catch (error) {
    return next(error);
  }
};

const updateCategory = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await categoryService.updateCategory(
      {
        name: req.body.name,
      },
      req.params.id
    );

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, category: response });
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await categoryService.deleteCategory(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, category: response });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  listCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
