import bcrypt from 'bcryptjs';
import { storage } from './storage';
import type { User } from '@shared/schema';
import type { Request, Response, NextFunction } from 'express';

const SALT_ROUNDS = 10;

export const authUtils = {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  },

  async createUser(username: string, password: string, email?: string, fullName?: string, role: string = 'volunteer') {
    const hashedPassword = await this.hashPassword(password);
    return await storage.createUser({
      username,
      password: hashedPassword,
      email,
      fullName,
      role,
      isActive: true,
    });
  },

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await storage.getUserByUsername(username);
    if (!user || !user.isActive) {
      return null;
    }

    const isValid = await this.verifyPassword(password, user.password);
    return isValid ? user : null;
  },
};

// Session middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
}

// Middleware to check if user has admin or staff role
export function requireAdminOrStaff(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userRole = req.session.userRole;
  if (userRole !== 'admin' && userRole !== 'staff') {
    return res.status(403).json({ message: 'Access denied. Admin or staff privileges required.' });
  }

  next();
}

// Middleware to check if user has admin role only
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }

  next();
}

// Middleware to check if user has staff role (or higher)
export function requireStaff(req: Request, res: Response, next: NextFunction) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const userRole = req.session.userRole;
  if (userRole !== 'admin' && userRole !== 'staff') {
    return res.status(403).json({ message: 'Access denied. Staff privileges required.' });
  }

  next();
}

// Extend Express Session type
declare module 'express-session' {
  interface SessionData {
    userId: string;
    username: string;
    userRole: string;
  }
}
