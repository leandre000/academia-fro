import { useAuthStore } from '../../store/authStore';
import { getSessionsByTrainerId, getStudentsByTrainerId, mockTrainerAvailability, mockWallets } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, PersonIcon } from '@radix-ui/react-icons';

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
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Welcome, {user?.name}!
        </h1>
        <p className="text-text-muted">Trainer Dashboard Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-medium">Assigned Students</span>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <PersonIcon className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3 text-text-primary">{students.length}</p>
          <Link to="/trainer/students" className="text-sm text-accent hover:text-accent-hover transition-colors inline-block">
            View All →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-medium">Weekly Capacity</span>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3 text-text-primary">{availability.weeklyCapacity}h</p>
          <Link to="/trainer/availability" className="text-sm text-accent hover:text-accent-hover transition-colors inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-medium">Today's Sessions</span>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{todaySessions.length}</p>
          <p className="text-sm text-text-muted">Scheduled</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-medium">Wallet Balance</span>
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <PersonIcon className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3 text-text-primary">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="text-sm text-accent hover:text-accent-hover transition-colors inline-block">
            View Details →
          </Link>
        </div>
      </div>

      {/* Today's Sessions */}
      {todaySessions.length > 0 && (
        <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-text-primary">Today's Sessions</h2>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="bg-bg-tertiary border border-border rounded-lg p-5 hover:border-accent/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{session.title}</h3>
                    <p className="text-sm text-text-muted">
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} • {session.duration} minutes
                    </p>
                  </div>
                  <button className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-bg-secondary border border-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Upcoming Sessions</h2>
          <Link to="/trainer/students" className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1">
            View All →
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-bg-tertiary border border-border rounded-lg p-5 hover:border-accent/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{session.title}</h3>
                    <p className="text-sm text-text-muted">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-sm text-text-muted capitalize bg-bg-secondary px-3 py-1 rounded-lg border border-border">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No upcoming sessions</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/trainer/roadmap-builder"
          className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all"
        >
          <h3 className="text-lg font-semibold mb-3 text-text-primary">Create New Roadmap</h3>
          <p className="text-text-muted text-sm">
            Build a custom learning path for your students
          </p>
        </Link>
        <Link
          to="/trainer/availability"
          className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all"
        >
          <h3 className="text-lg font-semibold mb-3 text-text-primary">Update Availability</h3>
          <p className="text-text-muted text-sm">
            Manage your weekly schedule and capacity
          </p>
        </Link>
      </div>
    </div>
  );
}

