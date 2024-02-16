const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const {
	checkUserToken,
	checkAdminToken,
} = require("../../../middlewares/authMiddleware");

router.get("/users", checkAdminToken, async (req, res) => {
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

router.get("/users/:id", checkAdminToken, async (req, res) => {
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

router.get("/users/:id/cards", checkUserToken, async (req, res) => {
	const { id } = req.params;
	try {
		if (req.user.id !== id) {
			return res
				.json(401)
				.json({ status: "ERROR", message: "User authorization fail." });
		}
		const cards = await db.Card.findAll({
			where: [
				{
					userId: id,
				},
			],
		});
		return res.status(200).json({
			status: "SUCCESS",
			cards: cards,
		});
	} catch (error) {
		return res.json(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
