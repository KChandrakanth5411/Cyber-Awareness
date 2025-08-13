import express from 'express';
import { body } from 'express-validator';
import { updateUserScore, updateLeaderboard, broadcastAchievement } from '../utils/socketEvents.js';

const router = express.Router();

// Import middleware (to be implemented)
// import { auth } from '../middleware/auth.js';

// Update user score
router.post('/update', [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('points').isNumeric().withMessage('Points must be a number'),
  body('quizId').optional().isString(),
  body('correctAnswers').optional().isNumeric()
], (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  const { userId, points, quizId, correctAnswers } = req.body;
  
  // Mock data - in a real implementation, this would update the database
  const scoreData = {
    userId,
    points,
    newTotal: 520 + parseInt(points, 10), // Mock calculation
    level: 4,
    streak: 3,
    updateLeaderboard: points > 50, // Only update leaderboard for significant changes
    timestamp: new Date().toISOString()
  };
  
  // Check for achievements
  const achievements = [];
  if (points >= 100) {
    achievements.push({
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Get 100% on any quiz',
      timestamp: new Date().toISOString()
    });
  }
  
  // Send response
  res.status(200).json({
    success: true,
    message: 'Score updated successfully',
    data: scoreData,
    achievements
  });
  
  // Emit real-time updates
  updateUserScore(userId, scoreData);
  
  // If there are new achievements, broadcast them
  if (achievements.length > 0) {
    achievements.forEach(achievement => {
      broadcastAchievement({
        userId,
        userName: 'John Doe', // This would come from the database
        achievement
      });
    });
  }
  
  // If score change is significant, update leaderboard
  if (scoreData.updateLeaderboard) {
    // In a real implementation, we would fetch the updated leaderboard from the database
    // For now, we'll just emit a notification that the leaderboard should be refreshed
    // This would trigger clients to reload their leaderboard data
    const mockLeaderboard = {
      timeframe: 'weekly',
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
          userId,
          name: 'Current User',
          points: scoreData.newTotal,
          streak: scoreData.streak,
          badges: ['Phishing Expert', 'Week Champion'],
          level: scoreData.level
        }
      ]
    };
    
    updateLeaderboard(mockLeaderboard);
  }
});

export default router;