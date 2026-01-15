import { useAuthStore } from '../../store/authStore';
import { getSessionsByTrainerId, getStudentsByTrainerId, mockTrainerAvailability, mockWallets } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, PersonIcon, ArrowRightIcon, ClockIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function TrainerDashboard() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByTrainerId(user.id) : [];
  const students = user ? getStudentsByTrainerId(user.id) : [];
  const wallet = user ? mockWallets[user.id] : null;
  const availability = mockTrainerAvailability;

  const upcomingSessions = sessions.filter((s) => s.status === 'scheduled').slice(0, 3);
  const todaySessions = sessions.filter((s) => {
    const sessionDate = new Date(s.scheduledAt);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString() && s.status === 'scheduled';
  });

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-text-primary">
          Welcome back, {user?.name}
        </h1>
        <p className="text-text-secondary">Here's your trainer overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Assigned Students</span>
            <div className="w-10 h-10 bg-info-light rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-info-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{students.length}</p>
          <Link to="/trainer/students" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Weekly Capacity</span>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{availability.weeklyCapacity}h</p>
          <Link to="/trainer/availability" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            Manage
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Today's Sessions</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{todaySessions.length}</p>
          <p className="text-sm text-text-secondary">Scheduled</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Wallet Balance</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-accent-600">$</span>
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View Details
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Today's Sessions */}
      {todaySessions.length > 0 && (
        <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl font-semibold mb-6 text-text-primary">Today's Sessions</h2>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all"
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
                  <Button variant="primary" size="sm">
                    Start Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link to="/trainer/students" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
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
                    <p className="text-sm text-text-secondary">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="badge-brand capitalize">
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
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Create New Roadmap</h3>
          <p className="text-text-secondary text-sm mb-4">
            Build a custom learning path for your students
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Get Started
          </Button>
        </Link>
        <Link
          to="/trainer/availability"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Update Availability</h3>
          <p className="text-text-secondary text-sm mb-4">
            Manage your weekly schedule and capacity
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Manage
          </Button>
        </Link>
      </div>
    </div>
  );
}
