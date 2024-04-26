const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    profilePic : String,
},{
    timestamps: true,
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;