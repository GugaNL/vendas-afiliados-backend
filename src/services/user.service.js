const userRepository = require("../repositories/user.repository");
require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require('bcryptjs')
const { sign } = require("jsonwebtoken");

const create = async function (user) {
  const userExists = await userRepository.findUserToValidate({
    login: user.login,
  });

  if (userExists) {
    return createError(409, "Usuário já existe");
  }

  user.password = await bcrypt.hashSync(user.password, ~~process.env.SALT);
  const userCreated = await userRepository.create(user);
  return userCreated;
};

const listUsers = async function () {
  const users = await userRepository.listUsers();
  return users;
};

const findUser = async function (id) {
  const user = await userRepository.findUser(id);

  if (!user) {
    return createError(404, "Usuário não encontrado");
  }

  return user;
};

const updateUser = async function (user, id) {
  const userExists = await userRepository.findUser(id);

  if (!userExists) {
    return createError(404, "Usuário não existe");
  }

  await userRepository.updateUser(user, id);

  return await userRepository.findUser(id);
};

const deleteUser = async function (id) {
  const user = await userRepository.findUser(id);

  if (!user) {
    return createError(404, "Usuário não encontrado");
  }

  await userRepository.deleteUser(id);

  return user;
};

const login = async function (user) {
  const userLogin = await userRepository.findUserToValidate({
    login: user.login,
  });

  if (!userLogin) {
    return createError(401, "Usuário inválido");
  }

  const comparePassword = await bcrypt.compareSync(user.password, userLogin.password);

  if (!comparePassword) {
    return createError(401, "Usuário inválido");
  }

  const token = sign(
    {
      id: userLogin.id,
    },
    process.env.SECRET,
    {
      expiresIn: "5h",
    }
  );

  delete userLogin.password;

  return {
    auth: true,
    user: userLogin,
    token
  };
};

module.exports = {
  create,
  login,
  listUsers,
  findUser,
  updateUser,
  deleteUser,
};
