import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RocketIcon, CalendarIcon, CheckIcon, LightningBoltIcon, PersonIcon, BarChartIcon, StarFilledIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-600/5 blur-3xl rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent-emerald/5 blur-3xl rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <nav className="relative z-10 container-custom py-6">
        <div className="flex items-center justify-between px-6 py-4 bg-dark-800/50 backdrop-blur-md rounded-2xl border border-dark-700 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-lg font-bold text-text-primary">Academia FRO</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
            <Button variant="primary" onClick={() => navigate('/signup')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container-custom py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-text-secondary">Enterprise Learning Management System</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-text-primary">Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Learning Journey
              </span>
            </h1>

            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Empower students, trainers, and companies with a comprehensive platform designed for excellence in education and professional development.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
                Start Learning Today
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
                Sign In to Dashboard
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <StarFilledIcon className="w-5 h-5 text-primary-500" />
                <span>10K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-5 h-5 text-success" />
                <span>500+ Trainers</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {isLoading ? (
              <div className="aspect-square bg-dark-700 rounded-2xl animate-pulse" />
            ) : (
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-dark-600 shadow-2xl">
                <img
                  src="/images/825081fd7b965238c3f9828186ded94b95bd682a.png"
                  alt="Learning Platform Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10K+', label: 'Active Students', icon: PersonIcon },
            { value: '500+', label: 'Expert Trainers', icon: RocketIcon },
            { value: '95%', label: 'Success Rate', icon: BarChartIcon },
            { value: '24/7', label: 'Support', icon: LightningBoltIcon },
          ].map((stat, index) => (
            <div key={index} className="bg-dark-800 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all hover:scale-105">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1 text-center">{stat.value}</div>
              <div className="text-sm text-text-tertiary text-center">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container-custom py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Powerful Features</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to manage modern learning and development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <RocketIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Personalized Roadmaps</h3>
            <p className="text-text-secondary leading-relaxed">
              Custom learning paths tailored to each student's goals with real-time mentor oversight.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <CalendarIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Smart Scheduling</h3>
            <p className="text-text-secondary leading-relaxed">
              Efficient session management with automated scheduling and attendance tracking.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <CheckIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Progress Tracking</h3>
            <p className="text-text-secondary leading-relaxed">
              Real-time analytics and progress monitoring for all stakeholders.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <PersonIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Multi-Portal Access</h3>
            <p className="text-text-secondary leading-relaxed">
              Dedicated portals for students, trainers, mentors, and companies.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <BarChartIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Enterprise Grade</h3>
            <p className="text-text-secondary leading-relaxed">
              Built for scale with robust security and comprehensive analytics.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-dark-800 border border-dark-600 rounded-2xl p-8 hover:border-primary-600/50 transition-all group">
            <div className="w-14 h-14 bg-primary-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600/20 transition-colors">
              <LightningBoltIcon className="w-7 h-7 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-text-primary">Lightning Fast</h3>
            <p className="text-text-secondary leading-relaxed">
              Optimized performance with instant page loads and real-time updates.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial/Showcase Section with Image */}
      <section className="relative z-10 container-custom py-20">
        <div className="bg-gradient-to-r from-primary-600/10 to-purple-600/10 border border-primary-600/20 rounded-3xl p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Trusted by Leading Organizations
              </h2>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Join thousands of students and hundreds of organizations using Academia FRO to transform their learning and development programs.
              </p>
              <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
                Get Started Now
              </Button>
            </div>
            <div className="relative">
              {isLoading ? (
                <div className="aspect-video bg-dark-700 rounded-2xl animate-pulse" />
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden border border-dark-600 shadow-2xl">
                  <img
                    src="/images/96d8a032557797d4cf969ffa5fabbe22d5e952db.png"
                    alt="Platform Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-dark-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
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
