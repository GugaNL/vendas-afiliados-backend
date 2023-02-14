const { Category } = require("../database/models/index");

const create = async function (category) {
  const categoryCreated = await Category.create(category);
  return categoryCreated;
};

const listCategories = async function () {
  const categories = await Category.findAll();
  return categories;
};

const findCategory = async function (id) {
  const category = await Category.findByPk(id);
  return category;
};

const findCategoryToValidate = async function (where) {
  const category = await Category.findOne({
    where,
  });

  return category;
};

const updateCategory = async function (category, id) {
  await Category.update(category, {
    where: {
      id,
    },
  });
};

const deleteCategory = async function (id) {
  return await Category.destroy({ where: { id } });
};

module.exports = {
  create,
  listCategories,
  findCategory,
  findCategoryToValidate,
  updateCategory,
  deleteCategory
};
