const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const { checkCompanyToken } = require("../../../middlewares/authMiddleware");

router.post("/actions", checkCompanyToken, async (req, res) => {
	const actionData = req.body; // Pobierz dane akcji z ciała żądania
	try {
		const action = await db.Reward.create({
			...actionData,
			companyId: req.company.id,
		}); // Utwórz akcje z przekazanych danych

		return res.status(200).json({
			status: "SUCCESS",
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
