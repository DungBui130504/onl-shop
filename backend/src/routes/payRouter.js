const express = require('express');
const router = express.Router();
const payController = require("../controllers/payController");

router.post('/create-payment', payController.pay);

module.exports = router;