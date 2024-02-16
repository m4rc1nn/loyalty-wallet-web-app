/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			email: { type: Sequelize.STRING },
			name: { type: Sequelize.STRING, defaultValue: "" },
			isActive: { type: Sequelize.BOOLEAN, defaultValue: true },
			pushToken: { type: Sequelize.STRING, defaultValue: "" },
		},
		{}
	);
	User.associate = (models) => {
		User.hasMany(models.Card, { foreignKey: "userId", as: "cards" });
	};
	return User;
};
