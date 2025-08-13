import express from 'express';
import { body, param } from 'express-validator';

const router = express.Router();

// Import middleware (to be implemented)
// import { auth, adminOnly } from '../middleware/auth.js';

// Get all campaigns
router.get('/campaigns', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    campaigns: [
      {
        id: 'campaign-1',
        name: 'Q3 Awareness Training',
        description: 'Quarterly phishing awareness training for all employees',
        status: 'active',
        startDate: '2023-07-01T00:00:00Z',
        endDate: '2023-09-30T23:59:59Z',
        targetGroups: ['Marketing', 'Sales', 'Engineering'],
        quizzes: ['quiz-1', 'quiz-2'],
        participantsCount: 120,
        completionRate: 68,
        averageScore: 82.5
      },
      {
        id: 'campaign-2',
        name: 'New Hire Training',
        description: 'Initial security awareness for new employees',
        status: 'draft',
        startDate: null,
        endDate: null,
        targetGroups: ['New Hires'],
        quizzes: ['quiz-1'],
        participantsCount: 0,
        completionRate: 0,
        averageScore: 0
      },
      {
        id: 'campaign-3',
        name: 'Executive Security Training',
        description: 'Advanced security awareness for executive team',
        status: 'completed',
        startDate: '2023-05-01T00:00:00Z',
        endDate: '2023-06-15T23:59:59Z',
        targetGroups: ['Executive'],
        quizzes: ['quiz-2', 'quiz-3'],
        participantsCount: 8,
        completionRate: 100,
        averageScore: 91.2
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

// Create a new campaign
router.post('/campaigns', [
  body('name').notEmpty().withMessage('Campaign name is required'),
  body('description').optional(),
  body('targetGroups').isArray().withMessage('Target groups must be an array'),
  body('quizzes').isArray().withMessage('Quizzes must be an array'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid ISO date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid ISO date')
], (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(201).json({
    message: 'Campaign created successfully',
    campaign: {
      id: 'new-campaign-id',
      name: req.body.name,
      description: req.body.description || '',
      status: 'draft',
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || null,
      targetGroups: req.body.targetGroups || [],
      quizzes: req.body.quizzes || [],
      createdAt: new Date().toISOString()
    }
  });
});

// Get email templates
router.get('/templates', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    templates: [
      {
        id: 'template-1',
        name: 'Fake Password Reset',
        description: 'Simulated password reset email for training',
        subject: 'Urgent: Your Password Will Expire Soon',
        content: '<p>Dear {{user.name}},</p><p>Your password will expire in 24 hours. Please click <a href="{{phishing.link}}">here</a> to reset your password immediately.</p><p>IT Department</p>',
        difficulty: 'easy',
        clues: [
          'Check the sender email address carefully',
          'Hover over links before clicking',
          'Look for urgency language that pressures you to act quickly'
        ],
        createdAt: '2023-06-10T14:20:00Z',
        updatedAt: '2023-06-10T14:20:00Z'
      },
      {
        id: 'template-2',
        name: 'Fake Invoice',
        description: 'Simulated invoice email with attachment',
        subject: 'Your Invoice #INV-{{random.number}}',
        content: '<p>Hello,</p><p>Please find attached your invoice for recent services. Payment is due within 7 days.</p><p>If you have any questions, please contact our accounting department.</p><p>Regards,<br>Accounting Team</p>',
        difficulty: 'medium',
        clues: [
          'Check if you were expecting an invoice',
          'Verify the sender company and email',
          'Be cautious of unexpected attachments'
        ],
        createdAt: '2023-06-15T09:45:00Z',
        updatedAt: '2023-07-01T11:30:00Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      hasMore: false
    }
  });
});

// Get analytics and reports
router.get('/analytics', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    overview: {
      totalUsers: 150,
      activeUsers: 128,
      quizzesCompleted: 412,
      averageScore: 78.5,
      phishingDetectionRate: 82.3
    },
    byDepartment: [
      { name: 'Marketing', userCount: 25, averageScore: 76.2, completionRate: 92 },
      { name: 'Sales', userCount: 30, averageScore: 72.8, completionRate: 87 },
      { name: 'Engineering', userCount: 65, averageScore: 85.4, completionRate: 95 },
      { name: 'HR', userCount: 10, averageScore: 79.1, completionRate: 100 },
      { name: 'Executive', userCount: 8, averageScore: 91.2, completionRate: 100 }
    ],
    byTimeframe: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Quizzes Completed',
          data: [45, 62, 78, 95]
        },
        {
          label: 'Average Score',
          data: [72.5, 75.8, 79.2, 82.6]
        }
      ]
    },
    commonMistakes: [
      { category: 'Urgency Language', failureRate: 35 },
      { category: 'Suspicious Links', failureRate: 28 },
      { category: 'Spoofed Domains', failureRate: 42 },
      { category: 'Grammar/Spelling Errors', failureRate: 15 }
    ]
  });
});

// Get all users (admin only)
router.get('/users', (req, res) => {
  // Placeholder until auth middleware and controller are implemented
  res.status(200).json({
    users: [
      {
        id: 'user-123',
        name: 'Jane Smith',
        email: 'jane@example.com',
        department: 'Marketing',
        role: 'user',
        status: 'active',
        lastLogin: '2023-08-10T09:15:00Z',
        quizzesCompleted: 12,
        averageScore: 85.3
      },
      {
        id: 'user-456',
        name: 'John Doe',
        email: 'john@example.com',
        department: 'Engineering',
        role: 'user',
        status: 'active',
        lastLogin: '2023-08-09T14:30:00Z',
        quizzesCompleted: 10,
        averageScore: 78.9
      },
      {
        id: 'user-789',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        department: 'Sales',
        role: 'admin',
        status: 'active',
        lastLogin: '2023-08-10T11:45:00Z',
        quizzesCompleted: 15,
        averageScore: 92.1
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