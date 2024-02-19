const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        admin: { type: String },
        likedProducts: [{
            type: String
        }],
        storedProducts: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            imageUrl: { type: String },
            productType: { type: String },
            name: { type: String }
        }],
        address: {
            city: { type: String, default: '' },
            street: { type: String, default: '' },
            streetNumber: { type: String, default: '' },
            block: { type: String, default: '' },
            entrance: { type: String, default: '' },
            floor: { type: String, default: '' },
            apartment: { type: String, default: '' },
            description: { type: String, default: '' }
        }
    },
);

const User = mongoose.model('User', userSchema)

module.exports = User