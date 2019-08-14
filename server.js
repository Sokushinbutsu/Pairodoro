require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const pomodoros = require("./routes/api/pomodoros");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.use("/api/pomodoros", pomodoros);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
