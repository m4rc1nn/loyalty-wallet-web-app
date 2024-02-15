const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const { checkToken } = require("../../../middlewares/authMiddleware");

router.get("/users", async (req, res) => {
    try {
        const users = await db.User.findAll();
        return res.status(200).json({
            status: "SUCCESS",
            users: users,
        });
    } catch (error) {
        res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.User.findOne({
            include: [
                {
                    model: db.Card,
                    as: "cards",
                },
            ],
            where: { id: id },
        });
        return res.status(200).json({
            status: "SUCCESS",
            user: user,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

router.get("/users/:id/cards", checkToken, async (req, res) => {
    const { id } = req.params;
    try {
        const cards = await db.Card.findAll({
            where: [
                {
                    userId: id,
                },
            ],
        });
        res.status(200).json({
            status: "SUCCESS",
            cards: cards,
        });
        return res.status(200).json({
            status: "SUCCESS",
            user: user,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
