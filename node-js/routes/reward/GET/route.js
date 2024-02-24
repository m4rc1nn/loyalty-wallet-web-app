const express = require("express");
const router = express.Router();

const { db } = require("../../../database/db");
const { checkUserToken } = require("../../../middlewares/authMiddleware");

router.get("/company/:companyId/rewards", async (req, res) => {
    const { companyId } = req.params;
    try {
        const rewards = await db.Reward.findAll({
            where: { companyId: companyId },
        });
        return res.status(200).json({
            type: "SUCCESS",
            rewards: rewards,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

router.get("/company/:companyId/rewards/:rewardId", async (req, res) => {
    const { companyId, rewardId } = req.params;
    try {
        const reward = await db.Reward.findOne({
            where: { companyId: companyId, id: rewardId },
        });
        return res.status(200).json({
            type: "SUCCESS",
            reward: reward,
        });
    } catch (error) {
        return res.json(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
