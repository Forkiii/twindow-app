import User from "../Models/UserModel.js";

// Get current user profile
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    res.status(200).json({
      message: "Profile retrieved successfully",
      user: {
        id: req.user._id,
        username: req.user.username,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error retrieving profile", 
      error: error.message 
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.user._id } 
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          message: "Username already taken" 
        });
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};