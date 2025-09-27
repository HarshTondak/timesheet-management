import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import createJWT from "../utils/index.js";

// POST request - login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid email or password." });
  }

  const isMatch = await user.matchPassword(password);

  if (user && isMatch) {
    const token = createJWT(user._id);
    user.password = undefined;

    res.status(200).json({
      status: true,
      user,
      token,
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Invalid email or password" });
  }
});

// POST - Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, title = "" } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res
      .status(400)
      .json({ status: false, message: "Email address already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    title,
  });

  if (user) {
    user.password = undefined;
    res.status(201).json({ status: true, user });
  } else {
    return res
      .status(400)
      .json({ status: false, message: "Invalid user data" });
  }
});

// POST -  Logout user / clear cookie
const logoutUser = (req, res) => {
  res.status(200).json({ status: true, message: "Logged out successfully" });
};

// PUT - Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.title = req.body.title || user.title;
    // email should not be changed after registration
    const updatedUser = await user.save();

    updatedUser.password = undefined;

    res.status(200).json({
      status: true,
      message: "Profile Updated Successfully.",
      user: updatedUser,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

// PUT - Change password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);

  if (user) {
    user.password = req.body.password;
    await user.save();

    user.password = undefined;

    res.status(200).json({
      status: true,
      message: `Password changed successfully.`,
    });
  } else {
    res.status(404).json({ status: false, message: "User not found" });
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  changeUserPassword,
};
