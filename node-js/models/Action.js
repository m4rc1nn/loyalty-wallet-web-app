/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Action = sequelize.define(
        "action",
        {
            id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            name: { type: Sequelize.STRING },
            description: { type: Sequelize.STRING },
            type: { type: Sequelize.ENUM, values: ["ADD", "SUBTRACK"] },
            amount: { type: Sequelize.INTEGER },
        },
        {}
    );

    Action.associate = (models) => {
        Action.belongsTo(models.User, { foreignKey: "userId", as: "user" });
        Action.belongsTo(models.Reward, { foreignKey: "rewardId", as: "reward", constraints: false });
    };

    return Action;
};
