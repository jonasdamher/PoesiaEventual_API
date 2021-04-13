'use strict';

const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment')
moment.locale('es')

const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())

require('./api/' + process.env.API_VERSION + '/db/mongodb')

const api = require('./api/' + process.env.API_VERSION + '/routes.js')
app.use('/api/' + process.env.API_VERSION, api)


