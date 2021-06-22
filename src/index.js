const express = require("express");
const bullmq = require("bullmq");
const { createBullBoard } = require("@bull-board/api");
const { ExpressAdapter } = require("@bull-board/express");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");

const serverAdapter = new ExpressAdapter();
const queue = new bullmq.Queue("default");
createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
});

const app = express();

serverAdapter.setBasePath("/admin/queues");
app.use("/admin/queues", serverAdapter.getRouter());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Adding Hello World Job!");
  queue.add("hello", { data: "world" });
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
