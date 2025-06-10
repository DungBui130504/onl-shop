const PayOS = require('@payos/node');
require('dotenv').config();

console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("API_KEY:", process.env.API_KEY);
console.log("CHECKSUM_KEY:", process.env.CHECKSUM_KEY);


const payos = new PayOS(
    process.env.CLIENT_ID,
    process.env.API_KEY,
    process.env.CHECKSUM_KEY
);

async function test() {
    try {
        const paymentLink = await payos.createPaymentLink({
            orderCode: 10,
            amount: 100000,
            description: "Test thanh toán",
            returnUrl: "http://localhost:5173/home",
            cancelUrl: "http://localhost:5173/home"
        });

        console.log('✅ Link thanh toán:', paymentLink.checkoutUrl);
    } catch (err) {
        console.error('❌ Lỗi:', err.message);
        console.log(err);
    }
}

test();