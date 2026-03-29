const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../schema/User");


// Token Generation
function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}


// Register Service
async function registerService({name, email, password}) {
    if (!name || !email || !password) {
        const error = new Error("Name, email and password are required");
        error.status = 400;
        throw error;
    }

    // Email Should be Save in Lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if User Already Exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
        const error = new Error("User with this email already exists");
        error.status = 400;
        throw error;
    }

    // hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = new User({
        name,
        email: normalizedEmail,
        password: hashedPassword
    });
    await newUser.save();

    // Generate Token
    const token = generateToken(newUser);

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        credits: newUser.credits,
        plan: newUser.plan,
        token
    };
}


// Login Service
async function loginService({ email, password }) {
    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.status = 400;
        throw error;
    }

    // Email Should be Save in Lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if User Already Exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (!existingUser) {
        const error = new Error("User with this email does not exist");
        error.status = 400;
        throw error;
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid password");
        error.status = 400;
        throw error;
    }

    // Generate Token
    const token = generateToken(existingUser);

    return {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        credits: existingUser.credits,
        plan: existingUser.plan,
        token
    };
}


// Get Me Service
async function getMeService(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }
    return user;
}

module.exports = {
    registerService,
    loginService,
    getMeService
};