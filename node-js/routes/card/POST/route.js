const express = require("express");
const router = express.Router();

const {
	checkUserToken,
	checkCompanyToken,
} = require("../../../middlewares/authMiddleware");

const { db } = require("../../../database/db");

// Endpoint do tworzenia karty dla użytkownika i firmy
router.post("/cards", checkCompanyToken, async (req, res) => {
	try {
		// Sprawdzamy, czy istnieje użytkownik o podanym ID
		const user = await db.User.findByPk(req.body.userId);
		if (!user) {
			return res.status(404).json({
				status: "ERROR",
				message: "Użytkownik nie znaleziony",
			});
		}

		// Sprawdzamy, czy istnieje firma o podanym ID
		const company = await db.Company.findByPk(req.company.id);
		if (!company) {
			return res
				.status(404)
				.json({ status: "ERROR", message: "Firma nie znaleziona" });
		}

		// Tworzymy nową kartę
		const newCard = await db.Card.create({
			userId: req.body.userId,
			companyId: req.company.id,
		});

		return res.status(201).json({ status: "SUCCESS", card: newCard });
	} catch (error) {
		console.error("Błąd podczas tworzenia karty:", error);
		return res
			.status(500)
			.json({ status: "ERROR", message: error.message });
	}
});

module.exports = router;
