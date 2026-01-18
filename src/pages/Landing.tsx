import { useNavigate } from 'react-router-dom';
import { RocketIcon, CalendarIcon, CheckIcon, LightningBoltIcon, PersonIcon, BarChartIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950 opacity-90" />

      {/* Accent glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-600/5 blur-3xl rounded-full" />

      {/* Navigation */}
      <nav className="relative z-10 container-custom py-6">
        <div className="flex items-center justify-between px-6 py-4 bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-lg font-bold text-text-primary">
              Academia FRO
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container-custom section">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-sm font-medium mb-8 text-text-secondary">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span>Enterprise Learning Management System</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-text-primary">Transform Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            A comprehensive platform for students, trainers, mentors, and companies to manage education and professional development with cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-20">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
            >
              Start Learning Today
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In to Dashboard
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
            {[
              { value: '10K+', label: 'Active Students', icon: PersonIcon },
              { value: '500+', label: 'Expert Trainers', icon: RocketIcon },
              { value: '95%', label: 'Success Rate', icon: BarChartIcon },
              { value: '24/7', label: 'Support', icon: LightningBoltIcon },
            ].map((stat, index) => (
              <div key={index} className="bg-dark-800 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all">
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-tertiary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <RocketIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Personalized Roadmaps</h3>
            <p className="text-text-secondary leading-relaxed">
              Custom learning paths tailored to each student's goals with real-time mentor oversight.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <CalendarIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Smart Scheduling</h3>
            <p className="text-text-secondary leading-relaxed">
              Efficient session management with automated scheduling and attendance tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <CheckIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Progress Tracking</h3>
            <p className="text-text-secondary leading-relaxed">
              Real-time analytics and progress monitoring for all stakeholders.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <PersonIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Multi-Portal Access</h3>
            <p className="text-text-secondary leading-relaxed">
              Dedicated portals for students, trainers, mentors, and companies.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <BarChartIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Enterprise Grade</h3>
            <p className="text-text-secondary leading-relaxed">
              Built for scale with robust security and comprehensive analytics.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <LightningBoltIcon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Lightning Fast</h3>
            <p className="text-text-secondary leading-relaxed">
              Optimized performance with instant page loads and real-time updates.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-dark-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Academia FRO</h3>
                <p className="text-sm text-text-tertiary">Enterprise Learning Platform</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-text-secondary">
                © 2026 Academia FRO. All rights reserved.
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Built with passion for learning excellence
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
