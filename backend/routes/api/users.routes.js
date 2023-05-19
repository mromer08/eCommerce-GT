const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(verifyRoles(ROLES_LIST.Admin), usersController.createNewUser)
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)
  .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
