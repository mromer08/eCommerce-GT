const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productsController");
const ROLES_LIST = require('../../config/roles_list');
const uploadImage = require("../../middleware/upload");
const verifyRoles = require("../../middleware/verifyRoles");

// router.post("/", uploadImage, productController.createNewProduct);
router
  .route("/")
  .get(productController.getAllProducts)
  .post([verifyRoles(ROLES_LIST.User), uploadImage], productController.createNewProduct)
  .put([verifyRoles(ROLES_LIST.User), uploadImage], productController.updateProduct)
  .delete(verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), productController.deleteProduct);

router.route("/:id").get(productController.getProduct);
module.exports = router;
