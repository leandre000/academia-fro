import { useAuthStore } from '../../store/authStore';
import { getRoadmapByStudentId } from '../../data/mockData';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';
import * as LockClosedIcon from '@radix-ui/react-icons/dist/LockClosedIcon';
import * as CircleIcon from '@radix-ui/react-icons/dist/Circle';

export default function StudentRoadmap() {
  const { user } = useAuthStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;

  if (!roadmap) {
    return (
      <div className="p-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Roadmap Assigned</h2>
          <p className="text-text-secondary">
            Your trainer will create a roadmap for you soon.
          </p>
        </div>
      </div>
    );
  }

  const getTaskStatusIcon = (status: string, isLocked: boolean) => {
    if (isLocked) {
      return <LockClosedIcon.default className="w-5 h-5 text-text-muted" />;
    }
    if (status === 'completed') {
      return <CheckIcon.default className="w-5 h-5 text-white" />;
    }
    if (status === 'blocked') {
      return <LockClosedIcon.default className="w-5 h-5 text-text-muted" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-text-muted" />;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
        <p className="text-text-secondary">{roadmap.description}</p>
      </div>

      {/* Roadmap Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm text-text-muted mb-1">Weekly Hours</p>
          <p className="text-2xl font-bold">{roadmap.weeklyHours}h</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm text-text-muted mb-1">Monthly Price</p>
          <p className="text-2xl font-bold">${roadmap.monthlyPrice}</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-4">
          <p className="text-sm text-text-muted mb-1">Status</p>
          <p className="text-2xl font-bold capitalize">
            {roadmap.status.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
        <ul className="space-y-2">
          {roadmap.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckIcon.default className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase, phaseIdx) => (
          <div
            key={phase.id}
            className={`bg-bg-secondary border rounded-lg p-6 ${
              phase.isLocked ? 'border-border opacity-60' : 'border-white'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {phase.order}
                  </span>
                  <h3 className="text-xl font-semibold">{phase.title}</h3>
                  {phase.isLocked && (
                    <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                      Locked
                    </span>
                  )}
                  {phase.isApproved && !phase.isLocked && (
                    <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium">
                      Approved
                    </span>
                  )}
                </div>
                <p className="text-text-secondary ml-11">{phase.description}</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="ml-11 space-y-3">
              {phase.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-bg-tertiary border rounded p-4 ${
                    task.status === 'blocked' || phase.isLocked
                      ? 'border-border opacity-50'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getTaskStatusIcon(task.status, phase.isLocked)}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{task.title}</h4>
                      <p className="text-sm text-text-secondary">{task.description}</p>
                      {task.estimatedHours && (
                        <p className="text-xs text-text-muted mt-2">
                          Estimated: {task.estimatedHours} hours
                        </p>
                      )}
                      {task.completedAt && (
                        <p className="text-xs text-text-muted mt-1">
                          Completed: {new Date(task.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-text-muted capitalize">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {phase.reviewCheckpoint && (
              <div className="mt-4 ml-11">
                <div className="bg-bg-tertiary border border-border rounded p-3">
                  <p className="text-sm font-medium mb-1">Review Checkpoint</p>
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

