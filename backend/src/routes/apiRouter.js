const express = require('express');
const userRouter = require('../routes/userRouter');
const checkPassword = require('../middleware/checkValidPassword');

function initUserRoute(app) {
    app.use('/user', checkPassword, userRouter);
}

function initRoutes() {
    const router = express.Router();

    initUserRoute(router);
}

module.exports = initRoutes;