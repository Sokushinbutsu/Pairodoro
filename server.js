require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const pomodoros = require("./routes/api/pomodoros");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("./frontend/src"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use("/api/pomodoros", pomodoros);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
