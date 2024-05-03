const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('MongoDB Connected');
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;