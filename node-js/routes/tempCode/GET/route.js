const express = require("express");
const router = express.Router();

const db = require("../../../database/db");

router.get("/temp-code/:code", async (req, res) => {
    const { code } = req.params;
    try {
        const tempCode = await db.TempCode.findOne({ where: { code: code } });
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
