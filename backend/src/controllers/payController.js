const payosService = require("../services/payosService");

exports.pay = async (req, res) => {
    try {
        console.log('Payment infor: ', req.body);

        const { orderCode, amount, description, cancelUrl, returnUrl } = req.body;

        const result = await payosService.createPaymentLink(orderCode, amount, description, cancelUrl, returnUrl);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
