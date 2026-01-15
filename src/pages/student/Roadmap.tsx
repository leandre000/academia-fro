import { useAuthStore } from '../../store/authStore';
import { getRoadmapByStudentId } from '../../data/mockData';
import { CheckIcon, LockClosedIcon } from '@radix-ui/react-icons';

export default function StudentRoadmap() {
  const { user } = useAuthStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;

  if (!roadmap) {
    return (
      <div className="p-8 animate-fade-in">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-semibold mb-3">No Roadmap Assigned</h2>
          <p className="text-gray-400 text-lg">
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
      return <CheckIcon className="w-5 h-5 text-white" />;
    }
    if (status === 'blocked') {
      return <LockClosedIcon className="w-5 h-5 text-text-muted" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-text-muted" />;
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {roadmap.title}
        </h1>
        <p className="text-gray-400 text-lg">{roadmap.description}</p>
      </div>

      {/* Roadmap Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg">
          <p className="text-sm text-gray-400 mb-2 font-medium">Weekly Hours</p>
          <p className="text-3xl font-bold">{roadmap.weeklyHours}h</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg">
          <p className="text-sm text-gray-400 mb-2 font-medium">Monthly Price</p>
          <p className="text-3xl font-bold">${roadmap.monthlyPrice}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg">
          <p className="text-sm text-gray-400 mb-2 font-medium">Status</p>
          <p className="text-3xl font-bold capitalize">
            {roadmap.status.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Learning Goals</h2>
        <ul className="space-y-3">
          {roadmap.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="bg-green-500/20 p-1 rounded mt-0.5">
                <CheckIcon className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-gray-300">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {roadmap.phases.map((phase) => (
          <div
            key={phase.id}
            className={`bg-gradient-to-br from-gray-900 to-black border rounded-xl p-6 shadow-lg transition-all ${
              phase.isLocked ? 'border-gray-800 opacity-60' : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {phase.order}
                  </span>
                  <h3 className="text-2xl font-semibold">{phase.title}</h3>
                  {phase.isLocked && (
                    <span className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-xs font-medium text-gray-400">
                      Locked
                    </span>
                  )}
                  {phase.isApproved && !phase.isLocked && (
                    <span className="bg-green-500/20 border border-green-500/50 rounded-lg px-3 py-1 text-xs font-medium text-green-400">
                      Approved
                    </span>
                  )}
                </div>
                <p className="text-gray-400 ml-14">{phase.description}</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="ml-14 space-y-3">
              {phase.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-gray-800 border rounded-lg p-4 transition-all ${
                    task.status === 'blocked' || phase.isLocked
                      ? 'border-gray-800 opacity-50'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getTaskStatusIcon(task.status, phase.isLocked)}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-lg">{task.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                      {task.estimatedHours && (
                        <p className="text-xs text-gray-500">
                          Estimated: {task.estimatedHours} hours
                        </p>
                      )}
                      {task.completedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Completed: {new Date(task.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 capitalize bg-gray-700 px-2 py-1 rounded">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {phase.reviewCheckpoint && (
              <div className="mt-6 ml-14">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-1 text-blue-300">Review Checkpoint</p>
                  <p className="text-xs text-gray-400">
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

