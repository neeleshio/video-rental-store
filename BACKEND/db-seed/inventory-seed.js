const Inventory = require('../models/inventory');
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => { console.log('connected') })
    .catch(err => { console.log(err) });

const inventory = [
    new Inventory({
        name: 'Avengers: Endgame',
        type: 'New release',
        price: 40,
        isAvailable: true
    }),
    new Inventory({
        name: 'Spider-Man: Far From Home',
        type: 'New release',
        price: 40,
        isAvailable: true
    }),
    new Inventory({
        name: 'Joker',
        type: 'New release',
        price: 40,
        isAvailable: true
    }),
    new Inventory({
        name: 'Jumanji',
        type: 'New release',
        price: 40,
        isAvailable: true
    }),
    new Inventory({
        name: 'Mission: Impossible - Fallout',
        type: 'Regular',
        price: 30,
        isAvailable: true
    }),
    new Inventory({
        name: 'Wonder Woman',
        type: 'Regular',
        price: 30,
        isAvailable: true
    }),
    new Inventory({
        name: 'Incredibles 2',
        type: 'Regular',
        price: 30,
        isAvailable: true
    }),
    new Inventory({
        name: 'Metropolis',
        type: 'Old',
        price: 30,
        isAvailable: true
    }),
    new Inventory({
        name: 'Up',
        type: 'Old',
        price: 30,
        isAvailable: true
    }),
    new Inventory({
        name: 'The Dark Knight',
        type: 'Old',
        price: 30,
        isAvailable: true
    })
];

let done = 0;
for (let i = 0; i < inventory.length; i++) {
    inventory[i].save((err, result) => {
        done++;
        if (done === inventory.length) {
            exit();
        }
    })
}

exit = () => {
    mongoose.disconnect();
}