import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1].trim();
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
  }

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken.userId).select(
        "email name"
      );

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User not found. Try login again." });
      }

      req.user = {
        userId: decodedToken.userId,
        email: user.email,
        name: user.name,
      };

      next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } else {
    return res
      .status(401)
      .json({ status: false, message: "No token found. Try login again." });
  }
});

export { protectRoute };
