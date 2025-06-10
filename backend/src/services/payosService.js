const initPayOS = require("../serverPayOS/PayOSInstance");

async function createPaymentLink(orderCode, amount, description, cancelUrl, returnUrl) {

    const payos = initPayOS();

    const order = {
        amount: amount || 0,
        description: description || "Không có mô tả",
        orderCode: Date.now(),
        returnUrl: returnUrl,
        cancelUrl: cancelUrl
    }

    const paymentLink = await payos.createPaymentLink(order);
    return paymentLink;
}

module.exports = {
    createPaymentLink
};