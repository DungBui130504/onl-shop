const express = require('express');
const sql = require('mssql');
const dbConfig = require('./database/dbConfig');
const api = require('./api/api.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const setupSocket = require('../src/middleware/socketIOMiddleware.js');

//Init server
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

//Init middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // domain của client
    credentials: true // cho phép gửi cookie
}));
app.use(bodyParser.json());
app.use(cookieParser());

//Import api
app.use('/api', api);

setupSocket(io);

//Listen server'sPORT
server.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}/api`);
});


