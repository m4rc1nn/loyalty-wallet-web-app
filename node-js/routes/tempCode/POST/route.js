const express = require("express");
const router = express.Router();

const db = require("../../../database/db");

router.post("/temp-code", async (req, res) => {
    const { data } = req.body;
    try {
        const tempCode = await db.TempCode.create({ data });
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
