import { useAuthStore } from '../../store/authStore';
import { getRoadmapByStudentId, getSessionsByStudentId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, CheckIcon, LockClosedIcon } from '@radix-ui/react-icons';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;
  const sessions = user ? getSessionsByStudentId(user.id) : null;
  const progress = user ? mockStudentProgress.find((p) => p.studentId === user.id) : null;

  const upcomingSessions = sessions?.filter((s) => s.status === 'scheduled').slice(0, 3) || [];

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-400 text-lg">Here's your learning overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Progress</span>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CheckIcon className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{progress?.completionPercentage || 0}%</p>
          <p className="text-sm text-gray-500">
            {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Current Phase</span>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <LockClosedIcon className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">Phase {progress?.currentPhase || 1}</p>
          <p className="text-sm text-gray-500">
            {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Upcoming Sessions</span>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{upcomingSessions.length}</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
      </div>

      {/* Roadmap Preview */}
      {roadmap && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 mb-8 shadow-lg hover:border-gray-700 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Your Roadmap</h2>
            <Link
              to="/student/roadmap"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              View Full Roadmap →
            </Link>
          </div>
          <h3 className="text-xl font-medium mb-3">{roadmap.title}</h3>
          <p className="text-gray-400 mb-5">{roadmap.description}</p>
          <div className="flex gap-2 flex-wrap">
            {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
              <span
                key={idx}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Sessions</h2>
          <Link
            to="/student/schedule"
            className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-1"
          >
            View All →
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all hover:bg-gray-800/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{session.title}</h3>
                    <p className="text-sm text-gray-400 mb-1">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      Duration: {session.duration} minutes
                    </p>
                  </div>
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No upcoming sessions scheduled</p>
        )}
      </div>
    </div>
  );
}

