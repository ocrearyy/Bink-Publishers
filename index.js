const { Console } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const Product = require('./models/product')
const methodOverride = require('method-override')




app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://localhost:27017/caseify', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Mongo Connection Open!!!!!!')
})
.catch (err => {
console.log('Oh NO mongo connection errror!!')
console.log(err)
})

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

const categories = ['classic', 'tragedy', 'sci-fi', 'fantasy', 'action', 'crime', 'romance', 'humour']

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category){
        const products = await Product.find( { category })
        res.render('products/index', { products, category, categories })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category : 'All', categories })

    }
})


app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
   console.log(product)
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!!!')
});
