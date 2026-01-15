import { mockRoadmaps } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { FileTextIcon, CheckIcon, CrossCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function MasterMentorDashboard() {
  const pendingReviews = mockRoadmaps.filter((r) => r.status === 'pending_review');
  const changesRequested = mockRoadmaps.filter((r) => r.status === 'changes_requested');
  const approved = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const rejected = mockRoadmaps.filter((r) => r.status === 'rejected').length;

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
          Master Mentor Dashboard
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">Review and manage student roadmaps</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Pending Reviews</span>
            <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-warning-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{pendingReviews.length}</p>
          <Link to="/master-mentor/reviews" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            Review Now
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Changes Requested</span>
            <div className="w-10 h-10 bg-info-light rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-info-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{changesRequested.length}</p>
          <p className="text-sm text-text-secondary">Awaiting updates</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Approved</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{approved}</p>
          <p className="text-sm text-text-secondary">This month</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Rejected</span>
            <div className="w-10 h-10 bg-error-light rounded-xl flex items-center justify-center">
              <CrossCircledIcon className="w-5 h-5 text-error-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{rejected}</p>
          <p className="text-sm text-text-secondary">This month</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Pending Reviews</h2>
            <Link to="/master-mentor/reviews" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
              View All
              <span>→</span>
            </Link>
          </div>
          <div className="space-y-4">
            {pendingReviews.slice(0, 3).map((roadmap, idx) => (
              <div
                key={roadmap.id}
                className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all animate-fade-in-up"
                style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="badge-brand">
                        {roadmap.weeklyHours}h/week
                      </span>
                      <span className="badge-brand">
                        ${roadmap.monthlyPrice}/month
                      </span>
                      <span className="badge-brand">
                        {roadmap.phases.length} phases
                      </span>
                    </div>
                  </div>
                  <Link to="/master-mentor/reviews">
                    <Button variant="primary" size="sm">
                      Review
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/master-mentor/reviews"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.9s' }}
        >
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
            <FileTextIcon className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Review Roadmaps</h3>
          <p className="text-text-secondary text-sm mb-4">
            Approve, request changes, or reject submitted roadmaps
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Go to Reviews
          </Button>
        </Link>
        <Link
          to="/master-mentor/progression"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '1.0s' }}
        >
          <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
            <RocketIcon className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Control Progression</h3>
          <p className="text-text-secondary text-sm mb-4">
            Manage student phase progression and approvals
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Manage Progression
          </Button>
        </Link>
      </div>
    </div>
  );
}
