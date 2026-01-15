import { useAuthStore } from '../../store/authStore';
import { useRoadmapStore } from '../../store/roadmapStore';
import { getSessionsByStudentId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, CheckIcon, LockClosedIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import Button from '../../components/Button';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { getRoadmapByStudentId, initializeRoadmaps } = useRoadmapStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;
  const sessions = user ? getSessionsByStudentId(user.id) : null;
  const progress = user ? mockStudentProgress.find((p) => p.studentId === user.id) : null;

  useEffect(() => {
    initializeRoadmaps();
  }, [initializeRoadmaps]);

  const upcomingSessions = sessions?.filter((s) => s.status === 'scheduled').slice(0, 3) || [];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-text-primary">
          Welcome back, {user?.name}
        </h1>
        <p className="text-text-secondary">Here's your learning overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Progress</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{progress?.completionPercentage || 0}%</p>
          <p className="text-sm text-text-secondary">
            {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
          </p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Current Phase</span>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">Phase {progress?.currentPhase || 1}</p>
          <p className="text-sm text-text-secondary">
            {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
          </p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Upcoming Sessions</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{upcomingSessions.length}</p>
          <p className="text-sm text-text-secondary">This week</p>
        </div>
      </div>

      {/* Roadmap Preview */}
      {roadmap && (
        <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Your Roadmap</h2>
            <Link 
              to="/student/roadmap" 
              className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
            >
              View Full Roadmap
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">{roadmap.title}</h3>
          <p className="text-text-secondary mb-5">{roadmap.description}</p>
          <div className="flex gap-2 flex-wrap">
            {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
              <span
                key={idx}
                className="badge-brand"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link
            to="/student/schedule"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors"
          >
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-text-primary">{session.title}</h3>
                    <p className="text-sm text-text-secondary mb-1">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-sm text-text-tertiary">
                      Duration: {session.duration} minutes
                    </p>
                  </div>
                  <Button variant="primary" size="sm">
                    Join Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-tertiary text-center py-8">No upcoming sessions scheduled</p>
        )}
      </div>
    </div>
  );
}
