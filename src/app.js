const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const authRouter = require('./routes/auth.routes')

app.use('/api/auth', authRouter)

module.exports = app