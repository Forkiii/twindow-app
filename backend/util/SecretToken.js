import jwt from "jsonwebtoken";

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "7d", // Token expires in 7 days
  });
};