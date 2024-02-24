const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkCompanyToken } = require("../../../middlewares/authMiddleware");

router.post("/actions", checkCompanyToken, async (req, res) => {
    const actionData = req.body; // Pobierz dane akcji z ciała żądania
    try {
        let userCard = await db.Card.findOne({
            where: {
                companyId: req.company.id,
                userId: actionData.userId,
            },
        });

        if (!userCard) {
            userCard = await db.Card.create({
                companyId: req.company.id,
                userId: actionData.userId,
            });
        }

        const action = await db.Action.create({
            ...actionData,
            companyId: req.company.id,
            cardId: userCard.id,
        }); // Utwórz akcje z przekazanych danych

        return res.status(200).json({
            type: "SUCCESS",
            action: action,
        });
    } catch (error) {
        return res.status(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
