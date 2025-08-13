import { useState, useEffect, useCallback } from 'react'
import { useSocket } from '../contexts/SocketContext'

// Mock data for demonstration
const mockLeaderboardData = [
  { id: 1, name: 'Alex Johnson', score: 950, streak: 12, badges: ['Expert', 'Streak Master', 'Perfect Score'] },
  { id: 2, name: 'Jamie Smith', score: 920, streak: 8, badges: ['Expert', 'Quick Responder'] },
  { id: 3, name: 'Taylor Wilson', score: 880, streak: 10, badges: ['Advanced', 'Streak Master'] },
  { id: 4, name: 'Morgan Lee', score: 840, streak: 6, badges: ['Advanced', 'Perfect Score'] },
  { id: 5, name: 'Casey Brown', score: 790, streak: 5, badges: ['Advanced'] },
  { id: 6, name: 'Jordan Miller', score: 750, streak: 4, badges: ['Intermediate'] },
  { id: 7, name: 'Riley Davis', score: 720, streak: 3, badges: ['Intermediate', 'Quick Responder'] },
  { id: 8, name: 'Avery Garcia', score: 680, streak: 2, badges: ['Intermediate'] },
  { id: 9, name: 'Quinn Martinez', score: 650, streak: 1, badges: ['Beginner'] },
  { id: 10, name: 'Sam Robinson', score: 620, streak: 1, badges: ['Beginner'] },
];

function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('weekly');
  const { joinRoom, leaveRoom, subscribe, unsubscribe } = useSocket();

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leaderboard?timeframe=${timeframe}`);
      // const data = await response.json();
      // setLeaderboardData(data.leaderboard);
      
      // For now, use mock data
      setTimeout(() => {
        setLeaderboardData(mockLeaderboardData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  }, [timeframe]);

  // Handle real-time leaderboard updates
  const handleLeaderboardUpdate = useCallback((data) => {
    console.log('Received leaderboard update:', data);
    setLeaderboardData(data.leaderboard);
  }, []);

  // Handle leaderboard refresh notification
  const handleLeaderboardRefresh = useCallback(() => {
    console.log('Leaderboard refresh requested');
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    // Fetch initial data
    fetchLeaderboard();
    
    // Join leaderboard room for real-time updates
    joinRoom('leaderboard');
    
    // Subscribe to leaderboard events
    subscribe('leaderboard_update', handleLeaderboardUpdate);
    subscribe('leaderboard_refresh', handleLeaderboardRefresh);
    
    // Cleanup on unmount
    return () => {
      leaveRoom('leaderboard');
      unsubscribe('leaderboard_update', handleLeaderboardUpdate);
      unsubscribe('leaderboard_refresh', handleLeaderboardRefresh);
    };
  }, [timeframe, joinRoom, leaveRoom, subscribe, unsubscribe, handleLeaderboardUpdate, handleLeaderboardRefresh, fetchLeaderboard]);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Expert':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-green-100 text-green-800';
      case 'Beginner':
        return 'bg-yellow-100 text-yellow-800';
      case 'Streak Master':
        return 'bg-red-100 text-red-800';
      case 'Perfect Score':
        return 'bg-indigo-100 text-indigo-800';
      case 'Quick Responder':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="mt-2 text-gray-600">See who's leading the way in cyber awareness</p>
      </div>

      <div className="card max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Top Performers</h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${timeframe === 'weekly' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('weekly')}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${timeframe === 'monthly' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${timeframe === 'alltime' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('alltime')}
            >
              All Time
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em]"></div>
            <p className="mt-2 text-gray-600">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Streak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <tr key={user.id} className={index < 3 ? 'bg-yellow-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-300' : index === 2 ? 'bg-amber-600' : 'bg-gray-100'}`}>
                          <span className={`text-sm font-medium ${index < 3 ? 'text-white' : 'text-gray-700'}`}>{index + 1}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.streak} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.badges.map((badge, badgeIndex) => (
                          <span key={badgeIndex} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Your Rank</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">5th</div>
            <div className="mt-1 text-sm text-gray-500">Top 10%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Current Score</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">790</div>
            <div className="mt-1 text-sm text-green-500">+50 this week</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500">Current Streak</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">5 days</div>
            <div className="mt-1 text-sm text-gray-500">Personal best: 8 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;