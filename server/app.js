const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./Schemas/Schema')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

const cors = require('cors')

const PORT = process.env.PORT
const URL = process.env.MONGO_URL
app.use(cors())


mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
const Connection = mongoose.connection
Connection.on('error', err => console.log('Error', err))
Connection.once('open', () => console.log('Connected DB!'))


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, err => err ? console.log('err') : console.log('Server is running'))