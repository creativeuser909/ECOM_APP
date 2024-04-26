const { response } = require("express");

async function UserSignUpController(request, response) {
    try {
        
    } catch (error) {
        response.json({
            message: error.message,
            error: true,
            success: false,
        })
    }
}