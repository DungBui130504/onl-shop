const express = require('express');
const sql = require('mssql');
const dbConfig = require('./database/dbConfig');
const api = require('./api/api.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Init server
const app = express();
const port = 3000;

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

//Listen server'sPORT
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}/api`);
});
