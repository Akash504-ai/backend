import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign(
    { id }, // wrap id inside an object
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
