const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/authorizator");
const userValidator = require("../validators/user.validator");

router.post("/novo", userValidator.create(), userController.create);
router.post("/login", userValidator.login(), userController.login);
router.get("/lista", verifyJWT, userController.listUsers);
router.get("/:id", verifyJWT, userValidator.findById(), userController.findUser);
router.put("/:id", userValidator.updateUser(), userController.updateUser);
router.delete("/:id", verifyJWT, userValidator.deleteUser(), userController.deleteUser);


module.exports = router;
