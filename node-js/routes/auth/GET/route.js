const express = require("express");
const router = express.Router();

const { checkToken } = require("../../../middlewares/authMiddleware");

const db = require("../../../database/db");

router.get("/auth/verify", checkToken, async (req, res) => {
    try {
        return res.status(200).json({
            status: "SUCCESS",
            user: req.user,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
