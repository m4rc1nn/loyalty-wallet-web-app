const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkUserToken, checkAdminToken } = require("../../../middlewares/authMiddleware");

router.get("/users", checkAdminToken, async (req, res) => {
    try {
        const users = await db.User.findAll();
        return res.status(200).json({
            type: "SUCCESS",
            users: users,
        });
    } catch (error) {
        res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

router.get("/user", checkUserToken, async (req, res) => {
    const { id } = req.user;
    try {
        const user = await db.User.findOne({
            include: [
                {
                    model: db.Card,
                    as: "cards",
                    include: [
                        {
                            model: db.Action,
                            as: "actions", // Assuming the association is defined in your models
                        },
                    ],
                },
            ],
            where: { id: id },
        });

        // Modify the user object to include points for each card
        const modifiedUser = user.toJSON(); // Convert Sequelize model instance to JSON
        modifiedUser.cards = await Promise.all(
            modifiedUser.cards.map(async (card) => {
                const points = card.actions.reduce((acc, action) => {
                    return action.type === "ADD" ? acc + action.amount : acc - action.amount;
                }, 0);

                delete card.actions; // Optional: Remove actions from the response if not needed
                return { ...card, points };
            })
        );

        return res.status(200).json({
            type: "SUCCESS",
            user: modifiedUser,
        });
    } catch (error) {
        return res.status(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
