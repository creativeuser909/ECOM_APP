const UserModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function UserSignInController(req, res) {
    try {
        const { email, password } = req.body;
        const userEmail = await UserModel.findOne({ email });
        if (!userEmail) {
            return res.json({
                status: 'error',
                message: 'User not found'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, userEmail.password);
        if (!isPasswordValid) {
            return res.json({
                status: 'error',
                message: 'Password is incorrect'
            });
        }
        const token = jwt.sign({ userId: userEmail._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        // const tokenOption = {
        //     httpOnly : true,
        //     secure : true
        // }
        res.json({
            status: 'success',
            message: 'Authentication successful',
            token: token
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = UserSignInController;