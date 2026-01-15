import { mockRoadmaps } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { FileTextIcon, PersonIcon, CheckIcon, CrossCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function MasterMentorDashboard() {
  const pendingReviews = mockRoadmaps.filter((r) => r.status === 'pending_review');
  const changesRequested = mockRoadmaps.filter((r) => r.status === 'changes_requested');
  const approved = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const rejected = mockRoadmaps.filter((r) => r.status === 'rejected').length;

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Master Mentor Dashboard
        </h1>
        <p className="text-text-muted text-lg">Review and manage student roadmaps</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Pending Reviews</span>
            <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-6 h-6 text-warning" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{pendingReviews.length}</p>
          <Link to="/master-mentor/reviews" className="link-primary text-sm">
            Review Now →
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Changes Requested</span>
            <div className="w-12 h-12 bg-gradient-to-br from-info/20 to-info/10 rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-6 h-6 text-info" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{changesRequested.length}</p>
          <p className="text-sm text-text-muted font-medium">Awaiting updates</p>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Approved</span>
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
              <CheckIcon className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{approved}</p>
          <p className="text-sm text-text-muted font-medium">This month</p>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Rejected</span>
            <div className="w-12 h-12 bg-gradient-to-br from-error/20 to-error/10 rounded-xl flex items-center justify-center">
              <CrossCircledIcon className="w-6 h-6 text-error" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{rejected}</p>
          <p className="text-sm text-text-muted font-medium">This month</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="card mb-8 slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">Pending Reviews</h2>
            <Link to="/master-mentor/reviews" className="link-primary text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {pendingReviews.slice(0, 3).map((roadmap, idx) => (
              <div
                key={roadmap.id}
                className="bg-gradient-soft border border-border rounded-xl p-5 hover:shadow-md transition-all slide-up"
                style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-muted mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="badge-primary">
                        {roadmap.weeklyHours}h/week
                      </span>
                      <span className="badge-primary">
                        ${roadmap.monthlyPrice}/month
                      </span>
                      <span className="badge-primary">
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
          className="card-interactive slide-up"
          style={{ animationDelay: '0.9s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-4">
            <FileTextIcon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Review Roadmaps</h3>
          <p className="text-text-muted text-sm mb-4">
            Approve, request changes, or reject submitted roadmaps
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Go to Reviews
          </Button>
        </Link>
        <Link
          to="/master-mentor/progression"
          className="card-interactive slide-up"
          style={{ animationDelay: '1.0s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center mb-4">
            <RocketIcon className="w-6 h-6 text-secondary-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Control Progression</h3>
          <p className="text-text-muted text-sm mb-4">
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
