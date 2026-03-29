const { registerService, loginService, getMeService } = require("../services/authService");

// Register Controller
const register = async (req, res) => {
    try{
        const registerUser = await registerService(req.body);
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            data: registerUser
        });
    }catch(error){
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "User Registration Failed",
            error: error.message
        });
    }
}

// Login Controller
const login = async (req, res) => {
    try{
        const loginUser = await loginService(req.body);
        return res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            data: loginUser
        });
    }catch(error){
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "User Login Failed",
            error: error.message
        });
    }
}

// Get Me Controller
const getMe = async (req, res) => {
    try{
        const user = await getMeService(req.user.id);
        return res.status(200).json({
            success: true,
            message: "User Fetched Successfully",
            data: user
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "User Fetch Failed",
            error: error.message
        });
    }
}

module.exports = {
    register,
    login,
    getMe
}