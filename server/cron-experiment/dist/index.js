"use strict";
var env = require("dotenv").config({ path: __dirname + "/../.env" }).parsed;
var CronJob = require("cron").CronJob;
var nodeFetch = require("node-fetch");
console.log(env);
console.log("Before job instantiation");
var job = new CronJob("*/5 * * * * *", function () {
    var d = new Date();
    var url = "repos/30in2020/doodles/commits";
    nodeFetch("https://api.github.com/" + url, {
        method: "GET",
        headers: {
            Authorization: "token " + env.API_TOKEN,
            Accept: "application/vnd.github.v3.+json",
            "Content-Type": "application/json"
        }
    })
        .then(function (res) { return res.json(); })
        .then(function (payload) {
        return console.log(payload.map(function (commit) { return commit.commit.tree.sha; }));
    });
});
console.log("After job instantiation");
job.start();
