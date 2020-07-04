const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'Users'
    },
    movieId: {
        type: mongoose.Types.ObjectId, ref: 'films'
    },
    type: {
        type: String
    },
    timeline: {
        type: Number
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Rental', rentalSchema)