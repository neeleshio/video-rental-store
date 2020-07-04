const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users')

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                const token = jwt.sign({ _id: user._id }, 'privateKey');
                res.header(token).send(token)
            }
        })
        .catch(err => {
            console.log(err)
        })

})

module.exports = router;