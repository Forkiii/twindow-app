import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
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

    // Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    
    // Find user and attach to request
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid token. User not found.",
        isAuthenticated: false 
      });
    }

    // Attach user to request object
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