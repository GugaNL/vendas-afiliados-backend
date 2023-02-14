const { User } = require("../database/models/index");

const create = async function (user) {
  const userCreated = await User.create(user);
  return userCreated;
};

const listUsers = async function () {
  const users = await User.findAll();
  return users;
};

const findUser = async function (id) {
  const user = await User.findByPk(id);
  return user;
};

const findUserToValidate = async function (where) {
  const user = await User.findOne({
    where,
  });

  return user;
};

const updateUser = async function (user, id) {
  await User.update(user, {
    where: {
      id,
    },
  });
};

const deleteUser = async function (id) {
  return await User.destroy({ where: { id } });
};

module.exports = {
  create,
  listUsers,
  findUser,
  findUserToValidate,
  updateUser,
  deleteUser
};
