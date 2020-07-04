const express = require('express');
const mongoose = require('mongoose');
const { json } = require('express');
const inventoryRoute = require('./routes/inventory')
const loginRoute = require('./routes/login')
const cors = require('cors')
const app = express()
require('dotenv').config();

// Connect to DB
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('connected') })
    .catch(err => { console.log(err) });

app.use(express.json())
app.use(cors())

app.use('/admin', inventoryRoute)
app.use('/', loginRoute)

const port = process.env.PORT || 8000
app.listen(port)