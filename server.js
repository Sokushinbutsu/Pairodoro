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

// axios.get(
//   url,
//   {headers: {
//       "name" : "value"
//     }
//   }
// )
// .then((response) => {
//     var response = response.data;
//   },
//   (error) => {
//     var status = error.response.status
//   }
// );

// curl -H "Authorization: token fdf8e618bc66dbbeeff6339347cc2fada0ae0706"
// https://api.github.com/user

// access_token=fdf8e618bc66dbbeeff6339347cc2fada0ae0706&scope=public_repo%2Cuser%3Aemail&token_type=bearer

//axios.get('/api', {
//   params: {
//     foo: 'bar'
//   }
// });

app.get("/username/:token", (req, res) => {
  Axios.get(`https://api.github.com/user`, {
    headers: { Authorization: `token ${req.params.token}` }
  })
    .then(({ data }) => {
      console.log(data);
      res.status(200).send(data.login);
    })
    .catch(error => {
      res.status(500).send();
    });
});

app.get("/commits/:token", (req, res) => {});

app.use("/api/pomodoros", pomodoros);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
