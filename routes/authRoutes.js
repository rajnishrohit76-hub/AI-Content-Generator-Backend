const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { register, login, getMe } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", protect, getMe);

module.exports = authRouter;