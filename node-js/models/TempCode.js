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

    TempCode.addHook("beforeValidate", (tempCode, options) => {
        if (!tempCode.code) {
            tempCode.code = generateRandomCode(); // Wywołanie funkcji generującej kod
        }
        if (!tempCode.expires) {
            tempCode.expires = new Date();
            tempCode.expires.setMinutes(tempCode.expires.getMinutes() + 1); // Dodanie jednej minuty
        }
    });

    TempCode.associate = (models) => {
        TempCode.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    };

    // Funkcja generująca 6-cyfrowy kod
    function generateRandomCode() {
        const min = 0;
        const max = 999999;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return String(randomNum).padStart(6, "0"); // Zapewnienie, że kod ma 6 cyfr
    }

    return TempCode;
};
