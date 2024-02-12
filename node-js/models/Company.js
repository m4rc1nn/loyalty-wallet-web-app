/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
	const Company = sequelize.define(
		"company",
		{
			id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            type: {type: Sequelize.ENUM, default: ['NORMAL', 'PREMIUM']},
            email: {type: Sequelize.STRING},
			name: Sequelize.STRING,
			isActive: {type: Sequelize.STRING, defaultValue: true},
		},
		{},
	);
	return Company;
};
