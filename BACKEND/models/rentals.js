const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    movieId: {
        type: mongoose.Types.ObjectId, ref: 'film'
    },
    type: {
        type: String
    },
    days: {
        type: Number
    },
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Rental', rentalSchema)