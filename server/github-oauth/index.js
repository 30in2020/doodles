const express = require("express");
const app = express();
const axios = require("axios");
const env = require("dotenv").config({ path: __dirname + "/.env" }).parsed;

const clientID = env.CLIENT_ID;
const clientSecret = env.CLIENT_SECRET;

app.get("/callback", (req, res) => {
  const requestToken = req.query.code;
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: "application/json"
    }
  }).then(response => {
    const accessToken = response.data.access_token;
    res.redirect(`/result.html?access_token=${accessToken}`);
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(3000, () => {
  console.log("Server listening on port : 3000");
});
