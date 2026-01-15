import { useNavigate } from 'react-router-dom';
import { RocketIcon, CalendarIcon, CheckIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-gradient-purple to-gradient-pink opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-light opacity-5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Academia FRO
          </h1>
        </div>
        <div className="flex items-center gap-4">
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="badge-primary px-4 py-2 text-sm font-semibold">
              Enterprise Learning Management System
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Transform Your
            <br />
            Learning Experience
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive platform for students, trainers, mentors, and companies to manage education and professional development seamlessly.
          </p>
          <div className="flex items-center justify-center gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-info/20 to-info/10 rounded-xl flex items-center justify-center mb-6">
              <RocketIcon className="w-7 h-7 text-info" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-text-primary">Personalized Roadmaps</h3>
            <p className="text-text-muted">
              Custom learning paths tailored to each student's goals and progress with mentor oversight.
            </p>
          </div>

          <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center mb-6">
              <CalendarIcon className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-text-primary">Smart Scheduling</h3>
            <p className="text-text-muted">
              Efficient session management with automated scheduling and attendance tracking.
            </p>
          </div>

          <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-gradient-purple/20 to-gradient-pink/10 rounded-xl flex items-center justify-center mb-6">
              <CheckIcon className="w-7 h-7 text-gradient-purple" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-text-primary">Progress Tracking</h3>
            <p className="text-text-muted">
              Real-time analytics and progress monitoring for students, trainers, and companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

