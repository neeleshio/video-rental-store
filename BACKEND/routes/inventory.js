const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory')

router.get('/', (req, res, next) => {
    Inventory.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.get('/available', (req, res, next) => {
    Inventory.find({ 'isAvailable': true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.patch('/id', (req, res, next) => {
    const id = { _id: req.body.id }
    Inventory.updateOne(id, { $set: { type: req.body.type, isAvailable: req.body.isAvailable } })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

module.exports = router;