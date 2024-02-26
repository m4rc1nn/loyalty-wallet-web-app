const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkUserToken } = require("../../../middlewares/authMiddleware");

router.get("/cards", checkUserToken, async (req, res) => {
	try {
		const cards = await db.Card.findAll({
			where: { userId: req.user.id },
			include: [
				{
					model: db.Company,
					as: "company", // Ensure this matches the alias used in your association definition
					attributes: {
						exclude: [
							"password",
							"email",
							"isActive",
							"createdAt",
							"updatedAt",
						],
					}, // Exclude specific fields
				},
			],
		});

		// For each card, calculate points
		const cardsWithPoints = await Promise.all(
			cards.map(async (card) => {
				const actions = await db.Action.findAll({
					where: {
						cardId: card.id,
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
