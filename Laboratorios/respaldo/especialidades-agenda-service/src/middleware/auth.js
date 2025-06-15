import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = ({ req }) => {
  const header = req.headers.authorization || '';
  const token = header.replace('Bearer ', '');
  if (!token) return {};

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch {
    console.warn('⚠️ Token inválido');
    return {};
  }
};
