const mongoose = require("mongoose");
const db = process.env.mongoURI;

const connection = mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to mlab DB"))
  .catch(err => console.log(err));

module.exports = connection;
