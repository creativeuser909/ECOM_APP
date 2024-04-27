const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const Product = require('./model/porduct.model.js');

const app = express();

app.get('/', (req, res) => {
    res.send('This is the message from the server.');
});

app.use(bodyParser.json());

app.post('/api/productdetail', async (req, res) => {
    try {
        const data = req.body;
        const product = new Product(data);
        await product.save();
        console.log('Product saved:', product);
        res.send(product);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product) {
            return res.status(404).send('Product not found');
        }
        const updatedProduct = await Product.findById(product.id);
        res.send(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
})


// Delete a product from Database

app.delete('/api/products/:id', async (req, res) => {
    try {
        const getProduct = await Product.findById(req.params.id);
        if(!getProduct) {
            return res.status(404).send('Product not found');
        }
        const productName = getProduct.name;
        await Product.findByIdAndDelete(req.params.id).then(() => {
            return res.send(`Product "${productName}" deleted successfully`);
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
})

mongoose.connect('mongodb+srv://manishkumar:SYOOAEQ0BA6i5UWV@userdata.nrolojj.mongodb.net/apitest?retryWrites=true&w=majority&appName=apitest')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000, () => {
        console.log(`listening on port 3000`);
    });
 
  });