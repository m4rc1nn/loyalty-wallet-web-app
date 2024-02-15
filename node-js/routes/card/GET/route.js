const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const { checkToken } = require("../../../middlewares/authMiddleware");

router.get("/cards", checkToken, async (req, res) => {
    try {
        const cards = await db.Card.findAll();
        res.status(200).json({
            status: "SUCCESS",
            cards: cards,
        });
    } catch (error) {}
});

module.exports = router;
