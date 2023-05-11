const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.Delivery, ROLES_LIST.User),
    orderController.getAllOrders
  )
  .put(verifyRoles(ROLES_LIST.Delivery), orderController.updateOrder);

  router.route("/user").get(verifyRoles(ROLES_LIST.User), orderController.getOrdersByUser);

module.exports = router;
