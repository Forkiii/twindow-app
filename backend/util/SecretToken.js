import jwt from 'jsonwebtoken';

export const createSecretToken = (id) => {
  // Create a JWT token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d', 
  });
};