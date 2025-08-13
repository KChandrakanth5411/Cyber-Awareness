import { auth, adminOnly } from '../middleware/auth.js';

// Mock dependencies
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('../utils/db.js', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  }
}));

import jwt from 'jsonwebtoken';
import { supabase } from '../utils/db.js';

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('auth middleware', () => {
    it('should return 401 if no token is provided', async () => {
      await auth(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('token'),
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
      req.headers.authorization = 'Bearer invalid_token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await auth(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('Invalid'),
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next if token is valid', async () => {
      req.headers.authorization = 'Bearer valid_token';
      const mockUser = { id: '123', email: 'test@example.com' };
      jwt.verify.mockReturnValue({ id: mockUser.id });
      
      supabase.from().select().eq().single.mockResolvedValue({
        data: mockUser,
        error: null,
      });

      await auth(req, res, next);
      
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('adminOnly middleware', () => {
    it('should return 403 if user is not admin', async () => {
      req.user = { role: 'user' };

      await adminOnly(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.stringContaining('admin'),
      }));
      expect(next).not.toHaveBeenCalled();
    });

    it('should call next if user is admin', async () => {
      req.user = { role: 'admin' };

      await adminOnly(req, res, next);
      
      expect(next).toHaveBeenCalled();
    });
  });
});