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
        <div className="card text-center py-16 slide-up">
          <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-secondary-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LockClosedIcon className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-semibold mb-3 text-text-primary">No Roadmap Assigned</h2>
          <p className="text-text-muted text-lg">
            Your trainer will create a roadmap for you soon.
          </p>
        </div>
      </div>
    );
  }

  const getTaskStatusIcon = (status: string, isLocked: boolean) => {
    if (isLocked) {
      return <LockClosedIcon className="w-5 h-5 text-text-muted" />;
    }
    if (status === 'completed') {
      return <CheckIcon className="w-5 h-5 text-success" />;
    }
    if (status === 'blocked') {
      return <LockClosedIcon className="w-5 h-5 text-text-muted" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-accent" />;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      approved: { bg: 'bg-success-light', text: 'text-success' },
      pending: { bg: 'bg-warning-light', text: 'text-warning' },
      draft: { bg: 'bg-info-light', text: 'text-info' },
    };
    const style = statusMap[status] || { bg: 'bg-bg-tertiary', text: 'text-text-muted' };
    return (
      <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-10 slide-up">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
          {roadmap.title}
        </h1>
        <p className="text-text-muted text-lg">{roadmap.description}</p>
      </div>

      {/* Roadmap Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Weekly Hours</span>
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold text-text-primary">{roadmap.weeklyHours}h</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Monthly Price</span>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary-accent">$</span>
            </div>
          </div>
          <p className="text-4xl font-bold text-text-primary">${roadmap.monthlyPrice}</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Status</span>
            <div className="w-12 h-12 bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-6 h-6 text-tertiary-accent" />
            </div>
          </div>
          <div className="mt-2">{getStatusBadge(roadmap.status)}</div>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="card mb-8 slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
            <FileTextIcon className="w-5 h-5 text-accent" />
          </div>
          <h2 className="text-2xl font-semibold text-text-primary">Learning Goals</h2>
        </div>
        <ul className="space-y-3">
          {roadmap.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-gradient-soft rounded-lg hover:shadow-md transition-all">
              <div className="w-6 h-6 bg-success-light rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <CheckIcon className="w-4 h-4 text-success" />
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
            className={`card slide-up transition-all ${
              phase.isLocked ? 'opacity-60' : 'hover:shadow-xl'
            }`}
            style={{ animationDelay: `${0.5 + phaseIdx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
                    phase.isLocked 
                      ? 'bg-bg-tertiary text-text-muted' 
                      : 'bg-gradient-accent text-white'
                  }`}>
                    {phase.order}
                  </div>
                  <h3 className="text-2xl font-semibold text-text-primary">{phase.title}</h3>
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
                <p className="text-text-muted ml-16">{phase.description}</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="ml-16 space-y-3">
              {phase.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-gradient-soft border rounded-xl p-4 transition-all ${
                    task.status === 'blocked' || phase.isLocked
                      ? 'opacity-50 border-border'
                      : 'border-border hover:border-accent hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {getTaskStatusIcon(task.status, phase.isLocked)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-lg text-text-primary">{task.title}</h4>
                      <p className="text-sm text-text-muted mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        {task.estimatedHours && (
                          <span className="text-xs text-text-muted flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {task.estimatedHours} hours
                          </span>
                        )}
                        {task.completedAt && (
                          <span className="text-xs text-success flex items-center gap-1">
                            <CheckIcon className="w-3 h-3" />
                            Completed: {new Date(task.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`badge-primary capitalize flex-shrink-0 ${
                      task.status === 'completed' ? 'badge-success' : ''
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {phase.reviewCheckpoint && (
              <div className="mt-6 ml-16">
                <div className="bg-info-light border border-info/30 rounded-xl p-4">
                  <p className="text-sm font-semibold mb-1 text-info">Review Checkpoint</p>
                  <p className="text-xs text-text-muted">
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
