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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-text-secondary">Trainer Dashboard Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Assigned Students</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{students.length}</p>
          <Link to="/trainer/students" className="text-sm text-white hover:underline mt-2 inline-block">
            View All →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Weekly Capacity</span>
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{availability.weeklyCapacity}h</p>
          <Link to="/trainer/availability" className="text-sm text-white hover:underline mt-2 inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Today's Sessions</span>
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{todaySessions.length}</p>
          <p className="text-sm text-text-muted mt-1">Scheduled</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Wallet Balance</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="text-sm text-white hover:underline mt-2 inline-block">
            View Details →
          </Link>
        </div>
      </div>

      {/* Today's Sessions */}
      {todaySessions.length > 0 && (
        <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Sessions</h2>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="bg-bg-tertiary border border-white rounded p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{session.title}</h3>
                    <p className="text-sm text-text-secondary">
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} • {session.duration} minutes
                    </p>
                  </div>
                  <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <Link to="/trainer/students" className="text-sm text-white hover:underline">
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
                    <p className="text-sm text-text-secondary">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-sm text-text-muted capitalize">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted">No upcoming sessions</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/trainer/roadmap-builder"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Create New Roadmap</h3>
          <p className="text-text-secondary text-sm">
            Build a custom learning path for your students
          </p>
        </Link>
        <Link
          to="/trainer/availability"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Update Availability</h3>
          <p className="text-text-secondary text-sm">
            Manage your weekly schedule and capacity
          </p>
        </Link>
      </div>
    </div>
  );
}

