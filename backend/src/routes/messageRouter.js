const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { getMessagesByUser } = require('../services/messageService');
const { authenticateToken, optinalAuthenticateToken, checkRole } = require('../middleware/authMiddleware');


router.get('/history/:userId', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.status(400).send('Invalid userId');

    const messages = await getMessagesByUser(userId);
    res.json(messages);
});

router.get('/customers', authenticateToken, messageController.getCustomers);
router.get('/chat', authenticateToken, messageController.getChat);
router.post('/claim', authenticateToken, messageController.claim);

module.exports = router;