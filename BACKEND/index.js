const express = require('express');
const mongoose = require('mongoose');
const { json, response } = require('express');
const inventoryRoute = require('./routes/inventory')
const UserRoute = require('./routes/users');
const rentalsRoute = require('./routes/rentals')
const cors = require('cors')
const app = express() //express as function
require('dotenv').config();

// Connect to DB
mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('DB connected') })
    .catch(err => { console.log(err) });

app.use(express.json())
app.use(cors())

//Routes
app.use('/admin', inventoryRoute)
app.use('/', rentalsRoute)
app.use('/', UserRoute)

//Connect to server
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`localhost:${port} running`)
})