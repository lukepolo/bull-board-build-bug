const express = require('express')
const QueueMQ = require('bullmq')
const { createBullBoard } = require('bull-board')
const { BullMQAdapter } = require('bull-board/bullMQAdapter')

const queueMQ = new QueueMQ.Queue('default')
const { router } = createBullBoard([
  new BullMQAdapter(queueMQ),
])
const app = express()

app.use('/admin/queues', router)

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
