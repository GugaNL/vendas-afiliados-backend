const categoryRepository = require("../repositories/category.repository");
require("dotenv").config();
const createError = require("http-errors");

const create = async function (category) {
  const categoryExists = await categoryRepository.findCategoryToValidate({
    name: category.name,
  });

  if (categoryExists) {
    return createError(409, "Categoria já existe");
  }

  const categoryCreated = await categoryRepository.create(category);
  return categoryCreated;
};

const listCategories = async function () {
  const categories = await categoryRepository.listCategories();
  return categories;
};

const findCategory = async function (id) {
  const category = await categoryRepository.findCategory(id);

  if (!category) {
    return createError(404, "Categoria não encontrada");
  }

  return category;
};

const updateCategory = async function (category, id) {
  const categoryExists = await categoryRepository.findCategory(id);

  if (!categoryExists) {
    return createError(404, "Categoria não existe");
  }

  await categoryRepository.updateCategory(category, id);

  return await categoryRepository.findCategory(id);
};

const deleteCategory = async function (id) {
  const category = await categoryRepository.findCategory(id);

  if (!category) {
    return createError(404, "Categoria não encontrada");
  }

  await categoryRepository.deleteCategory(id);

  return category;
};

module.exports = {
  create,
  listCategories,
  findCategory,
  updateCategory,
  deleteCategory,
};
