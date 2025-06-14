const express = require("express");
const userRouter = require('../src/routes/userRouter.js');
const authRouter = require('../src/routes/authRouter.js');
const productRouter = require('../src/routes/productRouter.js');
const categoryRouter = require('../src/routes/categoryRouter.js');
const cartRouter = require('../src/routes/cartRouter.js');
const payRouter = require('./routes/payRouter.js');
const messageRouter = require('./routes/messageRouter.js');
const { authenticateToken } = require('../src/middleware/authMiddleware.js');

function initRoutes(router) {
    router.use('/cart', authenticateToken, cartRouter);

    router.use('/category', categoryRouter);

    router.use('/product', productRouter);

    router.use('/user', userRouter);

    router.use('/auth', authRouter);

    router.use('/pay', authenticateToken, payRouter);

    router.use('/mess', messageRouter);
}

module.exports = initRoutes;