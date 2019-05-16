const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const db = require("./config/mongoKey").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mlab DB"))
  .catch(err => console.log(err));

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
