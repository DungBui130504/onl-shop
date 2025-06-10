const PayOS = require('@payos/node');
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const api_key = process.env.API_KEY;
const checksum_key = process.env.CHECKSUM_KEY;

// console.log("CLIENT_ID:", process.env.CLIENT_ID);
// console.log("API_KEY:", process.env.API_KEY);
// console.log("CHECKSUM_KEY:", process.env.CHECKSUM_KEY);

function initPayOS() {
    const payos = new PayOS(client_id, api_key, checksum_key);

    return payos;
}

module.exports = initPayOS;