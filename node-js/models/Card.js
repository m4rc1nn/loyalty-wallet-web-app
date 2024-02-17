/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const Card = sequelize.define(
		"card",
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
		},
		{}
	);

	Card.associate = (models) => {
		Card.belongsTo(models.User, { foreignKey: "userId", as: "user" });
		Card.belongsTo(models.Company, {
			foreignKey: "companyId",
			as: "company",
		});
		Card.hasMany(models.Action, { foreignKey: "cardId", as: "actions" });
	};

	return Card;
};
