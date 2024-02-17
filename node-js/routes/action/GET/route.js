const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkUserToken } = require("../../../middlewares/authMiddleware");

router.get("/actions", checkUserToken, async (req, res) => {
	try {
		const actions = await db.Action.findAll({
			where: { userId: req.user.id },
		});
		return res.status(200).json({
			status: "SUCCESS",
			actions: actions,
		});
	} catch (error) {
		return res.json(500).json({
			type: "ERROR",
			message: error.message,
		});
	}
});

module.exports = router;
