import bcrypt from "bcryptjs";
import User from '../Models/UserModel.js';
import { createSecretToken } from "../util/SecretToken.js";

export const Login = async (req, res, next) => {

try {
    const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

    const isMatch = await bcrypt.compare(password, existingUser.password)
           if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
         const token = createSecretToken(existingUser._id)
   res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        username: existingUser.username,
      },
      token, //returning token 
    });
} catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
}
};


export const Signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        console.log("Found user:", existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "Password cannot be empty" });
        }
        const saltRounds = 10;  // Number of hashing rounds 
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({
            username,
            password: hashedPassword
        });
        await newUser.save();
        const token = createSecretToken(newUser._id);
        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, username: newUser.username, },
            token
        });
        next()
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}


export const VerifyUser = async (req, res) => {
  res.status(200).json({
    message: "User is authenticated",
    isAuthenticated: true,
    user: {
      id: req.user._id,
      username: req.user.username,
    },
  });
};

export const Logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};