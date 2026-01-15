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
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Welcome, {user?.name}!
        </h1>
        <p className="text-text-muted">Academia FRO management - where we assist learners for their education and professional development.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-gradient slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Progress</span>
            <div className="bg-gradient-to-br from-success/20 to-success/10 p-3 rounded-xl">
              <CheckIcon className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">{progress?.completionPercentage || 0}%</p>
          <p className="text-sm text-text-muted font-medium">
            {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
          </p>
        </div>

        <div className="card-gradient slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Current Phase</span>
            <div className="bg-gradient-to-br from-info/20 to-info/10 p-3 rounded-xl">
              <LockClosedIcon className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">Phase {progress?.currentPhase || 1}</p>
          <p className="text-sm text-text-muted font-medium">
            {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
          </p>
        </div>

        <div className="card-gradient slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Upcoming Sessions</span>
            <div className="bg-gradient-to-br from-gradient-purple/20 to-gradient-pink/10 p-3 rounded-xl">
              <CalendarIcon className="w-5 h-5 text-gradient-purple" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">{upcomingSessions.length}</p>
          <p className="text-sm text-text-muted font-medium">This week</p>
        </div>
      </div>

      {/* Roadmap Preview */}
      {roadmap && (
        <div className="card mb-8 slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-text-primary">Your Roadmap</h2>
            <Link to="/student/roadmap" className="link-primary text-sm">
              View Full Roadmap
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">{roadmap.title}</h3>
          <p className="text-text-muted mb-5">{roadmap.description}</p>
          <div className="flex gap-2 flex-wrap">
            {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
              <span
                key={idx}
                className="bg-gradient-soft border border-border rounded-xl px-4 py-2 text-sm text-text-secondary font-medium hover:border-accent/50 transition-colors"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="card slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link to="/student/schedule" className="link-primary text-sm">
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gradient-soft border border-border rounded-xl p-5 hover:border-accent/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{session.title}</h3>
                    <p className="text-sm text-text-muted mb-1">
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
                  <Button variant="primary" size="md" showArrow>
                    Join Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No upcoming sessions scheduled</p>
        )}
      </div>
    </div>
  );
}

