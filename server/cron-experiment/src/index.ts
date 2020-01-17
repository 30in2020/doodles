const env = require("dotenv").config({ path: __dirname + "/../.env" }).parsed;
const CronJob = require("cron").CronJob;
const nodeFetch = require("node-fetch");

console.log(`\x1b[34m`, `Check today's commits history every one hour.`);

const job = new CronJob("0 0 */1 * * *", async () => {
  const commitArr = await fetchTodaysCommits();
  if (commitArr.length < 1) {
    console.error("No commits today, hurry up!");
  } else {
    console.log(commitArr);
    console.log("Good job!");
  }
});

const fetchTodaysCommits = async () => {
  const since = "2020-01-17",
    until = "2020-01-18",
    url = `repos/30in2020/doodles/commits?since=${since}T00:00:00Z&until=${until}T00:00:00Z`;

  return nodeFetch(`https://api.github.com/${url}`, {
    method: "GET",
    headers: {
      Authorization: `token ${env.API_TOKEN}`,
      Accept: "application/vnd.github.v3.+json",
      "Content-Type": "application/json"
    }
  })
    .then((res: any) => res.json())
    .then((payload: any) =>
      payload.map((commit: any) => commit.commit.tree.sha)
    );
};

job.start();
