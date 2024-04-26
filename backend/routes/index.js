const express = require('express');
const router = express.Router();

const UserSignUpController = require('../controller/UserSignUp.js');

router.post('/signup', UserSignUpController)

module.exports = router