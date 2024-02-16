const express = require("express");
const router = express.Router();

const db = require("../../../database/db");
const { checkUserToken } = require("../../../middlewares/authMiddleware");

// router.get("/cards", checkUserToken, async (req, res) => {
// 	try {
// 		const cards = await db.Card.findAll();
// 		res.status(200).json({
// 			status: "SUCCESS",
// 			cards: cards,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			type: "ERROR",
// 			message: error.message,
// 		});
// 	}
// });

module.exports = router;
