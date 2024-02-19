const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productType: {
        type: String
    },
    name: {
        type: String
    },
    quantity: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: String
    },
    discount: {
        type: String
    },
    imageUrl: {
        type: String
    },
    details: {
        description: {
            type: String
        },
        advantages: {
            type: String
        },
        color: {
            type: String
        },
        size: {
            type: String
        },
        materials: {
            type: String
        },

    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product