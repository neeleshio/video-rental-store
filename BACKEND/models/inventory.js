const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    name: {
        type: String
    },

    type: {
        type: String
    },

    price: {
        type: Number
    },

    isavailable: Boolean
})

module.exports = mongoose.model('Film', inventorySchema)