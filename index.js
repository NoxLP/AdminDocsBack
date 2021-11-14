process.stdout.write('\x1B[2J\x1B[0f') // Clear terminal screen
require('dotenv').config()

const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const helmet = require('helmet')

// NONGOOSE
mongoose.connect(
  process.env.MONGO_URL,
  {
    dbName: process.env.MONGO_DB || 'test',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw new Error(err)
    }
    console.info('💾 Connected to Mongo Database \n')
  }
)

// ADDING MIDDLEWARES & ROUTER
const app = express()
  .use(helmet())
  .use(cors())
  .use(morgan('combined'))
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({ extended: true }))
  .use('/api', require('./api/routes'))

// Init server
const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.info('>'.repeat(40))
  console.info('💻  AdminDocs Server Live')
  console.info('    (Reboot Template)')
  console.info(`📡  PORT: http://localhost:${PORT}`)
  console.info('>'.repeat(40) + '\n')
})
