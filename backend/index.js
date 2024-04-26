const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');

const connectDB = require('./config/db.js');

const app = express();

app.use(cors());

app.use('/api', router);


const PORT = 8000 || process.env.PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log('MongoDB Connected');
    })
});