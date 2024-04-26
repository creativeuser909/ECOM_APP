const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send('This is the message from the server.');
});


mongoose.connect('mongodb+srv://manishkumar:SYOOAEQ0BA6i5UWV@userdata.nrolojj.mongodb.net/?retryWrites=true&w=majority&appName=userdata')
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(3000, () => {
        console.log(`listening on port 3000`);
    });
 
  });