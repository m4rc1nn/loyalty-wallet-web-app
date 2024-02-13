const express = require("express");
const router = express.Router();

const db = require("../../../database/db");

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
        const user = await db.User.findOne({ include: [{
            model: db.Card,
            as: 'cards'
        }], where: { id: id } });
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
