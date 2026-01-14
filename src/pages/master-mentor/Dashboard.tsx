import { useAuthStore } from '../../store/authStore';
import { mockRoadmaps } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { FileTextIcon, PersonIcon } from '@radix-ui/react-icons';

export default function MasterMentorDashboard() {
  const { user } = useAuthStore();
  
  const pendingReviews = mockRoadmaps.filter((r) => r.status === 'pending_review');
  const changesRequested = mockRoadmaps.filter((r) => r.status === 'changes_requested');
  const approved = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const rejected = mockRoadmaps.filter((r) => r.status === 'rejected').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Master Mentor Dashboard</h1>
        <p className="text-text-secondary">Review and manage student roadmaps</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Pending Reviews</span>
            <FileTextIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{pendingReviews.length}</p>
          <Link to="/master-mentor/reviews" className="text-sm text-white hover:underline mt-2 inline-block">
            Review Now →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Changes Requested</span>
            <FileTextIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{changesRequested.length}</p>
          <p className="text-sm text-text-muted mt-1">Awaiting updates</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Approved</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{approved}</p>
          <p className="text-sm text-text-muted mt-1">This month</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Rejected</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{rejected}</p>
          <p className="text-sm text-text-muted mt-1">This month</p>
        </div>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pending Reviews</h2>
            <Link to="/master-mentor/reviews" className="text-sm text-white hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {pendingReviews.slice(0, 3).map((roadmap) => (
              <div
                key={roadmap.id}
                className="bg-bg-tertiary border border-white rounded p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{roadmap.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-bg-primary border border-border rounded px-2 py-1 text-xs">
                        {roadmap.weeklyHours}h/week
                      </span>
                      <span className="bg-bg-primary border border-border rounded px-2 py-1 text-xs">
                        ${roadmap.monthlyPrice}/month
                      </span>
                      <span className="bg-bg-primary border border-border rounded px-2 py-1 text-xs">
                        {roadmap.phases.length} phases
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/master-mentor/reviews"
                    className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
                  >
                    Review
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
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Review Roadmaps</h3>
          <p className="text-text-secondary text-sm">
            Approve, request changes, or reject submitted roadmaps
          </p>
        </Link>
        <Link
          to="/master-mentor/progression"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Control Progression</h3>
          <p className="text-text-secondary text-sm">
            Manage student phase progression and approvals
          </p>
        </Link>
      </div>
    </div>
  );
}

