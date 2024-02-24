const express = require("express");
const cors = require("cors");

const { db } = require("./database/db.js");

const authGetRouter = require("./routes/auth/GET/route.js");
const authPostRouter = require("./routes/auth/POST/route.js");

const actionGetRouter = require("./routes/action/GET/route.js");
const actionPostRouter = require("./routes/action/POST/route.js");

const cardGetRouter = require("./routes/card/GET/route.js");
const cardPostRouter = require("./routes/card/POST/route.js");

const companyGetRouter = require("./routes/company/GET/route.js");

const rewardGetRouter = require("./routes/reward/GET/route.js");
const rewardPostRouter = require("./routes/reward/POST/route.js");

const tempCodeGetRouter = require("./routes/temp-code/GET/route.js");
const tempCodePostRouter = require("./routes/temp-code/POST/route.js");

const userGetRouter = require("./routes/user/GET/route.js");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", authGetRouter);
app.use("/api", authPostRouter);
app.use("/api", actionGetRouter);
app.use("/api", actionPostRouter);
app.use("/api", cardGetRouter);
app.use("/api", cardPostRouter);
app.use("/api", companyGetRouter);
app.use("/api", rewardGetRouter);
app.use("/api", rewardPostRouter);
app.use("/api", tempCodeGetRouter);
app.use("/api", tempCodePostRouter);
app.use("/api", userGetRouter);

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
