const User = require('../models/User');

// @desc    Get student profile
// @route   GET /api/user/profile
// @access  Private (protect middleware)
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update student profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    const { name, branch, semester, password } = req.body;

    if (name) user.name = name.trim();
    if (branch) user.branch = branch.trim();
    if (semester) user.semester = semester.trim();

    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.'
        });
      }
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        branch: updatedUser.branch,
        semester: updatedUser.semester,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};

