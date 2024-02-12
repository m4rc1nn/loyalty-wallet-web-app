/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const Actions = sequelize.define(
		"actions",
		{
			id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            type: {type: Sequelize.ENUM, values: ["ADD", "SUBTRACK"]},
            amount: {type: Sequelize.INTEGER}
		},
		{},
	);

    Actions.associate = (models) => {
		Actions.belongsTo(models.User, { foreignKey: "userId", as: "user" });
		Actions.belongsTo(models.Reward, { foreignKey: "rewardId", as: "reward", constraints: false });
	};

	return Actions;
};
