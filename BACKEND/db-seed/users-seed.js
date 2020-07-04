const User = require('../models/users');
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('connected') })
    .catch(err => { console.log(err) });

const user = [
    new User({
        username: 'stark'
    }),
    new User({
        username: 'hulk'
    }),
    new User({
        username: 'loki'
    }),
    new User({
        username: 'thanos'
    }),
    new User({
        username: 'fury'
    })
];

let done = 0;
for (let i = 0; i < user.length; i++) {
    user[i].save(() => {
        done++;
        if (done === user.length) {
            exit();
        }
    })
}

exit = () => {
    mongoose.disconnect();
}