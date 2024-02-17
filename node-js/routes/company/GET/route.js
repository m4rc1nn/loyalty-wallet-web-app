const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkCompanyToken } = require("../../../middlewares/authMiddleware");

router.get("/company/cards", checkCompanyToken, async (req, res) => {
	try {
		const cards = await db.Card.findAll({
			where: { companyId: req.company.id },
			include: ["user"], // Assuming you want company details as well
		});

		// For each card, calculate points
		const cardsWithPoints = await Promise.all(
			cards.map(async (card) => {
				const actions = await db.Action.findAll({
					where: {
						userId: card.userId,
						companyId: req.company.id,
					},
				});

				const points = actions.reduce((acc, action) => {
					return action.type === "ADD"
						? acc + action.amount
						: acc - action.amount;
				}, 0);

				return { ...card.toJSON(), points };
			})
		);

		// Respond with cards and their calculated points
		return res
			.status(200)
			.json({ type: "SUCCESS", cards: cardsWithPoints });
	} catch (error) {
		return res.status(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
