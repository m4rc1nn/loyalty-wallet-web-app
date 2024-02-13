const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../../../database/db");

router.post("/user", async (req, res) => {
    const userData = req.body; // Pobierz dane użytkownika z ciała żądania
    try {
        const user = await db.User.create(userData); // Utwórz użytkownika z przekazanych danych

        // Wygeneruj token JWT
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "24h", // Token będzie ważny przez 1 dzień
        });

        // Zwróć odpowiedź zawierającą token i dane użytkownika
        return res.status(200).json({
            status: "SUCCESS",
            user: user,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            type: "ERROR",
            message: error.message,
        });
    }
});

module.exports = router;
