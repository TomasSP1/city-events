const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: [true, 'Please add a text']
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
        price: {
            type: String, 
            required: [true, 'Please add a price Eur']
        }
    },
    {
        timestamps: true
   }
)

// padaryti vietoj price mokamas nemokamas ir jeigu galimybe yra jeigu mokamas tai kokia kaina

module.exports = mongoose.model('Event', eventSchema)