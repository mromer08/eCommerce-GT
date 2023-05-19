const express = require("express");
const router = express.Router();
const reportsController = require("../../controllers/reportsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.get("/products-count",verifyRoles(ROLES_LIST.Admin), reportsController.getCountProducts);
router.post("/orders-count",verifyRoles(ROLES_LIST.Admin), reportsController.getTopCustomers);
router.post("/sales-count",verifyRoles(ROLES_LIST.Admin), reportsController.getTopSoldProducts);
router.post("/profits-count",verifyRoles(ROLES_LIST.Admin), reportsController.getTopCustomersByProfit);
router.post("/customers-count",verifyRoles(ROLES_LIST.Admin), reportsController.getTopCustomersByProductSold);
module.exports = router;
