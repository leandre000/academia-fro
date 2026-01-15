import { useAuthStore } from '../../store/authStore';
import { useRoadmapStore } from '../../store/roadmapStore';
import { CheckIcon, LockClosedIcon, RocketIcon, ClockIcon, FileTextIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

export default function StudentRoadmap() {
  const { user } = useAuthStore();
  const { getRoadmapByStudentId, initializeRoadmaps } = useRoadmapStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;

  useEffect(() => {
    initializeRoadmaps();
  }, [initializeRoadmaps]);

  if (!roadmap) {
    return (
      <div className="p-6 animate-fade-in">
        <div className="card text-center py-16">
          <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <LockClosedIcon className="w-10 h-10 text-brand-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-text-primary">No Roadmap Assigned</h2>
          <p className="text-text-secondary">
            Your trainer will create a roadmap for you soon.
          </p>
        </div>
      </div>
    );
  }

  const getTaskStatusIcon = (status: string, isLocked: boolean) => {
    if (isLocked) {
      return <LockClosedIcon className="w-5 h-5 text-text-tertiary" />;
    }
    if (status === 'completed') {
      return <CheckIcon className="w-5 h-5 text-success-dark" />;
    }
    if (status === 'blocked') {
      return <LockClosedIcon className="w-5 h-5 text-text-tertiary" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-brand-400" />;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      approved: 'badge-success',
      pending: 'badge-warning',
      draft: 'badge-info',
    };
    return statusMap[status] || 'badge-brand';
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-text-primary">
          {roadmap.title}
        </h1>
        <p className="text-text-secondary">{roadmap.description}</p>
      </div>

      {/* Roadmap Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Weekly Hours</span>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold text-text-primary">{roadmap.weeklyHours}h</p>
        </div>
        
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Monthly Price</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-accent-600">$</span>
            </div>
          </div>
          <p className="text-4xl font-semibold text-text-primary">${roadmap.monthlyPrice}</p>
        </div>
        
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Status</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <RocketIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <div className="mt-2">
            <span className={`badge ${getStatusBadge(roadmap.status)} capitalize`}>
              {roadmap.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
            <FileTextIcon className="w-5 h-5 text-brand-600" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Learning Goals</h2>
        </div>
        <ul className="space-y-3">
          {roadmap.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-surface-tertiary rounded-xl">
              <div className="w-6 h-6 bg-success-light rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <CheckIcon className="w-4 h-4 text-success-dark" />
              </div>
              <span className="text-text-primary font-medium">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase, phaseIdx) => (
          <div
            key={phase.id}
            className={`card p-6 animate-fade-in-up transition-all ${
              phase.isLocked ? 'opacity-60' : ''
            }`}
            style={{ animationDelay: `${0.5 + phaseIdx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg shadow-soft ${
                    phase.isLocked 
                      ? 'bg-surface-tertiary text-text-tertiary' 
                      : 'bg-brand-600 text-white'
                  }`}>
                    {phase.order}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary">{phase.title}</h3>
                  {phase.isLocked && (
                    <span className="badge-warning flex items-center gap-1">
                      <LockClosedIcon className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                  {phase.isApproved && !phase.isLocked && (
                    <span className="badge-success flex items-center gap-1">
                      <CheckIcon className="w-3 h-3" />
                      Approved
                    </span>
                  )}
                </div>
                <p className="text-text-secondary ml-16">{phase.description}</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="ml-16 space-y-3">
              {phase.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-surface-tertiary border rounded-xl p-4 transition-all ${
                    task.status === 'blocked' || phase.isLocked
                      ? 'opacity-50 border-border'
                      : 'border-border hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {getTaskStatusIcon(task.status, phase.isLocked)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-text-primary">{task.title}</h4>
                      <p className="text-sm text-text-secondary mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        {task.estimatedHours && (
                          <span className="text-xs text-text-tertiary flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {task.estimatedHours} hours
                          </span>
                        )}
                        {task.completedAt && (
                          <span className="text-xs text-success-dark flex items-center gap-1">
                            <CheckIcon className="w-3 h-3" />
                            Completed: {new Date(task.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`badge capitalize flex-shrink-0 ${
                      task.status === 'completed' ? 'badge-success' : 'badge-brand'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {phase.reviewCheckpoint && (
              <div className="mt-6 ml-16">
                <div className="bg-info-light border border-info-dark/20 rounded-xl p-4">
                  <p className="text-sm font-semibold mb-1 text-info-dark">Review Checkpoint</p>
                  <p className="text-xs text-text-secondary">
                    This phase requires mentor approval before proceeding
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
