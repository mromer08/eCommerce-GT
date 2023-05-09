const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productsController");
const ROLES_LIST = require('../../config/roles_list');
const uploadImage = require("../../middleware/upload");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

// router.post("/", uploadImage, productController.createNewProduct);
router
  .route("/")
  .get(productController.getAllProducts)
  .post([verifyJWT, verifyRoles(ROLES_LIST.User), uploadImage], productController.createNewProduct)
  .put([verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Delivery), uploadImage], productController.updateProduct)
  .delete([verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], productController.deleteProduct);

  router.route("/:id").get(productController.getProduct);
  router.route("/user/:username").get(productController.getProductsByUser);
module.exports = router;
