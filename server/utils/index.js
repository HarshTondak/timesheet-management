import jwt from "jsonwebtoken";

const createJWT = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default createJWT;
