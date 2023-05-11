const express = require("express");
const router = express.Router();
const saleController = require("../../controllers/saleController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.User), saleController.createNewSale)
  .get(verifyRoles(ROLES_LIST.User), saleController.getAllSales);
//   .delete(verifyRoles(ROLES_LIST.User), saleController.deleteCreditCard);
// .put(verifyRoles(ROLES_LIST.User), saleController.updateUser)

module.exports = router;
