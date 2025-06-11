const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authenticateToken, optinalAuthenticateToken, checkRole } = require('../middleware/authMiddleware');
const { upload } = require("../middleware/multerMiddleware");

router.get('/products', optinalAuthenticateToken, ProductController.products);

router.delete('/delProduct/:id', authenticateToken, checkRole(["Admin"]), ProductController.delProduct);

router.post('/addProduct', authenticateToken, checkRole(["Admin"]), upload.single('file'), ProductController.addProduct);

router.get('/productsByCategory', ProductController.productsOfCategory);

router.put('/favProduct', authenticateToken, ProductController.setFav);

router.put('/resetFavProduct', authenticateToken, ProductController.resetFav);

router.get("/favProducts", authenticateToken, ProductController.getFavProduct);

module.exports = router;