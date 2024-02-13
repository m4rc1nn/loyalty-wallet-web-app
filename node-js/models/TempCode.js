/** @format */

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const TempCode = sequelize.define(
        "temp_code",
        {
            id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            code: { type: Sequelize.STRING },
            expires: { type: Sequelize.DATE },
        },
        {}
    );

    TempCode.associate = (models) => {
        TempCode.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    };

    return TempCode;
};
