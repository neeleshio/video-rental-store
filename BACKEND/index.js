const express = require('express');
const mongoose = require('mongoose');
const { json } = require('express');
const inventoryRoute = require('./routes/inventory')
const cors = require('cors')

require('dotenv').config();
const app = express()

// Connect to DB
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('connected') })
    .catch(err => { console.log(err) });

app.use(cors())
app.use('/admin', inventoryRoute)

app.use(express.json())

const port = process.env.PORT || 8000
app.listen(port)