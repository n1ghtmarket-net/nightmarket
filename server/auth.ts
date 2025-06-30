import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'FkHe9$mN7@pQrT2*vXz4&cBnA8sD3wE6!uI9oL5+jK1#nM0xV7yC4bG2fH8sR1qP3';
const JWT_EXPIRES_IN = '24h';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: { id: number; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token: string): { id: number; username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

// Middleware to authenticate requests
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = user;
  next();
}

// Middleware for admin-only routes
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // For now, assume user with username 'admin' is admin
  // In production, you should have a proper role system
  if (req.user.username !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
}
