require("dotenv").config();

module.exports = {
    username: process.env.NODE_ENV === "development" ? "root" : process.env.DB_USER,
    password: process.env.NODE_ENV === "development" ? "" : process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === "development" ? "loyalty-wallet-db" : process.env.DB_NAME,
    host: process.env.NODE_ENV === "development" ? "127.0.0.1" : process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
};
