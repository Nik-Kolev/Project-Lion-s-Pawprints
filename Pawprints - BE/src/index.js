const express = require('express')
const expressConfig = require('./config/expressConfig')
const mongooseConfig = require('./config/dbConfig')
const router = require('./router')

const app = express()

expressConfig(app)
mongooseConfig()

app.use(router)