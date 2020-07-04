const User = require('../models/users');
const mongoose = require('mongoose');
const { response } = require('express');
require('dotenv').config()

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('connected') })
    .catch(err => { console.log(err) });

const user = [
    new User({
        username: 'stark',
        bonusPoints: 0
    })
];

user[0].save().then(response => {
    mongoose.disconnect();
})
