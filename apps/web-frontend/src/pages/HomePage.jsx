import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-20">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                CyberK
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Learn to identify phishing emails through interactive quizzes and challenges. 
                Earn points, badges, and climb the leaderboard while improving your cybersecurity skills.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/quiz"
                  className="btn btn-primary"
                >
                  Start Quiz
                </Link>
                <Link
                  to="/dashboard"
                  className="btn btn-outline"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Why Cyber Awareness Matters</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Protect Your Organization</h3>
                  <p className="mt-1 text-gray-600">Phishing attacks are responsible for over 90% of data breaches.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Build Skills Through Play</h3>
                  <p className="mt-1 text-gray-600">Gamification makes learning security best practices engaging and effective.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">Track Your Progress</h3>
                  <p className="mt-1 text-gray-600">Monitor your improvement with detailed analytics and performance metrics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage