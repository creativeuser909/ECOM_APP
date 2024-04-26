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


mongoose.connect('mongodb+srv://manishkumar:SYOOAEQ0BA6i5UWV@userdata.nrolojj.mongodb.net/apitest?retryWrites=true&w=majority&appName=apitest')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000, () => {
        console.log(`listening on port 3000`);
    });
 
  });