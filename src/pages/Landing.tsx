import { useNavigate } from 'react-router-dom';
import { CheckIcon, ArrowRightIcon, PersonIcon, RocketIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

export default function Landing() {
  const navigate = useNavigate();

  const stats = [
    { value: '10,000+', label: 'Active Learners' },
    { value: '500+', label: 'Expert Trainers' },
    { value: '95%', label: 'Success Rate' },
    { value: '4.5h/week', label: 'Learning Time' },
  ];

  const features = [
    {
      title: 'Personalized Learning Roadmaps',
      description: 'Every student gets a custom roadmap designed with their trainer, tailored to their goals and pace.',
      icon: '🎯',
    },
    {
      title: 'Real Trainer-Student Time',
      description: 'Guaranteed 4.5+ hours of live trainer time every week. No pre-recorded videos, real learning.',
      icon: '👨‍🏫',
    },
    {
      title: 'Master Mentor Oversight',
      description: 'Expert mentors review your progress every 1-2 weeks to ensure you\'re on track.',
      icon: '✅',
    },
    {
      title: 'Transparent Payments',
      description: 'Pay monthly for active learning. Your money unlocks real education, not promises.',
      icon: '💰',
    },
    {
      title: 'Quality Over Quantity',
      description: 'We control trainer capacity to ensure every student gets proper attention.',
      icon: '⭐',
    },
    {
      title: 'Wing Specialization',
      description: 'Choose your wing (Frontend, Backend, etc.) and learn from specialized experts.',
      icon: '🚀',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="border-b border-dark-700 bg-dark-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container-custom py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">Umbrella LMS</h1>
                <p className="text-xs text-text-tertiary">Real Learning, Real Results</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="primary" onClick={() => navigate('/signup')}>
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-custom py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full text-sm font-medium text-primary-400">
              Not Your Typical Online Course Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-text-primary">Stop Watching Videos.</span>
            <br />
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              Start Real Learning.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Umbrella LMS enforces <strong className="text-text-primary">personalized roadmaps</strong>,
            guarantees <strong className="text-text-primary">live trainer time</strong>, and ensures
            you actually learn—not just consume content.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
              <RocketIcon className="w-5 h-5" />
              Get Started Today
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/login')}>
              <PersonIcon className="w-5 h-5" />
              Sign In
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-success" />
              <span>No Pre-Recorded Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-success" />
              <span>100% Live Training</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-success" />
              <span>Progress Controlled by Mentors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-dark-700 bg-dark-800/30 py-16">
        <div className="container-custom px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 container-custom px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Why Umbrella LMS is Different
          </h2>
          <p className="text-xl text-text-secondary">
            We don't sell courses. We sell <strong className="text-text-primary">controlled learning</strong>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-dark-800/30 border-y border-dark-700">
        <div className="container-custom px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              How Learning Actually Works Here
            </h2>
            <p className="text-xl text-text-secondary">
              No auto-play. No self-paced illusions. Real structure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                step: '1',
                title: 'Choose Your Wing',
                desc: 'Select specialization (Frontend, Backend, etc.) and read wing guidance.',
              },
              {
                step: '2',
                title: 'Design Your Roadmap',
                desc: 'Sit with a trainer to create a personalized learning roadmap.',
              },
              {
                step: '3',
                title: 'Get Mentor Approval',
                desc: 'Master Mentor reviews and approves your roadmap. No shortcuts.',
              },
              {
                step: '4',
                title: 'Learn Live',
                desc: '4.5+ hours of live trainer time per week via Google Meet.',
              },
              {
                step: '5',
                title: 'Regular Checkups',
                desc: 'Mentor meets you every 1-2 weeks to approve progression.',
              },
              {
                step: '6',
                title: 'Real Progress',
                desc: 'Can\'t move forward without mentor approval. Quality enforced.',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start bg-dark-700 border border-dark-600 rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container-custom px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600/20 to-purple-600/20 border border-primary-600/30 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Ready for Real Learning?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            No more passive video watching. Get personalized roadmaps, live trainer time, and mentor oversight.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/signup')}>
              <ArrowRightIcon className="w-5 h-5" />
              Start Learning Today
            </Button>
            <p className="text-sm text-text-tertiary">
              Join 10,000+ students learning the right way
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 py-12 bg-dark-800/30">
        <div className="container-custom px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Umbrella LMS</h3>
                <p className="text-sm text-text-tertiary">Controlled Learning System</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-text-secondary">
                © 2026 Umbrella LMS. All rights reserved.
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Real learning. Real progress. No BS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
