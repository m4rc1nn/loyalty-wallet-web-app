const jwt = require("jsonwebtoken");
const { db } = require("../database/db");

require("dotenv").config();

module.exports.checkUserToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ type: "ERROR", message: "User authorization fail." });
    }
    if (!req.headers.authorization.split(" ")[1]) {
        return res.status(401).json({ type: "ERROR", message: "User authorization fail." });
    }
    const token = req.headers.authorization.split(" ")[1];

    const isExists = await db.LogoutToken.findOne({
        where: {
            token: token,
        },
    });

    if (isExists) {
        return res.status(401).json({
            type: "ERROR",
            message: "Token is invalid for user.",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ type: "ERROR", message: "User authorization fail." });
        }

        if (!decoded.user) {
            return res.status(401).json({
                type: "ERROR",
                message: "Token is invalid for user.",
            });
        }

        req.user = decoded.user;
        req.token = token;
        return next();
    });
};

module.exports.checkCompanyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ type: "ERROR", message: "Company authorization fail. 1" });
    }
    if (!req.headers.authorization.split(" ")[1]) {
        return res.status(401).json({ type: "ERROR", message: "Company authorization fail. 2" });
    }
    const token = req.headers.authorization.split(" ")[1];

    const isExists = await db.LogoutToken.findOne({
        where: {
            token: token,
        },
    });

    if (isExists) {
        return res.status(401).json({
            type: "ERROR",
            message: "Company authorization fail. 3",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                type: "ERROR",
                message: "Company authorization fail . 4",
            });
        }

        if (!decoded.company) {
            return res.status(401).json({
                type: "ERROR",
                message: "Token is invalid for company.",
            });
        }

        req.company = decoded.company;
        req.token = token;
        return next();
    });
};

module.exports.checkAdminToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                type: "ERROR",
                message: "Admin authorization fail.",
            });
        }

        if (!decoded.admin) {
            return res.status(401).json({
                type: "ERROR",
                message: "Token is invalid for admin.",
            });
        }

        req.admin = decoded.admin;
        return next();
    });
};
