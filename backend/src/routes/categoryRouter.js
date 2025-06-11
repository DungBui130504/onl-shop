const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { authenticateToken, optinalAuthenticateToken, checkRole } = require('../middleware/authMiddleware');
const { upload } = require("../middleware/multerMiddleware");

router.get('/categories', CategoryController.categories);

router.delete('/delCate/:id', authenticateToken, checkRole(["Admin"]), CategoryController.delCategory);

router.post('/addCate', CategoryController.addCategory);


module.exports = router;