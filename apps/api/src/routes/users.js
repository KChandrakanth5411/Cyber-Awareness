import express from 'express';
import { param } from 'express-validator';
import { updateUserScore, broadcastAchievement } from '../utils/socketEvents.js';

const router = express.Router();

// Import middleware (to be implemented)
// import { auth } from '../middleware/auth.js';

// Get user profile
router.get('/profile', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    id: 'mock-user-id',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    stats: {
      quizzesTaken: 15,
      correctAnswers: 42,
      streak: 3,
      points: 520,
      level: 4,
      badges: ['Phishing Expert', 'Week Champion']
    },
    createdAt: '2023-01-15T12:00:00Z',
    updatedAt: '2023-08-10T15:30:00Z'
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  const userId = 'mock-user-id';
  const updatedUser = {
    id: userId,
    name: req.body.name || 'John Doe',
    email: 'john@example.com',
    updatedAt: new Date().toISOString()
  };
  
  res.status(200).json({
    message: 'Profile updated successfully',
    user: updatedUser
  });
});

// Get user stats
router.get('/stats', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  const userId = 'mock-user-id'; // This would come from auth middleware
  const userData = {
    quizzesTaken: 15,
    correctAnswers: 42,
    incorrectAnswers: 13,
    accuracy: 76.4,
    streak: 3,
    points: 520,
    level: 4,
    badges: ['Phishing Expert', 'Week Champion'],
    recentActivity: [
      { type: 'quiz_completed', score: 8, total: 10, date: '2023-08-10T15:30:00Z' },
      { type: 'badge_earned', badge: 'Week Champion', date: '2023-08-08T12:15:00Z' },
      { type: 'level_up', level: 4, date: '2023-08-05T09:45:00Z' }
    ]
  };
  
  res.status(200).json(userData);
  
  // Emit real-time update to the specific user
  updateUserScore(userId, { points: userData.points, level: userData.level });
});

// Get user activity history
router.get('/activity', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    activities: [
      { type: 'quiz_completed', score: 8, total: 10, date: '2023-08-10T15:30:00Z' },
      { type: 'badge_earned', badge: 'Week Champion', date: '2023-08-08T12:15:00Z' },
      { type: 'level_up', level: 4, date: '2023-08-05T09:45:00Z' },
      { type: 'quiz_completed', score: 7, total: 10, date: '2023-08-03T14:20:00Z' },
      { type: 'quiz_completed', score: 9, total: 10, date: '2023-08-01T11:10:00Z' }
    ],
    pagination: {
      page: 1,
      limit: 5,
      total: 15,
      hasMore: true
    }
  });
});

export default router;