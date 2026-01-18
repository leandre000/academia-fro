import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getSessionsByTrainerId, getStudentsByTrainerId, mockTrainerAvailability, mockWallets } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, PersonIcon, ArrowRightIcon, ClockIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';
import TrainerCapacitySettings from '../../components/TrainerCapacitySettings';
import SessionConfirmationModal from '../../components/SessionConfirmationModal';
import { calculateTrainerCapacity } from '../../utils/businessLogic';
import type { Session } from '../../types';

export default function TrainerDashboard() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByTrainerId(user.id) : [];
  const students = user ? getStudentsByTrainerId(user.id) : [];
  const wallet = user ? mockWallets[user.id] : null;
  const availability = mockTrainerAvailability;

  const [showCapacitySettings, setShowCapacitySettings] = useState(false);
  const [confirmSession, setConfirmSession] = useState<Session | null>(null);

  const upcomingSessions = sessions.filter((s) => s.status === 'scheduled').slice(0, 3);
  const todaySessions = sessions.filter((s) => {
    const sessionDate = new Date(s.scheduledAt);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString() && s.status === 'scheduled';
  });

  const pendingConfirmations = sessions.filter((s) =>
    s.status === 'completed' && !s.trainerConfirmed
  );

  const capacity = calculateTrainerCapacity(
    user?.id || '',
    availability.weeklyCapacity,
    students.length
  );

  const handleUpdateCapacity = (weeklyHours: number) => {
    console.log('Updating capacity to:', weeklyHours);
    // In real app: API call
  };

  const handleConfirmSession = (sessionId: string, notes?: string) => {
    console.log('Confirming session:', sessionId, notes);
    // In real app: API call
    setConfirmSession(null);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
          Welcome back, {user?.name}
        </h1>
        <p className="text-text-secondary text-base">Your trainer overview and student management</p>
      </div>

      {/* Pending Confirmations Alert */}
      {pendingConfirmations.length > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-2">
                {pendingConfirmations.length} Session{pendingConfirmations.length > 1 ? 's' : ''} Need Confirmation
              </h3>
              <p className="text-sm text-text-secondary mb-3">
                Confirm completed sessions to count them toward weekly hours and unlock payment.
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Assigned Students</span>
            <div className="w-10 h-10 bg-primary-600/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-primary-500" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{students.length}</p>
          <Link to="/trainer/students" className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors">
            View All <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Weekly Capacity</span>
            <div className="w-10 h-10 bg-accent-emerald/10 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-accent-emerald" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{availability.weeklyCapacity}h</p>
          <button
            onClick={() => setShowCapacitySettings(!showCapacitySettings)}
            className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors"
          >
            {showCapacitySettings ? 'Hide' : 'Manage'} <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Today's Sessions</span>
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{todaySessions.length}</p>
          <p className="text-sm text-text-secondary">Scheduled</p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Wallet Balance</span>
            <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-success">$</span>
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors">
            View Details <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Capacity Settings */}
      {showCapacitySettings && (
        <div className="mb-8">
          <TrainerCapacitySettings
            trainerId={user?.id || ''}
            currentWeeklyHours={availability.weeklyCapacity}
            currentStudents={students.length}
            onUpdate={handleUpdateCapacity}
          />
        </div>
      )}

      {/* Capacity Warning */}
      {!capacity.canAcceptMore && (
        <div className="bg-error/10 border border-error/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-error flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-text-primary mb-2">At Full Capacity</h3>
              <p className="text-sm text-text-secondary">
                You are currently at maximum student capacity ({capacity.maxStudents} students).
                Increase your weekly hours to accept more students.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Today's Sessions */}
      {todaySessions.length > 0 && (
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">Today's Sessions</h2>
          <div className="space-y-3">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="bg-dark-800 border border-dark-600 rounded-xl p-5 hover:border-primary-600/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-text-primary">{session.title}</h3>
                    <p className="text-sm text-text-secondary">
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} • {session.duration} minutes
                    </p>
                  </div>
                  {session.meetingLink && (
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm">
                        Start Session
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link to="/trainer/schedule" className="text-sm font-medium text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors">
            View All <ArrowRightIcon className="w-4 h-4" />
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
                    <p className="text-sm text-text-secondary">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-primary-600/10 text-primary-400 rounded-full text-sm font-medium capitalize">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-tertiary text-center py-8">No upcoming sessions</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/trainer/roadmap-builder"
          className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all group"
        >
          <h3 className="text-xl font-bold mb-3 text-text-primary">Create New Roadmap</h3>
          <p className="text-text-secondary text-sm mb-4">
            Build a custom learning path for your students
          </p>
          <Button variant="ghost" size="sm">
            Get Started →
          </Button>
        </Link>
        <Link
          to="/trainer/schedule"
          className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all group"
        >
          <h3 className="text-xl font-bold mb-3 text-text-primary">Manage Schedule</h3>
          <p className="text-text-secondary text-sm mb-4">
            View and manage your weekly training sessions
          </p>
          <Button variant="ghost" size="sm">
            Manage →
          </Button>
        </Link>
      </div>

      {/* Session Confirmation Modal */}
      <SessionConfirmationModal
        isOpen={!!confirmSession}
        onClose={() => setConfirmSession(null)}
        session={confirmSession}
        userRole="trainer"
        onConfirm={handleConfirmSession}
      />
    </div>
  );
}
