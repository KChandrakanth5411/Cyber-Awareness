import express from 'express';
import { param } from 'express-validator';

const router = express.Router();

// Import middleware (to be implemented)
// import { auth } from '../middleware/auth.js';

// Get available quizzes
router.get('/', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    quizzes: [
      {
        id: 'quiz-1',
        title: 'Phishing Email Basics',
        description: 'Learn to identify basic phishing attempts in emails',
        difficulty: 'beginner',
        questionsCount: 10,
        estimatedTime: '5 minutes',
        points: 100
      },
      {
        id: 'quiz-2',
        title: 'Advanced Phishing Techniques',
        description: 'Test your knowledge on sophisticated phishing attacks',
        difficulty: 'advanced',
        questionsCount: 15,
        estimatedTime: '10 minutes',
        points: 200
      },
      {
        id: 'quiz-3',
        title: 'Social Engineering Awareness',
        description: 'Identify social engineering tactics in various scenarios',
        difficulty: 'intermediate',
        questionsCount: 12,
        estimatedTime: '8 minutes',
        points: 150
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

// Get a specific quiz
router.get('/:quizId', [
  param('quizId').notEmpty().withMessage('Quiz ID is required')
], (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    id: req.params.quizId,
    title: 'Phishing Email Basics',
    description: 'Learn to identify basic phishing attempts in emails',
    difficulty: 'beginner',
    instructions: 'For each email, determine if it is legitimate or a phishing attempt. Look for clues in the sender, content, and links.',
    questions: [
      {
        id: 'q1',
        type: 'phishing_email',
        content: {
          sender: 'security@bankofamerica-secure.com',
          subject: 'Urgent: Your Account Has Been Compromised',
          body: 'Dear Customer, We have detected suspicious activity on your account. Click the link below to verify your identity and secure your account immediately. [Secure My Account Now]',
          attachments: [],
          links: ['https://bank0famerica-secure.com/verify']
        },
        options: [
          { id: 'a', text: 'Legitimate Email' },
          { id: 'b', text: 'Phishing Attempt' }
        ],
        correctAnswer: 'b',
        explanation: 'This is a phishing email. The sender domain is suspicious (bankofamerica-secure.com instead of bankofamerica.com), the message creates urgency, and the link URL contains a zero instead of the letter "o".',
        points: 10
      },
      // More questions would be here
    ],
    totalPoints: 100,
    passingScore: 70
  });
});

// Submit quiz answers
router.post('/:quizId/submit', [
  param('quizId').notEmpty().withMessage('Quiz ID is required')
], (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  // Expect req.body to contain an array of answers: [{questionId: 'q1', answer: 'b'}, ...]
  
  // Mock result calculation
  const mockCorrectAnswers = 8;
  const mockTotalQuestions = 10;
  const mockScore = (mockCorrectAnswers / mockTotalQuestions) * 100;
  const mockPassed = mockScore >= 70;
  const mockPointsEarned = mockCorrectAnswers * 10;
  
  res.status(200).json({
    quizId: req.params.quizId,
    result: {
      correctAnswers: mockCorrectAnswers,
      totalQuestions: mockTotalQuestions,
      score: mockScore,
      passed: mockPassed,
      pointsEarned: mockPointsEarned,
      feedback: mockPassed ? 'Great job! You have a good eye for phishing attempts.' : 'You need more practice. Review the explanations for the questions you missed.',
      detailedResults: [
        { questionId: 'q1', userAnswer: 'b', correctAnswer: 'b', isCorrect: true },
        // More detailed results would be here
      ]
    },
    rewards: {
      badgeEarned: mockPassed ? 'Phishing Spotter' : null,
      levelUp: mockPassed && mockScore > 90,
      streakIncreased: true,
      currentStreak: 3
    }
  });
});

// Get user's quiz history
router.get('/history', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    history: [
      {
        quizId: 'quiz-1',
        title: 'Phishing Email Basics',
        date: '2023-08-10T15:30:00Z',
        score: 80,
        passed: true,
        pointsEarned: 80
      },
      {
        quizId: 'quiz-3',
        title: 'Social Engineering Awareness',
        date: '2023-08-03T14:20:00Z',
        score: 75,
        passed: true,
        pointsEarned: 112
      },
      {
        quizId: 'quiz-2',
        title: 'Advanced Phishing Techniques',
        date: '2023-08-01T11:10:00Z',
        score: 60,
        passed: false,
        pointsEarned: 120
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