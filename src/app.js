require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const { NODE_ENV } = require('./config')
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

console.log(process.env.CLIENT_ID)

const Header = {
    'Content-type': 'application/json',
    // 'trakt-api-key':
}


app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.get('/authorize', (req, res) => {
    console.log(req)
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})


module.exports = app