const { response } = require("express");
const bcrypt = require('bcrypt');
const UserModel = require("../models/UserModel");


async function UserSignUpController(request, response) {
    try {
        const { firstname, lastname, email, password } = request.body;
        const userEmail = await UserModel.findOne({ email: email });
        if(userEmail){
            throw new Error("Email Already Exists");
        }
        console.log(`request.body: ${JSON.stringify(request.body)}`)
        if(!email){
            throw new Error("Invalid email");
        }
        if(!password){
            throw new Error("Incorrect Password");
        }
        if(!firstname){
            throw new Error("Invalid User Name");
        }
        if(!lastname){
            throw new Error("Invalid User Name");
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something went wrong.");
        }
        const payload = {
            ...request.body,
            role: 'GENERAL',
            password: hashPassword
        }
        const userData = new UserModel(payload);
        await userData.save().then(() =>{
            response.status(201).json({
                success : true,
                message: "User Created Successfully!",
            })
        });

    } catch (error) {
        response.json({
            message: error.message,
            error: true,
            success: false,
        })
    }
}

module.exports = UserSignUpController;