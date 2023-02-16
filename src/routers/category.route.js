const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const { verifyJWT } = require("../middlewares/authorizator");

router.post("/novo", CategoryController.create);
router.get("/lista", CategoryController.listCategories);
router.get("/:id", CategoryController.findCategory);
router.get("/busca/:numero",  CategoryController.findCategory);
router.put("/:id", verifyJWT, CategoryController.updateCategory);
router.delete("/:id", verifyJWT, CategoryController.deleteCategory);


module.exports = router;

