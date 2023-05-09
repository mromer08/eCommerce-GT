const express = require("express");
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");
const categoriesController = require("../../controllers/categoriesController");

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post([verifyJWT, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin)], categoriesController.createNewCategory);

module.exports = router;
