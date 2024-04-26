const { response } = require("express");

async function UserSignUpController(request, response) {
    try {
        const { firstname, lastname, email, password } = request.body;
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

        const user = new UserModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            profilePic : "",
        })

    } catch (error) {
        response.json({
            message: error.message,
            error: true,
            success: false,
        })
    }
}