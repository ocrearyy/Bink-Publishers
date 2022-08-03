
const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/caseify', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Mongo Connection Open!!!!!!')
})
.catch (err => {
console.log('Oh NO mongo connection errror!!')
console.log(err)
})


// const p = new Product({
//     name: 'cupcake',
//     price: 1.99,
//     category: 'cupcase'
// });

// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//     console.log(e)
//     })


const shellProducts = [
    {
        name: 'donutcase',
        price: 1.00,
        category: 'cupcase'
    },
    {
        name: 'flyaway',
        price: 2.00,
        category: 'typocase'
    },
    {
        name: 'purpleface',
        price: 1.00,
        category: 'emojicase'
    },
    {
        name: 'growup',
        price: 5.00,
        category: 'typocase'
    },
    {
        name: 'redface',
        price: 3.00,
        category: 'emojicase'
    }
]

Product.insertMany(shellProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })