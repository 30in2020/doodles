const env = require("dotenv").config({ path: __dirname + "/../.env" }).parsed;
const CronJob = require("cron").CronJob;
const nodeFetch = require("node-fetch");

console.log(env);

console.log("Before job instantiation");
const job = new CronJob("*/5 * * * * *", function() {
  const d = new Date();
  const url = "repos/30in2020/doodles/commits";
  nodeFetch(`https://api.github.com/${url}`, {
    method: "GET",
    headers: {
      Authorization: `token ${env.API_TOKEN}`,
      Accept: "application/vnd.github.v3.+json",
      "Content-Type": "application/json"
    }
  })
    .then((res: any) => res.json())
    .then((payload: any) =>
      console.log(payload.map((commit: any) => commit.commit.tree.sha))
    );
});
console.log("After job instantiation");
job.start();
