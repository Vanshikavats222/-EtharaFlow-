const jwt = require('jsonwebtoken');

// Token verify karne ke liye
const protect = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

// Admin role check karne ke liye
const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
        }
        next();
    };
};

module.exports = { protect, authorize };