const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, optinalAuthenticateToken, checkRole } = require('../middleware/authMiddleware');


router.post('/register', authController.register);

router.post('/login', authController.login);

router.get("/protected", authController.getProtectedData);

router.get("/admin", checkRole(['Admin']), (req, res) => {
    res.json({ message: "Admin content only" });
});

router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Thông tin cá nhân',
        user: req.user, // Lấy từ middleware
    });
});

router.get('/check-login', authController.checkLogin);

router.post('/logout', authController.logout);

module.exports = router;