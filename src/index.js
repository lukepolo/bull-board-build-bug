const express = require("express");
const bullmq = require("bullmq");
const { createBullBoard } = require("bull-board");
const { BullMQAdapter } = require("bull-board/bullMQAdapter");

const queueMQ = new bullmq.Queue("default");
const { router } = createBullBoard([new BullMQAdapter(queueMQ)]);
const app = express();

app.use("/admin/queues", router);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Adding Hello World Job!");
  queueMQ.add("hello", { data: "world" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

new bullmq.Worker("default", async (job) => {
  console.info("PROCESSING", job.name);
});

const queueEvents = new bullmq.QueueEvents("default");

queueEvents.on("completed", (jobId) => {
  console.log("job completed.", jobId);
});

queueEvents.on("failed", (jobId, err) => {
  console.error("job error", err);
});
