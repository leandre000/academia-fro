import { mockRoadmaps } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { FileTextIcon, CheckIcon, CrossCircledIcon, RocketIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';
import RoadmapApprovalCard from '../../components/RoadmapApprovalCard';

export default function MasterMentorDashboard() {
  const pendingReviews = mockRoadmaps.filter((r) => r.status === 'pending_review');
  const changesRequested = mockRoadmaps.filter((r) => r.status === 'changes_requested');
  const approved = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const rejected = mockRoadmaps.filter((r) => r.status === 'rejected').length;

  const handleApprove = (roadmapId: string) => {
    console.log('Approving roadmap:', roadmapId);
    // In real app: API call to approve
  };

  const handleRequestChanges = (roadmapId: string, notes: string) => {
    console.log('Requesting changes for roadmap:', roadmapId, notes);
    // In real app: API call to request changes
  };

  const handleReject = (roadmapId: string, reason: string) => {
    console.log('Rejecting roadmap:', roadmapId, reason);
    // In real app: API call to reject
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
          Master Mentor Dashboard
        </h1>
        <p className="text-text-secondary text-base">Review and control student learning progression</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Pending Reviews</span>
            <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{pendingReviews.length}</p>
          <Link to="/master-mentor/reviews" className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors">
            Review Now →
          </Link>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Changes Requested</span>
            <div className="w-10 h-10 bg-primary-600/10 rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-primary-500" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{changesRequested.length}</p>
          <p className="text-sm text-text-secondary">Awaiting updates</p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Approved</span>
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{approved}</p>
          <p className="text-sm text-text-secondary">This month</p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Rejected</span>
            <div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center">
              <CrossCircledIcon className="w-5 h-5 text-error" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{rejected}</p>
          <p className="text-sm text-text-secondary">This month</p>
        </div>
      </div>

      {/* Pending Reviews with Approval Cards */}
      {pendingReviews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Roadmaps Awaiting Review</h2>
            <Link to="/master-mentor/reviews" className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors">
              View All ({pendingReviews.length})
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingReviews.slice(0, 4).map((roadmap) => (
              <RoadmapApprovalCard
                key={roadmap.id}
                roadmap={roadmap}
                onApprove={handleApprove}
                onRequestChanges={handleRequestChanges}
                onReject={handleReject}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/master-mentor/reviews"
          className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all group"
        >
          <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors">
            <FileTextIcon className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-text-primary">Review Roadmaps</h3>
          <p className="text-text-secondary text-sm mb-4">
            Approve, request changes, or reject submitted roadmaps
          </p>
          <Button variant="ghost" size="sm">
            Go to Reviews →
          </Button>
        </Link>

        <Link
          to="/master-mentor/progression"
          className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all group"
        >
          <div className="w-12 h-12 bg-accent-emerald/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-emerald/20 transition-colors">
            <RocketIcon className="w-6 h-6 text-accent-emerald" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-text-primary">Control Progression</h3>
          <p className="text-text-secondary text-sm mb-4">
            Manage student phase progression and checkups (1-2 weeks)
          </p>
          <Button variant="ghost" size="sm">
            Manage Progression →
          </Button>
        </Link>
      </div>
    </div>
  );
}
