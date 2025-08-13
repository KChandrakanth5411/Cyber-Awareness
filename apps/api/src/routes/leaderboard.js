import express from 'express';
import { query } from 'express-validator';
import { updateLeaderboard } from '../utils/socketEvents.js';

const router = express.Router();

// Get global leaderboard
router.get('/', [
  query('timeframe').optional().isIn(['daily', 'weekly', 'monthly', 'all']).withMessage('Invalid timeframe')
], (req, res) => {
  // Placeholder until controller is implemented
  const timeframe = req.query.timeframe || 'weekly';
  
  // Create leaderboard data
  const leaderboardData = {
    timeframe,
    leaderboard: [
      {
        rank: 1,
        userId: 'user-123',
        name: 'Jane Smith',
        points: 1250,
        streak: 12,
        badges: ['Phishing Master', 'Perfect Score', '10-Day Streak'],
        level: 8
      },
      {
        rank: 2,
        userId: 'user-456',
        name: 'John Doe',
        points: 1120,
        streak: 8,
        badges: ['Phishing Expert', 'Quick Learner'],
        level: 7
      },
      {
        rank: 3,
        userId: 'user-789',
        name: 'Alice Johnson',
        points: 980,
        streak: 5,
        badges: ['Phishing Spotter', '5-Day Streak'],
        level: 6
      },
      {
        rank: 4,
        userId: 'user-101',
        name: 'Bob Williams',
        points: 840,
        streak: 3,
        badges: ['Rookie Defender'],
        level: 5
      },
      {
        rank: 5,
        userId: 'user-202',
        name: 'Carol Brown',
        points: 720,
        streak: 2,
        badges: ['Awareness Champion'],
        level: 4
      }
    ],
    userRank: {
      rank: 12,
      userId: 'mock-user-id',
      name: 'Current User',
      points: 520,
      streak: 3,
      badges: ['Phishing Expert', 'Week Champion'],
      level: 4
    },
    pagination: {
      page: 1,
      limit: 5,
      total: 50,
      hasMore: true
    }
  };
  
  // Send response
  res.status(200).json(leaderboardData);
  
  // Emit real-time update to all connected clients in the leaderboard room
  updateLeaderboard(leaderboardData);
});

// Get team/organization leaderboard
router.get('/team', [
  query('timeframe').optional().isIn(['daily', 'weekly', 'monthly', 'all']).withMessage('Invalid timeframe')
], (req, res) => {
  // Placeholder until controller is implemented
  const timeframe = req.query.timeframe || 'weekly';
  
  res.status(200).json({
    timeframe,
    teamName: 'Marketing Department',
    leaderboard: [
      {
        rank: 1,
        userId: 'user-123',
        name: 'Jane Smith',
        points: 1250,
        streak: 12,
        level: 8
      },
      {
        rank: 2,
        userId: 'user-456',
        name: 'John Doe',
        points: 1120,
        streak: 8,
        level: 7
      },
      {
        rank: 3,
        userId: 'user-789',
        name: 'Alice Johnson',
        points: 980,
        streak: 5,
        level: 6
      }
    ],
    teamStats: {
      averageScore: 85.3,
      totalPoints: 3350,
      membersCount: 3,
      ranking: 2,
      totalTeams: 5
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 3,
      hasMore: false
    }
  });
});

// Get badges leaderboard
router.get('/badges', (req, res) => {
  // Placeholder until controller is implemented
  res.status(200).json({
    badges: [
      {
        id: 'phishing-master',
        name: 'Phishing Master',
        description: 'Correctly identify 50 phishing attempts',
        rarity: 'legendary',
        usersCount: 5,
        topUsers: [
          { userId: 'user-123', name: 'Jane Smith' },
          { userId: 'user-456', name: 'John Doe' }
        ]
      },
      {
        id: 'perfect-score',
        name: 'Perfect Score',
        description: 'Get 100% on any quiz',
        rarity: 'rare',
        usersCount: 12,
        topUsers: [
          { userId: 'user-123', name: 'Jane Smith' },
          { userId: 'user-789', name: 'Alice Johnson' }
        ]
      },
      {
        id: '10-day-streak',
        name: '10-Day Streak',
        description: 'Complete quizzes for 10 consecutive days',
        rarity: 'epic',
        usersCount: 8,
        topUsers: [
          { userId: 'user-123', name: 'Jane Smith' }
        ]
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 3,
      hasMore: false
    }
  });
});

export default router;