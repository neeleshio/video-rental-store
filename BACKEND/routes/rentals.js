const express = require('express');
const router = express.Router();
const Rentals = require('../models/rentals');
const { Mongoose } = require('mongoose');

router.post('/new-order', (req, res, next) => {
    const order = new Rentals({
        user: req.body.user,
        filmId: req.body.id,
        filmName: req.body.name,
        type: req.body.type,
        days: req.body.days,
        total: req.body.total
    })
    order.save()
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