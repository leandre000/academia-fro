import { useState } from 'react';
import { mockRoadmaps, mockUsers } from '../../data/mockData';
import { CheckIcon, CrossCircledIcon, Pencil1Icon } from '@radix-ui/react-icons';

export default function MasterMentorReviews() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | 'changes' | null>(null);

  const pendingRoadmaps = mockRoadmaps.filter((r) => 
    r.status === 'pending_review' || r.status === 'changes_requested'
  );

  const roadmap = selectedRoadmap 
    ? mockRoadmaps.find((r) => r.id === selectedRoadmap)
    : null;

  const trainer = roadmap ? mockUsers.trainer1 : null;
  const student = roadmap ? mockUsers.student1 : null;

  const handleAction = (actionType: 'approve' | 'reject' | 'changes') => {
    setAction(actionType);
  };

  const submitReview = () => {
    if (!roadmap || !action) return;
    console.log('Review submitted:', { roadmapId: roadmap.id, action, notes: reviewNotes });
    alert(`Roadmap ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'changes requested'}! (Mock)`);
    setSelectedRoadmap(null);
    setReviewNotes('');
    setAction(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Roadmap Reviews</h1>
        <p className="text-text-secondary">Review and approve student learning roadmaps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roadmap List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Reviews</h2>
          {pendingRoadmaps.length > 0 ? (
            pendingRoadmaps.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRoadmap(r.id)}
                className={`bg-bg-secondary border rounded-lg p-6 cursor-pointer transition-colors ${
                  selectedRoadmap === r.id
                    ? 'border-white'
                    : 'border-border hover:border-white/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{r.title}</h3>
                  <span className={`text-xs rounded px-2 py-1 ${
                    r.status === 'pending_review'
                      ? 'bg-white text-black'
                      : 'bg-yellow-900/20 border border-yellow-500/50 text-yellow-400'
                  }`}>
                    {r.status === 'pending_review' ? 'New' : 'Changes Requested'}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{r.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                    {r.weeklyHours}h/week
                  </span>
                  <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                    ${r.monthlyPrice}/month
                  </span>
                  <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                    {r.phases.length} phases
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-3">
                  Created: {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
              <p className="text-text-muted">No pending reviews</p>
            </div>
          )}
        </div>

        {/* Review Panel */}
        {roadmap && (
          <div className="bg-bg-secondary border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Review Roadmap</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{roadmap.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{roadmap.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-tertiary border border-border rounded p-3">
                  <p className="text-xs text-text-muted mb-1">Weekly Hours</p>
                  <p className="font-semibold">{roadmap.weeklyHours}h</p>
                </div>
                <div className="bg-bg-tertiary border border-border rounded p-3">
                  <p className="text-xs text-text-muted mb-1">Monthly Price</p>
                  <p className="font-semibold">${roadmap.monthlyPrice}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Learning Goals</p>
                <ul className="space-y-1">
                  {roadmap.learningGoals.map((goal, idx) => (
                    <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                      <span>•</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Phases ({roadmap.phases.length})</p>
                <div className="space-y-2">
                  {roadmap.phases.map((phase, idx) => (
                    <div key={phase.id} className="bg-bg-tertiary border border-border rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-sm">{phase.title}</span>
                      </div>
                      <p className="text-xs text-text-muted ml-8">{phase.description}</p>
                      <p className="text-xs text-text-muted ml-8 mt-1">
                        {phase.tasks.length} tasks • {phase.reviewCheckpoint ? 'Review checkpoint' : 'No checkpoint'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-text-muted">
                <p><strong>Trainer:</strong> {trainer?.name}</p>
                <p><strong>Student:</strong> {student?.name}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Review Notes</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Add notes about this roadmap..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction('approve')}
                  className="flex-1 bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction('changes')}
                  className="flex-1 bg-bg-tertiary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Pencil1Icon className="w-4 h-4" />
                  Request Changes
                </button>
                <button
                  onClick={() => handleAction('reject')}
                  className="flex-1 bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-2 rounded font-medium hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2"
                >
                  <CrossCircledIcon className="w-4 h-4" />
                  Reject
                </button>
              </div>

              {action && (
                <div className="bg-bg-tertiary border border-border rounded p-4">
                  <p className="text-sm mb-2">
                    You are about to <strong>{action === 'approve' ? 'approve' : action === 'reject' ? 'reject' : 'request changes for'}</strong> this roadmap.
                  </p>
                  <button
                    onClick={submitReview}
                    className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
                  >
                    Confirm {action === 'approve' ? 'Approval' : action === 'reject' ? 'Rejection' : 'Request'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

