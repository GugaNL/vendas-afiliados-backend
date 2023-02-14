const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const createError = require("http-errors");

const create = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await userService.create(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, user: response });
  } catch (error) {
    return next(error);
  }
};

const login = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await userService.login(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, data: response });
  } catch (error) {
    return next(error);
  }
};

const listUsers = async function (req, res, next) {
  try {
    const response = await userService.listUsers(req.body);

    res.send({ success: true, users: response });
  } catch (error) {
    return next(error);
  }
};

const findUser = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await userService.findUser(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, user: response });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await userService.updateUser(
      {
        password: req.body.password,
      },
      req.params.id
    );

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, user: response });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await userService.deleteUser(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({ success: true, user: response });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  create,
  login,
  listUsers,
  findUser,
  updateUser,
  deleteUser,
};
