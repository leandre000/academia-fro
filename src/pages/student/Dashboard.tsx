import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRoadmapStore } from '../../store/roadmapStore';
import { getSessionsByStudentId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, CheckIcon, LockClosedIcon, ArrowRightIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import Button from '../../components/Button';
import SessionConfirmationModal from '../../components/SessionConfirmationModal';
import type { Session } from '../../types';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const { getRoadmapByStudentId, initializeRoadmaps } = useRoadmapStore();
  const roadmap = user ? getRoadmapByStudentId(user.id) : null;
  const sessions = user ? getSessionsByStudentId(user.id) : [];
  const progress = user ? mockStudentProgress.find((p) => p.studentId === user.id) : null;

  const [confirmSession, setConfirmSession] = useState<Session | null>(null);

  useEffect(() => {
    initializeRoadmaps();
  }, [initializeRoadmaps]);

  const upcomingSessions = sessions?.filter((s) => s.status === 'scheduled').slice(0, 3) || [];
  const pendingConfirmations = sessions?.filter((s) =>
    s.status === 'completed' && s.trainerConfirmed && !s.studentConfirmed
  ) || [];

  const handleConfirmSession = (sessionId: string, notes?: string) => {
    console.log('Confirming session:', sessionId, notes);
    // In real app: API call to confirm
    setConfirmSession(null);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
          Welcome back, {user?.name}
        </h1>
        <p className="text-text-secondary text-base">Here's your learning overview</p>
      </div>

      {/* Pending Confirmations Alert */}
      {pendingConfirmations.length > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">
                {pendingConfirmations.length} Session{pendingConfirmations.length > 1 ? 's' : ''} Awaiting Confirmation
              </h3>
              <p className="text-sm text-text-secondary mb-3">
                Please confirm your attendance to count these sessions toward your weekly hours.
              </p>
              <div className="flex flex-wrap gap-2">
                {pendingConfirmations.map((session) => (
                  <Button
                    key={session.id}
                    variant="secondary"
                    size="sm"
                    onClick={() => setConfirmSession(session)}
                  >
                    Confirm: {session.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Progress</span>
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <CheckIcon className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{progress?.completionPercentage || 0}%</p>
          <p className="text-sm text-text-secondary">
            {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
          </p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Current Phase</span>
            <div className="w-10 h-10 bg-primary-600/10 rounded-xl flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 text-primary-500" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">Phase {progress?.currentPhase || 1}</p>
          <p className="text-sm text-text-secondary">
            {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
          </p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Upcoming Sessions</span>
            <div className="w-10 h-10 bg-accent-emerald/10 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-accent-emerald" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{upcomingSessions.length}</p>
          <p className="text-sm text-text-secondary">This week</p>
        </div>
      </div>

      {/* Roadmap Preview */}
      {roadmap && (
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Your Roadmap</h2>
            <Link
              to="/student/roadmap"
              className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors"
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
                className="inline-block px-3 py-1 bg-primary-600/10 text-primary-400 rounded-full text-sm font-medium"
              >
                {goal}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link
            to="/student/schedule"
            className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-dark-800 border border-dark-600 rounded-xl p-5 hover:border-primary-600/50 transition-all"
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
                  {session.meetingLink && (
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm">
                        Join Session
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-tertiary text-center py-8">No upcoming sessions scheduled</p>
        )}
      </div>

      {/* Confirmation Modal */}
      <SessionConfirmationModal
        isOpen={!!confirmSession}
        onClose={() => setConfirmSession(null)}
        session={confirmSession}
        userRole="student"
        onConfirm={handleConfirmSession}
      />
    </div>
  );
}
