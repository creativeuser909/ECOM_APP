const mongoose = require('mongoose');

async function connectDB(){
    try {
        mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        cosnole.log(error);
    }
}