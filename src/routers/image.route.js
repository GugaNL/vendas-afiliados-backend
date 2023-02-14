const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");
const { verifyJWT } = require("../middlewares/authorizator");

router.post("/:id", verifyJWT, imageController.updateRemovedImages);

module.exports = router;
