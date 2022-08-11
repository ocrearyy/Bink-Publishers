const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['classic', 'tragedy', 'sci-fi', 'fantasy', 'action', 'crime', 'romance', 'humour']
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;