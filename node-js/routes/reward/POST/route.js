const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../../database/db");
const { checkCompanyToken } = require("../../../middlewares/authMiddleware");

router.post("/rewards", checkCompanyToken, async (req, res) => {
	const rewardData = req.body; // Pobierz dane nagrody z ciała żądania
	try {
		const reward = await db.Reward.create({
			...rewardData,
			companyId: req.company.id,
		}); // Utwórz nagrode z przekazanych danych

		return res.status(200).json({
			status: "SUCCESS",
			reward: reward,
		});
	} catch (error) {
		return res.status(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
