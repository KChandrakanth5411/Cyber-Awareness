import { register, login, forgotPassword, resetPassword } from '../controllers/auth.js';

// Mock dependencies
jest.mock('../utils/db.js', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  }
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock_token'),
}));

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid'),
}));

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'Password123!',
        name: 'Test User',
      };
      
      await register(req, res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
        token: 'mock_token',
      }));
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'Password123!',
      };
      
      await login(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        token: 'mock_token',
      }));
    });
  });

  describe('forgotPassword', () => {
    it('should generate a reset token', async () => {
      req.body = {
        email: 'test@example.com',
      };
      
      await forgotPassword(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
      }));
    });
  });

  describe('resetPassword', () => {
    it('should reset a user password', async () => {
      req.body = {
        token: 'valid-token',
        password: 'NewPassword123!',
      };
      
      await resetPassword(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: expect.any(String),
      }));
    });
  });
});