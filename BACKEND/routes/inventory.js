const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Inventory = require('../models/inventory')

router.get('/all', (req, res, next) => {
    Inventory.find().select()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

router.get('/available', (req, res, next) => {
    Inventory.find({ 'available': true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => console.log(err));
})

module.exports = router;