import { useState } from 'react'

// Mock data for demonstration
const mockEmails = [
  {
    id: 1,
    subject: 'Urgent: Your Account Will Be Suspended',
    sender: 'security@bankofamerica-secure.com',
    content: `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center;">
        <img src="https://example.com/bank-logo.png" alt="Bank Logo" style="width: 200px;" />
      </div>
      <h2>URGENT: Your Account Access Will Be Suspended</h2>
      <p>Dear Valued Customer,</p>
      <p>We have detected unusual activity on your account. If you do not verify your information within 24 hours, your account access will be suspended.</p>
      <p>Please click the link below to verify your account information:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="#" style="background-color: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Account Now</a>
      </div>
      <p>If you did not request this verification, please ignore this email.</p>
      <p>Thank you,<br />Bank of America Security Team</p>
    </div>`,
    isPhishing: true,
    clues: [
      'The sender email domain is not the official Bank of America domain',
      'The email creates urgency to prompt immediate action',
      'The email contains grammatical errors',
      'The link does not point to the official Bank of America website'
    ]
  },
  {
    id: 2,
    subject: 'Your Monthly Statement is Ready',
    sender: 'statements@bankofamerica.com',
    content: `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center;">
        <img src="https://example.com/bank-logo.png" alt="Bank Logo" style="width: 200px;" />
      </div>
      <h2>Your Monthly Statement is Ready</h2>
      <p>Dear Valued Customer,</p>
      <p>Your monthly account statement for ending July 31, 2023 is now available in your online banking portal.</p>
      <p>To view your statement, please log in to your account through our official website or mobile app.</p>
      <p>For security reasons, we do not include links or attachments in statement notification emails.</p>
      <p>Thank you for banking with us.</p>
      <p>Sincerely,<br />Bank of America Customer Service</p>
      <hr />
      <p style="font-size: 12px; color: #666;">
        This is an automated message. Please do not reply to this email. If you have questions, please contact customer service through your online banking portal or call the number on the back of your card.
      </p>
    </div>`,
    isPhishing: false,
    clues: [
      'The sender email is from the official domain',
      'The email does not create false urgency',
      'The email does not ask for personal information',
      'The email does not contain suspicious links or attachments',
      'The email advises to log in through the official website or app'
    ]
  },
  {
    id: 3,
    subject: 'Invoice #INV-2023-8756 Payment Required',
    sender: 'accounting@microsoft-billing.net',
    content: `<div style="font-family: Arial, sans-serif; padding: 20px;">
      <div style="text-align: center;">
        <img src="https://example.com/microsoft-logo.png" alt="Microsoft Logo" style="width: 200px;" />
      </div>
      <h2>Invoice Payment Required</h2>
      <p>Dear Microsoft Customer,</p>
      <p>This is a reminder that invoice #INV-2023-8756 for your Microsoft 365 subscription is past due.</p>
      <p>To avoid service interruption, please process the payment immediately by downloading the invoice and following the payment instructions.</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="#" style="background-color: #0078d4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Download Invoice</a>
      </div>
      <p>If you have already made the payment, please disregard this notice.</p>
      <p>Thank you,<br />Microsoft Billing Team</p>
    </div>`,
    isPhishing: true,
    clues: [
      'The sender email domain is not an official Microsoft domain',
      'The email creates urgency about a past due invoice',
      'The download link is suspicious',
      'Microsoft typically doesn\'t send invoice reminders with download links'
    ]
  }
];

function PhishingQuizPage() {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentEmail = mockEmails[currentEmailIndex];

  const handleAnswer = (isPhishing) => {
    setSelectedAnswer(isPhishing);
    setShowFeedback(true);
    
    if (isPhishing === currentEmail.isPhishing) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentEmailIndex < mockEmails.length - 1) {
      setCurrentEmailIndex(currentEmailIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentEmailIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Phishing Email Quiz</h1>
        <p className="mt-2 text-gray-600">Can you identify which emails are legitimate and which are phishing attempts?</p>
      </div>

      {!quizComplete ? (
        <div className="card max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Email {currentEmailIndex + 1} of {mockEmails.length}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Score: {score}</span>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <div className="font-medium">Subject: {currentEmail.subject}</div>
              <div className="text-sm text-gray-600">From: {currentEmail.sender}</div>
            </div>
            <div className="p-4 bg-white">
              <div dangerouslySetInnerHTML={{ __html: currentEmail.content }} />
            </div>
          </div>

          {!showFeedback ? (
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => handleAnswer(false)} 
                className="btn btn-outline"
              >
                Legitimate Email
              </button>
              <button 
                onClick={() => handleAnswer(true)} 
                className="btn btn-outline"
              >
                Phishing Attempt
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${selectedAnswer === currentEmail.isPhishing ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <div className="font-medium">
                  {selectedAnswer === currentEmail.isPhishing 
                    ? '✓ Correct!' 
                    : '✗ Incorrect!'}
                </div>
                <p>
                  This email is {currentEmail.isPhishing ? 'a phishing attempt' : 'legitimate'}.
                </p>
              </div>

              {currentEmail.clues && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Clues to look for:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {currentEmail.clues.map((clue, index) => (
                      <li key={index} className="text-gray-700">{clue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <button onClick={handleNext} className="btn btn-primary">
                  {currentEmailIndex < mockEmails.length - 1 ? 'Next Email' : 'See Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-lg mb-6">Your final score: <span className="font-bold">{score}</span> out of {mockEmails.length * 10}</p>
          
          <div className="mb-8">
            {score === mockEmails.length * 10 ? (
              <div className="text-green-600 font-medium">Perfect score! You're a phishing detection expert!</div>
            ) : score >= mockEmails.length * 5 ? (
              <div className="text-blue-600 font-medium">Good job! You're on your way to becoming a phishing detection expert.</div>
            ) : (
              <div className="text-orange-600 font-medium">Keep practicing! Phishing emails can be tricky to spot.</div>
            )}
          </div>
          
          <button onClick={handleRestart} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export default PhishingQuizPage;