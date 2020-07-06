const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory')

//Query all films
router.get('/', (req, res, next) => {
    Inventory.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

//Query only available films
router.get('/available', (req, res, next) => {
    Inventory.find({ 'isAvailable': true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.patch('/id', (req, res, next) => {
    const id = { _id: req.body.id }
    Inventory.updateOne(id, { $set: { isAvailable: req.body.isAvailable } })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

//Update film type (admin)
router.patch('/type/id', (req, res, next) => {
    const id = { _id: req.body.id }
    Inventory.updateOne(id, { $set: { type: req.body.type } })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})


router.patch('/price/id', (req, res, next) => {
    const id = { _id: req.body.id }
    Inventory.updateOne(id, { $set: { price: req.body.price } })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})


module.exports = router;