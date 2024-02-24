const express = require("express");
const router = express.Router();

const { checkUserToken, checkCompanyToken } = require("../../../middlewares/authMiddleware");

router.get("/auth/user/verify", checkUserToken, async (req, res) => {
    try {
        return res.status(200).json({
            type: "SUCCESS",
            user: req.user,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

router.get("/auth/company/verify", checkCompanyToken, async (req, res) => {
    try {
        return res.status(200).json({
            type: "SUCCESS",
            company: req.company,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
