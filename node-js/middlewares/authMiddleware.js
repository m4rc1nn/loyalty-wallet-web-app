const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports.checkToken = async () => {
    const token = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "ERROR", message: "Authorization fail." });
        }

        req.user = decoded.user;
        next();
    });
};
