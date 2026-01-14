import { useState } from 'react';
import { mockRoadmaps, mockUsers, mockStudentProgress } from '../../data/mockData';
import { CheckIcon, LockClosedIcon } from '@radix-ui/react-icons';

export default function MasterMentorProgression() {
  const [selectedStudent] = useState<string | null>(null);

  const roadmaps = mockRoadmaps.filter((r) => r.status === 'approved');
  const student = mockUsers.student1;

  const roadmap = selectedStudent 
    ? roadmaps.find((r) => r.studentId === selectedStudent)
    : roadmaps[0];

  const progress = roadmap 
    ? mockStudentProgress.find((p) => p.studentId === roadmap.studentId)
    : null;

  const handlePhaseApproval = (phaseId: string, approve: boolean) => {
    console.log('Phase approval:', { phaseId, approve });
    alert(`Phase ${approve ? 'approved' : 'locked'}! (Mock)`);
  };

  if (!roadmap) {
    return (
      <div className="p-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Approved Roadmaps</h2>
          <p className="text-text-secondary">No roadmaps available for progression control</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Progression Control</h1>
        <p className="text-text-secondary">Manage student phase progression and approvals</p>
      </div>

      {/* Student Info */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">{student?.name}</h2>
            <p className="text-text-secondary">{student?.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-muted mb-1">Progress</p>
            <p className="text-2xl font-bold">{progress?.completionPercentage || 0}%</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-medium mb-2">{roadmap.title}</h3>
          <p className="text-sm text-text-secondary">{roadmap.description}</p>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase, phaseIdx) => {
          const isCurrentPhase = progress?.currentPhase === phase.order;
          const canUnlock = phaseIdx === 0 || roadmap.phases[phaseIdx - 1].isApproved;

          return (
            <div
              key={phase.id}
              className={`bg-bg-secondary border rounded-lg p-6 ${
                phase.isLocked ? 'border-border opacity-60' : 'border-white'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    {phase.order}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{phase.title}</h3>
                    <p className="text-text-secondary text-sm">{phase.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {phase.isLocked ? (
                    <span className="bg-bg-tertiary border border-border rounded px-3 py-1 text-sm flex items-center gap-2">
                      <LockClosedIcon className="w-4 h-4" />
                      Locked
                    </span>
                  ) : phase.isApproved ? (
                    <span className="bg-white text-black rounded px-3 py-1 text-sm font-medium flex items-center gap-2">
                      <CheckIcon className="w-4 h-4" />
                      Approved
                    </span>
                  ) : (
                    <span className="bg-bg-tertiary border border-border rounded px-3 py-1 text-sm">
                      Pending Approval
                    </span>
                  )}
                </div>
              </div>

              {/* Tasks Status */}
              <div className="mb-4 ml-13">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-text-muted">
                    Tasks: {phase.tasks.filter((t) => t.status === 'completed').length} / {phase.tasks.length} completed
                  </span>
                  {isCurrentPhase && (
                    <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium">
                      Current Phase
                    </span>
                  )}
                </div>
              </div>

              {/* Tasks */}
              <div className="ml-13 space-y-2 mb-4">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-bg-tertiary border border-border rounded p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' ? (
                          <CheckIcon className="w-4 h-4 text-white" />
                        ) : (
                          <LockClosedIcon className="w-4 h-4 text-text-muted" />
                        )}
                        <span className="text-sm">{task.title}</span>
                      </div>
                      <span className="text-xs text-text-muted capitalize">{task.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Checkpoint */}
              {phase.reviewCheckpoint && (
                <div className="ml-13 mb-4">
                  <div className="bg-bg-tertiary border border-border rounded p-3">
                    <p className="text-sm font-medium mb-1">Review Checkpoint</p>
                    <p className="text-xs text-text-muted">
                      This phase requires mentor approval before student can proceed
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="ml-13 flex gap-3">
                {phase.isLocked && canUnlock ? (
                  <button
                    onClick={() => handlePhaseApproval(phase.id, true)}
                    className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Unlock Phase
                  </button>
                ) : !phase.isApproved && !phase.isLocked ? (
                  <>
                    <button
                      onClick={() => handlePhaseApproval(phase.id, true)}
                      className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <CheckIcon className="w-4 h-4" />
                      Approve Phase
                    </button>
                    <button
                      onClick={() => handlePhaseApproval(phase.id, false)}
                      className="bg-bg-tertiary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-primary transition-colors"
                    >
                      Lock Phase
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

