import bcrypt from "bcrypt";
import User from '../Models/UserModel.js';
import { createSecretToken } from '../util/SecretToken.js';
export const Login = async (req, res, next) => {
  console.log('Login endpoint hit with:', req.body);

  try {
    console.log('Searching for existing user... (LOGIN) ');
    const { password, username } = req.body;

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }else{
    console.log('User found:', findUser.username);
    }   
    const isMatch = await bcrypt.compare(password, findUser.password);
    

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }else{
      console.log('password matched:', isMatch);  // <-- show true or false
    }
    console.log('User created, generating token...'); // Debug line
    const token = createSecretToken(findUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true, // secure setting
      sameSite: "strict",
    });

    console.log('Sending success response...');
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: { id: findUser._id, username: findUser.username }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const Signup = async (req, res, next) => {
  console.log('Signup endpoint hit with:', req.body); // Add this debug line

  try {
    const { password, username } = req.body;

    console.log('Searching for existing user...'); // Debug line
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log('User already exists'); // Debug line
      return res.status(409).json({
        message: "User already exists",
        success: false
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Creating new user...'); // Debug line
    const user = await User.create({ password: hashedPassword, username });

    console.log('User created, generating token...'); // Debug line
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
    });

    console.log('Sending success response...'); // Debug line
    res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: { id: user._id, username: user.username } // Don't send password
    });

  } catch (error) {
    console.error('Signup error:', error); // More detailed error logging
    res.status(500).json({
      message: "Server error: " + error.message,
      success: false
    });
  }
};