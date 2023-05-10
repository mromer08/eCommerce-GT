const express = require("express");
const router = express.Router();
const creditCardController = require("../../controllers/creditCardController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.User), creditCardController.createNewCreditCard)
  .get(verifyRoles(ROLES_LIST.User), creditCardController.getAllCreditCards)
  .delete(verifyRoles(ROLES_LIST.User), creditCardController.deleteCreditCard);
  // .put(verifyRoles(ROLES_LIST.User), creditCardController.updateUser)

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.User), creditCardController.getCreditCard);

module.exports = router;
