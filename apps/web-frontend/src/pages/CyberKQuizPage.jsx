import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';

// Mock quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is a sign of a phishing email?',
    options: [
      'Email is from a known contact',
      'URL in the email matches the official company website',
      'Email creates urgency to act immediately',
      'Email has proper grammar and spelling'
    ],
    correctAnswer: 2,
    explanation: 'Creating a sense of urgency is a common tactic in phishing emails to pressure users into taking action without thinking.'
  },
  {
    id: 2,
    question: 'What should you do if you receive a suspicious email at work?',
    options: [
      'Delete it immediately',
      'Forward it to your colleagues to warn them',
      'Click links to see if they are legitimate',
      'Report it to your IT security team'
    ],
    correctAnswer: 3,
    explanation: 'Always report suspicious emails to your IT security team so they can investigate and alert others if necessary.'
  },
  {
    id: 3,
    question: 'Which of the following passwords is most secure?',
    options: [
      'Password123',
      'qwerty',
      'P@$$w0rd!2023',
      'your pet\'s name'
    ],
    correctAnswer: 2,
    explanation: 'Strong passwords contain a mix of uppercase and lowercase letters, numbers, and special characters.'
  },
  {
    id: 4,
    question: 'What is multi-factor authentication (MFA)?',
    options: [
      'Using multiple passwords for one account',
      'Using the same password across multiple accounts',
      'Using something you know and something you have to verify identity',
      'Changing your password every 30 days'
    ],
    correctAnswer: 2,
    explanation: 'MFA requires multiple forms of verification, typically something you know (password) and something you have (like a phone for SMS codes).'
  },
  {
    id: 5,
    question: 'Which of the following is NOT a secure way to share sensitive information?',
    options: [
      'Encrypted email',
      'Secure file sharing service',
      'Regular text message',
      'Encrypted messaging app'
    ],
    correctAnswer: 2,
    explanation: 'Regular text messages are not encrypted and can be intercepted or accessed by unauthorized parties.'
  },
  {
    id: 6,
    question: 'What is a common indicator of a fake website?',
    options: [
      'HTTPS in the URL',
      'Misspelled domain name',
      'Privacy policy page',
      'Contact information'
    ],
    correctAnswer: 1,
    explanation: 'Attackers often use domain names that look similar to legitimate websites but contain misspellings or extra characters.'
  },
  {
    id: 7,
    question: 'What is social engineering?',
    options: [
      'Building social media websites',
      'Manipulating people to divulge confidential information',
      'Creating social networks within companies',
      'Engineering social media algorithms'
    ],
    correctAnswer: 1,
    explanation: 'Social engineering is the psychological manipulation of people to get them to divulge sensitive information or perform actions that may compromise security.'
  },
  {
    id: 8,
    question: 'Which of these is a secure way to store your passwords?',
    options: [
      'In a text file on your desktop',
      'In your email drafts',
      'Written on a sticky note',
      'Using a password manager'
    ],
    correctAnswer: 3,
    explanation: 'Password managers encrypt and securely store your passwords, requiring only one master password to access them.'
  },
  {
    id: 9,
    question: 'What is ransomware?',
    options: [
      'Software that speeds up your computer for a fee',
      'Malware that locks your files until you pay a ransom',
      'A type of antivirus software',
      'A subscription service for premium content'
    ],
    correctAnswer: 1,
    explanation: 'Ransomware is malicious software that encrypts your files, making them inaccessible until you pay a ransom to the attacker.'
  },
  {
    id: 10,
    question: 'Which practice helps prevent unauthorized access to your accounts?',
    options: [
      'Sharing your password with trusted colleagues',
      'Using the same password for multiple accounts',
      'Writing down passwords in a notebook',
      'Logging out of accounts when finished using them'
    ],
    correctAnswer: 3,
    explanation: 'Always log out of your accounts when you\'re done, especially on shared or public computers, to prevent unauthorized access.'
  }
];

function CyberKQuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [userId, setUserId] = useState('mock-user-id');
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  
  const { socket, emit, joinRoom, subscribe, unsubscribe } = useSocket();

  // Get current question
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Effect for timer
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      // Time's up, move to next question
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isTimerActive]);

  // Set default user ID and join quiz room
  useEffect(() => {
    // Set a default user ID since login is removed
    setUserId('anonymous-user');
    
    // Join the quiz room for real-time updates
    joinRoom('cyberk-quiz');
  }, [joinRoom]);

  // Handle time up
  const handleTimeUp = () => {
    setIsTimerActive(false);
    const isCorrect = false; // Time's up, so it's incorrect
    
    setAnswers([...answers, {
      questionId: currentQuestion.id,
      userAnswer: null,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    }]);
    
    setShowFeedback(true);
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    if (showFeedback) return; // Prevent changing answer after submission
    
    setSelectedOption(optionIndex);
  };

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    setIsTimerActive(false);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setAnswers([...answers, {
      questionId: currentQuestion.id,
      userAnswer: selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    }]);
    
    setShowFeedback(true);
  };

  // Handle admin notifications
  const handleNotification = useCallback((data) => {
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message: data.message,
      sender: data.sender,
      timestamp: data.timestamp
    }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== Date.now()));
    }, 5000);
  }, []);

  // Subscribe to notifications
  useEffect(() => {
    if (socket) {
      subscribe('notification', handleNotification);
      
      return () => {
        unsubscribe('notification', handleNotification);
      };
    }
  }, [socket, subscribe, unsubscribe, handleNotification]);

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      // Quiz complete
      setQuizComplete(true);
      
      // Send score to server
      if (socket) {
        emit('score_update', {
          userId,
          score,
          quizId: 'cyberk-quiz',
        });
      }
      
      // Also send via API
      submitScore();
    }
  };

  // Submit score to API
  const submitScore = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/scores/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          points: score,
          quizId: 'cyberk-quiz',
        }),
      });

      const data = await response.json();
      console.log('Score submitted:', data);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    return `${seconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">CyberK Quiz</h1>
        <p className="mt-2 text-gray-600">Test your cybersecurity knowledge</p>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-blue-600 text-white p-3 rounded-lg shadow-lg max-w-xs">
              <div className="font-bold">{notification.sender}</div>
              <div>{notification.message}</div>
            </div>
          ))}
        </div>
      )}

      {!quizComplete ? (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">Score: {score}</span>
              <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-red-500' : 'text-blue-500'}`}>
                Time: {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${showFeedback && index === currentQuestion.correctAnswer ? 'bg-green-100 border-green-500' : ''} ${showFeedback && index === selectedOption && index !== currentQuestion.correctAnswer ? 'bg-red-100 border-red-500' : ''} ${selectedOption === index && !showFeedback ? 'bg-blue-50 border-blue-500' : ''} ${selectedOption !== index && !showFeedback ? 'hover:bg-gray-50' : ''}`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${selectedOption === index ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showFeedback && (
            <div className={`p-4 rounded-lg mb-4 ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className="font-medium mb-2">{selectedOption === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</p>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            {!showFeedback ? (
              <button 
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="btn btn-primary disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="btn btn-primary"
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-6">Your final score: <span className="font-bold">{score}</span> out of {quizQuestions.length * 10}</p>
          
          <div className="mb-8">
            {score === quizQuestions.length * 10 ? (
              <div className="text-green-600 font-medium">Perfect score! You're a cybersecurity expert!</div>
            ) : score >= quizQuestions.length * 7 ? (
              <div className="text-blue-600 font-medium">Great job! You have solid cybersecurity knowledge.</div>
            ) : score >= quizQuestions.length * 5 ? (
              <div className="text-blue-600 font-medium">Good effort! Keep learning about cybersecurity.</div>
            ) : (
              <div className="text-orange-600 font-medium">You need more practice with cybersecurity concepts.</div>
            )}
          </div>
          
          <div className="space-y-4">
            <button onClick={() => navigate('/dashboard')} className="btn btn-primary w-full">
              Go to Dashboard
            </button>
            <button onClick={() => window.location.reload()} className="btn btn-outline w-full">
              Take Quiz Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CyberKQuizPage;