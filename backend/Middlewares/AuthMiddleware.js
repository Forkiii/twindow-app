import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    // token from header
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        message: "Access denied. No token provided.",
        isAuthenticated: false 
      });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    
    // get the user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid token. User not found.",
        isAuthenticated: false 
      });
    }

    // attach user to req
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: "Invalid token.",
        isAuthenticated: false 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token expired.",
        isAuthenticated: false 
      });
    }
    res.status(500).json({ 
      message: "Server error during authentication",
      error: error.message 
    });
  }
};