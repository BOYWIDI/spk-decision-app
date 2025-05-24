const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });
    try {
        const user = jwt.verify(token, 'rahasia');
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token tidak valid' });
    }
};

module.exports = authMiddleware;