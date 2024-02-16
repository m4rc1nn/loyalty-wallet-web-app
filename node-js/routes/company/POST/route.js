const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../../database/db");

router.post("/company", async (req, res) => {
	const companyData = req.body; // Pobierz dane firmy z ciała żądania
	try {
		const company = await db.Company.create(companyData); // Utwórz firme z przekazanych danych

		return res.status(200).json({
			status: "SUCCESS",
			company: company,
		});
	} catch (error) {
		return res.status(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
