/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const Company = sequelize.define(
		"company",
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			type: {
				type: Sequelize.ENUM,
				values: ["NORMAL", "PREMIUM"],
				defaultValue: "NORMAL",
			},
			email: { type: Sequelize.STRING, allowNull: false },
			password: { type: Sequelize.STRING, allowNull: false },
			name: { type: Sequelize.STRING, allowNull: false },
			isActive: { type: Sequelize.STRING, defaultValue: true },
		},
		{}
	);
	Company.associate = (models) => {
		Company.hasMany(models.Card, { foreignKey: "companyId", as: "cards" });
	};
	return Company;
};
