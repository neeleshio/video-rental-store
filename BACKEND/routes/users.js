const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users')

//Query all user
router.get('/user', (req, res, next) => {
    User.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

//Update user's bonus point on every order
router.patch('/user', (req, res, next) => {
    const user = { _id: req.body.user }
    User.updateOne(user, { $set: { bonusPoints: req.body.bonusPoints } })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

//User Login
// router.post('/login', (req, res, next) => {
//     User.findOne({ username: req.body.username })
//         .then(user => {
//             if (user) {
//                 const token = jwt.sign({ _id: user._id }, 'privateKey');
//                 res.header(token).send(token)
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })

// })

module.exports = router;