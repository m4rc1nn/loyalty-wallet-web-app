const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");

router.get("/temp-code/:code", async (req, res) => {
	const { code } = req.params;
	const now = new Date();
	try {
		const tempCode = await db.TempCode.findOne({
			where: {
				code: code,
				expires: {
					[db.Sequelize.Op.gt]: now, // Używa operatora większości (greater than) do sprawdzenia, czy expires jest większe niż bieżąca data i czas
				},
			},
		});

		if (!tempCode) {
			return res.status(404).json({
				type: "ERROR",
				message: "Code not found or has expired",
			});
		}

		return res.status(200).json({
			status: "SUCCESS",
			tempCode: tempCode,
		});
	} catch (error) {
		return res.status(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
