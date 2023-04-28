const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productsController");
// const verifyRoles = require('../../middleware/verifyRoles');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images"),
  filename: (req, file, cb) => {
    cb(null, Date.now()-file.originalname);
  },
});
const uploadImage = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("image");

router.post("/", uploadImage, productController.createNewProduct);

module.exports = router;
