const { verifyAccessToken } = require('../util/jwtUtil');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.atn;

    if (!token) {
        return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded; // Lưu thông tin user vào request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
}

function optinalAuthenticateToken(req, res, next) {
    const token = req.cookies.atn;

    if (!token) {
        return next();
    }
    else {
        try {
            const decoded = verifyAccessToken(token);
            req.user = decoded; // Lưu thông tin user vào request
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }
    }
}

function checkRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { authenticateToken, optinalAuthenticateToken, checkRole };
