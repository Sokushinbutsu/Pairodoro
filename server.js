require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const pomodoros = require("./routes/api/pomodoros");
const cors = require("cors");
const path = require("path");
const Axios = require("axios");
const spliceToken = require("./helpers/spliceToken");

const app = express();

app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.get("/authenticate/:code", (req, res) => {
  // POST https://github.com/login/oauth/access_token
  // This route takes in a code generated from a successful github login
  // and exchanges that code for a token we can use to access the API
  Axios.post(`https://github.com/login/oauth/access_token`, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.params.code
  })
    .then(response => {
      res.status(200).send(spliceToken(response.data));
    })
    .catch(error => {
      res.status(500).send(error);
      console.error(error);
    });
});

app.get("/username/:token", (req, res) => {
  Axios.get(`https://api.github.com/user`, {
    headers: { Authorization: `token ${req.params.token}` }
  })
    .then(({ data }) => {
      res.status(200).send(data.login);
    })
    .catch(error => {
      res.status(500).send();
    });
});

app.get("/commits", (req, res) => {
  let now = new Date();
  let future = new Date();
  future.setMinutes(future.getMinutes() + req.query.periodLength);
  console.log(now);
  console.log(future);

  Axios.get(
    `https://api.github.com/repos/${req.query.login}/${req.query.repo}/commits`,
    {
      headers: { Authorization: `token ${req.query.token}` },
      params: {
        until: future.toISOString()
      }
    }
  )
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send();
    });
});

app.use("/api/pomodoros", pomodoros);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
