const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

router.get('/categories', CategoryController.categories);

module.exports = router;