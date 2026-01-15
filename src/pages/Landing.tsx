import { useNavigate } from 'react-router-dom';
import { RocketIcon, CalendarIcon, CheckIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-secondary relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container-custom py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-white font-semibold text-lg">A</span>
          </div>
          <h1 className="text-lg font-semibold text-text-primary">
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
            showArrow
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container-custom section">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-medium mb-8">
            <span>Enterprise Learning Management System</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-text-primary text-balance">
            Transform Your
            <br />
            <span className="text-brand-600">Learning Experience</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive platform for students, trainers, mentors, and companies to manage education and professional development seamlessly.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/signup')}
              showArrow
            >
              Get Started Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="card-hover p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
              <RocketIcon className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Personalized Roadmaps</h3>
            <p className="text-text-secondary leading-relaxed">
              Custom learning paths tailored to each student's goals and progress with mentor oversight.
            </p>
          </div>

          <div className="card-hover p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-6">
              <CalendarIcon className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Smart Scheduling</h3>
            <p className="text-text-secondary leading-relaxed">
              Efficient session management with automated scheduling and attendance tracking.
            </p>
          </div>

          <div className="card-hover p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-success-light rounded-xl flex items-center justify-center mb-6">
              <CheckIcon className="w-6 h-6 text-success-dark" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Progress Tracking</h3>
            <p className="text-text-secondary leading-relaxed">
              Real-time analytics and progress monitoring for students, trainers, and companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
