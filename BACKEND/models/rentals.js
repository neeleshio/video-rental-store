const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    filmId: {
        type: mongoose.Types.ObjectId, ref: 'Film'
    },
    filmName: {
        type: String
    },
    type: {
        type: String
    },
    days: {
        type: Number
    },
    total: {
        type: Number
    },
    bonus: {
        type: Number
    }
})

module.exports = mongoose.model('Rental', rentalSchema)