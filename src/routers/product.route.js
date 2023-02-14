const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyJWT } = require("../middlewares/authorizator");
const userValidator = require("../validators/user.validator");

router.post("/novo", productController.uploadImage.array('productImage', 10), productController.create);
router.get("/lista", productController.list);
router.get("/:id", userValidator.findById(), productController.find);
router.put("/:id", verifyJWT, productController.uploadImage.array('productImage', 10), productController.update);
router.delete("/:id", verifyJWT, productController.remove);


module.exports = router;
