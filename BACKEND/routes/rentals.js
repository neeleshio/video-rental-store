const express = require('express');
const router = express.Router();
const Rentals = require('../models/rentals')

router.get('/my-rentals', (req, res, next) => {
    Rentals.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.get('/my-rentals', (req, res, next) => {
    Rentals.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

module.exports = router;