const express = require("express");
const router = express.Router();

const db = require('../../../database/db');

router.get("/cards", async (req, res) => {
    const cards = await db.Card.findAll();
    res.status(200).json({
        status: "SUCCESS",
        cards: cards
    })
})

module.exports = router;