const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic : String,
},{
    timestamps: true,
})

const UserModel = mongoose.model('Customers', userSchema);

module.exports = UserModel;