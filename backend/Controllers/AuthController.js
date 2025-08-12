import User from '../Models/UserModel.js';
import { createSecretToken } from '../util/SecretToken.js';

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
    
    console.log('Creating new user...'); // Debug line
    const user = await User.create({ password, username });
    
    console.log('User created, generating token...'); // Debug line
    const token = createSecretToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
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