import { useAuthStore } from '../../store/authStore';
import { getRoadmapByStudentId, getSessionsByStudentId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import * as CalendarIcon from '@radix-ui/react-icons/dist/CalendarIcon';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';
import * as LockClosedIcon from '@radix-ui/react-icons/dist/LockClosedIcon';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;
  const sessions = user ? getSessionsByStudentId(user.id) : null;
  const progress = user ? mockStudentProgress.find((p) => p.studentId === user.id) : null;

  const upcomingSessions = sessions?.filter((s) => s.status === 'scheduled').slice(0, 3) || [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-text-secondary">Here's your learning overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Progress</span>
            <CheckIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{progress?.completionPercentage || 0}%</p>
          <p className="text-sm text-text-muted mt-1">
            {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
          </p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Current Phase</span>
            <LockClosedIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">Phase {progress?.currentPhase || 1}</p>
          <p className="text-sm text-text-muted mt-1">
            {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
          </p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Upcoming Sessions</span>
            <CalendarIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{upcomingSessions.length}</p>
          <p className="text-sm text-text-muted mt-1">This week</p>
        </div>
      </div>

      {/* Roadmap Preview */}
      {roadmap && (
        <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Roadmap</h2>
            <Link
              to="/student/roadmap"
              className="text-sm text-white hover:underline"
            >
              View Full Roadmap →
            </Link>
          </div>
          <h3 className="text-lg font-medium mb-2">{roadmap.title}</h3>
          <p className="text-text-secondary mb-4">{roadmap.description}</p>
          <div className="flex gap-2 flex-wrap">
            {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
              <span
                key={idx}
                className="bg-bg-tertiary border border-border rounded px-3 py-1 text-sm"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <Link
            to="/student/schedule"
            className="text-sm text-white hover:underline"
          >
            View All →
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-bg-tertiary border border-border rounded p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{session.title}</h3>
                    <p className="text-sm text-text-muted">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-sm text-text-muted">
                      Duration: {session.duration} minutes
                    </p>
                  </div>
                  <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted">No upcoming sessions scheduled</p>
        )}
      </div>
    </div>
  );
}

