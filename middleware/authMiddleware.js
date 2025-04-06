const jwt = require("jsonwebtoken");

// authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);       

        req.user = decodeToken;

        next();
    } catch (error) {
        res.status(401).json({ message: error });
    }
};

module.exports = authenticateToken