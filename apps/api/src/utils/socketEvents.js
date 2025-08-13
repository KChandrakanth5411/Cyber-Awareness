/**
 * Socket.IO event utilities for real-time updates
 */

import { io } from '../index.js';

/**
 * Update leaderboard in real-time
 * @param {Array} leaderboardData - Updated leaderboard data
 */
export const updateLeaderboard = (leaderboardData) => {
  io.to('leaderboard').emit('leaderboard_update', leaderboardData);
};

/**
 * Notify users about score changes
 * @param {string} userId - User ID
 * @param {Object} scoreData - Score update data
 */
export const updateUserScore = (userId, scoreData) => {
  io.to(userId).emit('score_update', scoreData);
  
  // Also update leaderboard if score change is significant
  if (scoreData.updateLeaderboard) {
    // Fetch updated leaderboard data and emit to all users in the leaderboard room
    // This would typically be implemented with a database query
    // For now, we'll just emit a notification that the leaderboard should be refreshed
    io.to('leaderboard').emit('leaderboard_refresh');
  }
};

/**
 * Broadcast achievement notifications
 * @param {Object} achievementData - Achievement data
 */
export const broadcastAchievement = (achievementData) => {
  // Broadcast to all connected users
  io.emit('new_achievement', achievementData);
};