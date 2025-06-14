const messageModel = require('../model/messageModel');

exports.getCustomers = async (req, res) => {
    try {
        const customers = await messageModel.getCustomersWithMessages();
        res.json(customers);
    } catch (err) {
        console.error("❌ getCustomers error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getChat = async (req, res) => {
    const customerId = parseInt(req.query.customerId);
    const staffId = parseInt(req.query.staffId);

    // console.log({ customerId, staffId });

    if (isNaN(customerId) || isNaN(staffId)) {
        return res.status(400).json({ error: 'Invalid customerId or staffId' });
    }

    try {
        const messages = await messageModel.getChatWithCustomer(customerId, staffId);
        res.json(messages);
    } catch (err) {
        console.error("❌ getChat error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.claim = async (req, res) => {
    const { staffId, customerId } = req.body;
    try {
        await messageModel.claimMessages(staffId, customerId);
        res.json({ message: 'Messages claimed successfully' });
    } catch (err) {
        console.error("❌ claimMessages error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};