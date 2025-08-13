import express from 'express';
import { param, body } from 'express-validator';

const router = express.Router();

// Import middleware (to be implemented)
// import { auth } from '../middleware/auth.js';

// Mock data for CyberK quizzes
const cyberKQuizzes = [
  {
    id: 'cyberk-1',
    title: 'Cyber Security Fundamentals',
    description: 'Test your knowledge of basic cyber security concepts',
    difficulty: 'beginner',
    questionsCount: 10,
    estimatedTime: '5 minutes',
    points: 100
  },
  {
    id: 'cyberk-2',
    title: 'Password Security',
    description: 'Learn about creating and managing secure passwords',
    difficulty: 'beginner',
    questionsCount: 8,
    estimatedTime: '4 minutes',
    points: 80
  },
  {
    id: 'cyberk-3',
    title: 'Social Engineering Tactics',
    description: 'Identify common social engineering techniques',
    difficulty: 'intermediate',
    questionsCount: 12,
    estimatedTime: '8 minutes',
    points: 120
  },
  {
    id: 'cyberk-4',
    title: 'Network Security',
    description: 'Test your knowledge of network security principles',
    difficulty: 'advanced',
    questionsCount: 15,
    estimatedTime: '10 minutes',
    points: 150
  }
];

// Mock questions for CyberK quizzes
const quizQuestions = {
  'cyberk-1': [
    {
      id: 'q1',
      question: 'What is the primary purpose of a firewall?',
      options: [
        { id: 'a', text: 'To prevent unauthorized access to or from a private network' },
        { id: 'b', text: 'To remove viruses from infected files' },
        { id: 'c', text: 'To encrypt data during transmission' },
        { id: 'd', text: 'To back up important files' }
      ],
      correctAnswer: 'a',
      explanation: 'A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization\'s previously established security policies.',
      points: 10
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a good password practice?',
      options: [
        { id: 'a', text: 'Using a different password for each account' },
        { id: 'b', text: 'Including a mix of letters, numbers, and symbols' },
        { id: 'c', text: 'Writing down passwords and keeping them near your computer' },
        { id: 'd', text: 'Using a password manager' }
      ],
      correctAnswer: 'c',
      explanation: 'Writing down passwords and keeping them near your computer makes them easily accessible to anyone with physical access to your workspace.',
      points: 10
    },
    {
      id: 'q3',
      question: 'What is phishing?',
      options: [
        { id: 'a', text: 'A type of malware that encrypts files and demands ransom' },
        { id: 'b', text: 'The practice of sending deceptive emails to trick recipients into revealing sensitive information' },
        { id: 'c', text: 'A method for securing wireless networks' },
        { id: 'd', text: 'A technique for improving password strength' }
      ],
      correctAnswer: 'b',
      explanation: 'Phishing is a cybercrime in which targets are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data.',
      points: 10
    },
    {
      id: 'q4',
      question: 'What does the acronym "VPN" stand for?',
      options: [
        { id: 'a', text: 'Virtual Private Network' },
        { id: 'b', text: 'Very Powerful Network' },
        { id: 'c', text: 'Virtual Public Network' },
        { id: 'd', text: 'Verified Personal Network' }
      ],
      correctAnswer: 'a',
      explanation: 'VPN stands for Virtual Private Network, which extends a private network across a public network and enables users to send and receive data across shared or public networks as if their computing devices were directly connected to the private network.',
      points: 10
    },
    {
      id: 'q5',
      question: 'Which of the following is an example of two-factor authentication?',
      options: [
        { id: 'a', text: 'Using a password and a PIN' },
        { id: 'b', text: 'Using a password and receiving a code on your mobile device' },
        { id: 'c', text: 'Using a fingerprint and facial recognition' },
        { id: 'd', text: 'Using the same password for multiple accounts' }
      ],
      correctAnswer: 'b',
      explanation: 'Two-factor authentication combines something you know (like a password) with something you have (like a mobile device that receives a verification code).',
      points: 10
    },
    {
      id: 'q6',
      question: 'What is malware?',
      options: [
        { id: 'a', text: 'Software designed to help manage your passwords' },
        { id: 'b', text: 'Hardware that protects against power surges' },
        { id: 'c', text: 'Software designed to damage or gain unauthorized access to a computer system' },
        { id: 'd', text: 'A type of secure web browser' }
      ],
      correctAnswer: 'c',
      explanation: 'Malware (short for "malicious software") is any software intentionally designed to cause damage to a computer, server, client, or computer network.',
      points: 10
    },
    {
      id: 'q7',
      question: 'What is a data breach?',
      options: [
        { id: 'a', text: 'A backup of important files' },
        { id: 'b', text: 'A security incident in which sensitive, protected or confidential data is copied, transmitted, viewed, stolen or used by an unauthorized individual' },
        { id: 'c', text: 'A method for encrypting data' },
        { id: 'd', text: 'A technique for organizing data in a database' }
      ],
      correctAnswer: 'b',
      explanation: 'A data breach is a security violation in which sensitive, protected or confidential data is copied, transmitted, viewed, stolen or used by an individual unauthorized to do so.',
      points: 10
    },
    {
      id: 'q8',
      question: 'Which of the following is NOT a common sign of a phishing email?',
      options: [
        { id: 'a', text: 'Poor grammar and spelling errors' },
        { id: 'b', text: 'Urgent requests for personal information' },
        { id: 'c', text: 'Suspicious attachments or links' },
        { id: 'd', text: 'Email sent from a colleague you regularly communicate with, using their usual signature and writing style' }
      ],
      correctAnswer: 'd',
      explanation: 'While phishing emails often contain poor grammar, urgent requests, and suspicious links, an email that appears to be from a known colleague with their usual writing style is less likely to be a phishing attempt (though account compromise is still possible).',
      points: 10
    },
    {
      id: 'q9',
      question: 'What is social engineering in the context of cybersecurity?',
      options: [
        { id: 'a', text: 'Building secure social media platforms' },
        { id: 'b', text: 'Using technical means to hack into systems' },
        { id: 'c', text: 'Manipulating people into breaking security procedures or revealing confidential information' },
        { id: 'd', text: 'Creating social networks within an organization' }
      ],
      correctAnswer: 'c',
      explanation: 'Social engineering is the psychological manipulation of people into performing actions or divulging confidential information. It relies on human error rather than technical hacking techniques.',
      points: 10
    },
    {
      id: 'q10',
      question: 'What should you do if you suspect your account has been compromised?',
      options: [
        { id: 'a', text: 'Do nothing and hope the problem resolves itself' },
        { id: 'b', text: 'Immediately change your password and enable two-factor authentication if available' },
        { id: 'c', text: 'Share your concern on social media' },
        { id: 'd', text: 'Delete your account permanently' }
      ],
      correctAnswer: 'b',
      explanation: 'If you suspect your account has been compromised, you should immediately change your password and enable additional security measures like two-factor authentication. You should also check for any unauthorized activities and report the incident to the service provider.',
      points: 10
    }
  ],
  // More quiz questions would be defined here for other quiz IDs
};

// Get all CyberK quizzes
router.get('/', (req, res) => {
  res.status(200).json({
    quizzes: cyberKQuizzes,
    pagination: {
      page: 1,
      limit: 10,
      total: cyberKQuizzes.length,
      hasMore: false
    }
  });
});

// Get a specific CyberK quiz
router.get('/:quizId', [
  param('quizId').notEmpty().withMessage('Quiz ID is required')
], (req, res) => {
  const quizId = req.params.quizId;
  const quiz = cyberKQuizzes.find(q => q.id === quizId);
  
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  
  const questions = quizQuestions[quizId] || [];
  
  // Remove correct answers before sending to client
  const clientQuestions = questions.map(q => {
    const { correctAnswer, explanation, ...rest } = q;
    return rest;
  });
  
  res.status(200).json({
    ...quiz,
    instructions: 'Read each question carefully and select the best answer. Your score will be calculated at the end of the quiz.',
    questions: clientQuestions,
    totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
    passingScore: 70
  });
});

// Submit quiz answers
router.post('/:quizId/submit', [
  param('quizId').notEmpty().withMessage('Quiz ID is required'),
  body('answers').isArray().withMessage('Answers must be an array'),
  body('answers.*.questionId').notEmpty().withMessage('Question ID is required for each answer'),
  body('answers.*.answer').notEmpty().withMessage('Answer is required for each question')
], (req, res) => {
  const quizId = req.params.quizId;
  const { answers } = req.body;
  
  const quiz = cyberKQuizzes.find(q => q.id === quizId);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  
  const questions = quizQuestions[quizId] || [];
  if (questions.length === 0) {
    return res.status(404).json({ message: 'No questions found for this quiz' });
  }
  
  // Calculate results
  let correctCount = 0;
  let totalPoints = 0;
  
  const detailedResults = answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) {
      return {
        questionId: answer.questionId,
        userAnswer: answer.answer,
        correctAnswer: null,
        isCorrect: false,
        explanation: 'Question not found'
      };
    }
    
    const isCorrect = answer.answer === question.correctAnswer;
    if (isCorrect) {
      correctCount++;
      totalPoints += question.points;
    }
    
    return {
      questionId: answer.questionId,
      userAnswer: answer.answer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation
    };
  });
  
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;
  
  // Emit socket event for real-time updates
  if (req.app.get('io')) {
    const io = req.app.get('io');
    
    // Emit score update to all clients
    io.emit('score_update', {
      userId: req.body.userId || 'anonymous',
      points: totalPoints,
      quizId,
      quizTitle: quiz.title
    });
    
    // If user passed, emit achievement notification
    if (passed) {
      io.emit('new_achievement', {
        userId: req.body.userId || 'anonymous',
        achievement: {
          id: `${quizId}-passed`,
          title: `${quiz.title} Master`,
          description: `Successfully completed the ${quiz.title} quiz with a score of ${score}%`,
          date: new Date().toISOString()
        }
      });
    }
  }
  
  res.status(200).json({
    quizId,
    result: {
      correctAnswers: correctCount,
      totalQuestions: questions.length,
      score,
      passed,
      pointsEarned: totalPoints,
      feedback: passed 
        ? 'Great job! You have a good understanding of cyber security concepts.' 
        : 'You need more practice. Review the explanations for the questions you missed.',
      detailedResults
    },
    rewards: {
      badgeEarned: passed ? `${quiz.title} Expert` : null,
      levelUp: passed && score > 90,
      streakIncreased: true,
      currentStreak: 3
    }
  });
});

// Get user's quiz history
router.get('/history/:userId', (req, res) => {
  // This would normally fetch from a database
  res.status(200).json({
    history: [
      {
        quizId: 'cyberk-1',
        title: 'Cyber Security Fundamentals',
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        score: 80,
        passed: true,
        pointsEarned: 80
      },
      {
        quizId: 'cyberk-2',
        title: 'Password Security',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        score: 75,
        passed: true,
        pointsEarned: 60
      },
      {
        quizId: 'cyberk-3',
        title: 'Social Engineering Tactics',
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        score: 60,
        passed: false,
        pointsEarned: 72
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

// Admin endpoints

// Get all quiz results (admin only)
router.get('/admin/results', (req, res) => {
  // This would normally check for admin authentication
  // and fetch from a database
  res.status(200).json({
    results: [
      {
        userId: 'user-1',
        userName: 'John Doe',
        quizId: 'cyberk-1',
        quizTitle: 'Cyber Security Fundamentals',
        date: new Date(Date.now() - 86400000).toISOString(),
        score: 80,
        passed: true,
        pointsEarned: 80
      },
      {
        userId: 'user-2',
        userName: 'Jane Smith',
        quizId: 'cyberk-1',
        quizTitle: 'Cyber Security Fundamentals',
        date: new Date(Date.now() - 172800000).toISOString(),
        score: 90,
        passed: true,
        pointsEarned: 90
      },
      {
        userId: 'user-3',
        userName: 'Bob Johnson',
        quizId: 'cyberk-2',
        quizTitle: 'Password Security',
        date: new Date(Date.now() - 259200000).toISOString(),
        score: 65,
        passed: false,
        pointsEarned: 52
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

// Create a new quiz (admin only)
router.post('/admin/create', (req, res) => {
  // This would normally check for admin authentication
  // and save to a database
  res.status(201).json({
    message: 'Quiz created successfully',
    quizId: 'cyberk-' + (cyberKQuizzes.length + 1)
  });
});

export default router;