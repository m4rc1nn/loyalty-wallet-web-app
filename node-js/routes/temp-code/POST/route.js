const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const { checkToken } = require("../../../middlewares/authMiddleware");

router.post("/temp-code", checkToken, async (req, res) => {
    try {
        const tempCode = await db.TempCode.create(req.user.id);
        return res.status(200).json({
            status: "SUCCESS",
            tempCode: tempCode,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
