import { useNavigate } from 'react-router-dom';
import { RocketIcon, CalendarIcon, CheckIcon, LightningBoltIcon, PersonIcon, BarChartIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-secondary via-surface-primary to-surface-secondary relative overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-300 to-purple-300 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-accent-300 to-emerald-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-300 to-orange-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-10 container-custom py-6">
        <div className="glass-card px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-brand-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">
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
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container-custom section">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 glass-card text-brand-700 rounded-full text-sm font-semibold mb-8 animate-fade-in-down hover:scale-105 transition-transform">
            <LightningBoltIcon className="w-4 h-4" />
            <span>Enterprise Learning Management System</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance animate-fade-in-up leading-tight">
            Transform Your
            <br />
            <span className="text-gradient animate-glow">Learning Journey</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            A comprehensive platform for students, trainers, mentors, and companies to manage education and professional development with <span className="text-gradient-accent font-semibold">cutting-edge technology</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/signup')}
              showArrow
            >
              Start Learning Today
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In to Dashboard
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '10K+', label: 'Active Students', icon: PersonIcon },
              { value: '500+', label: 'Expert Trainers', icon: RocketIcon },
              { value: '95%', label: 'Success Rate', icon: BarChartIcon },
              { value: '24/7', label: 'Support', icon: LightningBoltIcon },
            ].map((stat, index) => (
              <div key={index} className="stat-card group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-brand-600" />
                </div>
                <div className="stat-card-value mb-1">{stat.value}</div>
                <div className="text-sm text-text-tertiary font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Feature 1 - Personalized Roadmaps */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center mb-6 shadow-brand group-hover:shadow-brand-lg transition-shadow">
              <RocketIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Personalized Roadmaps</h3>
            <p className="text-text-secondary leading-relaxed">
              Custom learning paths tailored to each student's goals and progress with real-time mentor oversight and adaptive curriculum.
            </p>
          </div>

          {/* Feature 2 - Smart Scheduling */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-accent group-hover:shadow-xl transition-shadow">
              <CalendarIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Smart Scheduling</h3>
            <p className="text-text-secondary leading-relaxed">
              Efficient session management with automated scheduling, attendance tracking, and intelligent resource allocation.
            </p>
          </div>

          {/* Feature 3 - Progress Tracking */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-success to-success-dark rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow">
              <CheckIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Progress Tracking</h3>
            <p className="text-text-secondary leading-relaxed">
              Real-time analytics and progress monitoring for students, trainers, companies with advanced reporting capabilities.
            </p>
          </div>

          {/* Feature 4 - Multi-Portal Access */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow">
              <PersonIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Multi-Portal Access</h3>
            <p className="text-text-secondary leading-relaxed">
              Dedicated portals for students, trainers, mentors, administrators, and companies with role-specific features.
            </p>
          </div>

          {/* Feature 5 - Enterprise Grade */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow">
              <BarChartIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Enterprise Grade</h3>
            <p className="text-text-secondary leading-relaxed">
              Built for scale with robust security, comprehensive analytics, and features designed for corporate training programs.
            </p>
          </div>

          {/* Feature 6 - 24/7 Support */}
          <div className="card-gradient p-8 group hover:scale-105 transition-all animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow">
              <LightningBoltIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-text-primary">Lightning Fast</h3>
            <p className="text-text-secondary leading-relaxed">
              Optimized performance with instant page loads, real-time updates, and seamless navigation across all devices.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-purple-600 rounded-xl flex items-center justify-center">
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
