import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSocket } from '../contexts/SocketContext'
import ScoreUpdater from '../components/ScoreUpdater'

// Mock data for demonstration
const mockUserData = {
  name: 'Casey Brown',
  email: 'casey.brown@example.com',
  score: 790,
  rank: 5,
  streak: 5,
  quizzesCompleted: 42,
  phishingEmailsIdentified: 38,
  legitimateEmailsIdentified: 35,
  badges: [
    { id: 1, name: 'Advanced', description: 'Completed 40+ quizzes', icon: '🏆' },
    { id: 2, name: '5-Day Streak', description: 'Completed quizzes for 5 consecutive days', icon: '🔥' },
    { id: 3, name: 'Phishing Expert', description: 'Correctly identified 30+ phishing emails', icon: '🛡️' },
  ],
  recentActivity: [
    { id: 1, type: 'quiz', result: 'success', score: 10, date: '2023-11-15T10:30:00Z' },
    { id: 2, type: 'quiz', result: 'success', score: 10, date: '2023-11-14T14:45:00Z' },
    { id: 3, type: 'quiz', result: 'partial', score: 7, date: '2023-11-13T09:15:00Z' },
    { id: 4, type: 'quiz', result: 'success', score: 10, date: '2023-11-12T16:20:00Z' },
    { id: 5, type: 'quiz', result: 'success', score: 10, date: '2023-11-11T11:10:00Z' },
  ]
};

function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { subscribe, unsubscribe } = useSocket();

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`);
      // const data = await response.json();
      // setUserData(data);
      
      // For now, use mock data
      setTimeout(() => {
        setUserData(mockUserData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  }, []);

  // Handle real-time score updates
  const handleScoreUpdate = useCallback((data) => {
    console.log('Received score update:', data);
    setUserData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        score: data.points,
        level: data.level
      };
    });
  }, []);

  // Handle achievement notifications
  const handleNewAchievement = useCallback((data) => {
    console.log('New achievement earned:', data);
    // Show a notification or update the UI
    // This could be implemented with a toast notification
  }, []);

  useEffect(() => {
    // Fetch initial data
    fetchUserData();
    
    // Subscribe to real-time events
    subscribe('score_update', handleScoreUpdate);
    subscribe('new_achievement', handleNewAchievement);
    
    // Cleanup on unmount
    return () => {
      unsubscribe('score_update', handleScoreUpdate);
      unsubscribe('new_achievement', handleNewAchievement);
    };
  }, [subscribe, unsubscribe, handleScoreUpdate, handleNewAchievement, fetchUserData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getActivityIcon = (activity) => {
    if (activity.type === 'quiz') {
      if (activity.result === 'success') return '✅';
      if (activity.result === 'partial') return '⚠️';
      return '❌';
    }
    return '📝';
  };

  const getActivityText = (activity) => {
    if (activity.type === 'quiz') {
      if (activity.result === 'success') return 'Completed quiz with perfect score';
      if (activity.result === 'partial') return `Completed quiz with score ${activity.score}/10`;
      return 'Failed quiz';
    }
    return 'Unknown activity';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em]"></div>
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your progress and cyber awareness journey</p>
      </div>

      {userData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Stats Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">{userData.score}</div>
                  <div className="text-sm text-gray-500 mt-1">Total Score</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">#{userData.rank}</div>
                  <div className="text-sm text-gray-500 mt-1">Current Rank</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">{userData.streak} days</div>
                  <div className="text-sm text-gray-500 mt-1">Current Streak</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary-600">{userData.quizzesCompleted}</div>
                  <div className="text-sm text-gray-500 mt-1">Quizzes Completed</div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-500">Phishing Emails Identified</div>
                    <div className="text-sm font-medium text-green-600">{Math.round((userData.phishingEmailsIdentified / userData.quizzesCompleted) * 100)}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${(userData.phishingEmailsIdentified / userData.quizzesCompleted) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-500">Legitimate Emails Identified</div>
                    <div className="text-sm font-medium text-blue-600">{Math.round((userData.legitimateEmailsIdentified / userData.quizzesCompleted) * 100)}%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(userData.legitimateEmailsIdentified / userData.quizzesCompleted) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Link to="/history" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
              </div>
              <div className="space-y-4">
                {userData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xl">{getActivityIcon(activity)}</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{getActivityText(activity)}</p>
                        <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {activity.score && `Earned ${activity.score} points`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* User Profile */}
            <div className="card">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-4xl font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="mt-4 text-xl font-semibold">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
                <div className="mt-4 w-full">
                  <Link to="/profile" className="btn btn-outline w-full">Edit Profile</Link>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Badges</h2>
                <Link to="/badges" className="text-sm text-primary-600 hover:text-primary-700">View All</Link>
              </div>
              <div className="space-y-4">
                {userData.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                      {badge.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/quiz" className="btn btn-primary w-full">Take a Quiz</Link>
                <Link to="/leaderboard" className="btn btn-outline w-full">View Leaderboard</Link>
                <Link to="/training" className="btn btn-outline w-full">Browse Training</Link>
              </div>
            </div>

            {/* Test Score Updater - For development only */}
            <ScoreUpdater />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;