/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const Reward = sequelize.define(
		"reward",
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			name: { type: Sequelize.UUID },
			description: { type: Sequelize.STRING },
			price: { type: Sequelize.INTEGER },
		},
		{}
	);

	Reward.associate = (models) => {
		Reward.belongsTo(models.Company, {
			foreignKey: "companyId",
			as: "company",
		});
	};

	return Reward;
};
