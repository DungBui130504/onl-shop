const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware.js');
const { upload } = require("../middleware/multerMiddleware");

router.get('/users', userController.getAllUsers);

router.get('/user', authenticateToken, userController.getUser);

router.delete('/delUser', authenticateToken, userController.delUser);

router.post('/changeUserInfor', authenticateToken, userController.changeInfor);

router.post('/changeAccountInfor', authenticateToken, userController.changeAccountInfor);

router.post('/changeAddress', authenticateToken, userController.changeAddress);

router.get('/staffs', authenticateToken, checkRole(["Admin"]), userController.getStaffInfor);

router.delete('/delStaff/:id', authenticateToken, checkRole(["Admin"]), userController.delStaff);

router.post('/addStaff', authenticateToken, checkRole(["Admin"]), upload.single('file'), userController.addStaff);


module.exports = router;
