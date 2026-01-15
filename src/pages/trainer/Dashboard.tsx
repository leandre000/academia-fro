import { useAuthStore } from '../../store/authStore';
import { getSessionsByTrainerId, getStudentsByTrainerId, mockTrainerAvailability, mockWallets } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, PersonIcon, ArrowRightIcon, WalletIcon, ClockIcon, RocketIcon } from '@radix-ui/react-icons';
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
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Welcome, {user?.name}!
        </h1>
        <p className="text-text-muted">Trainer Dashboard Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card-gradient slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Assigned Students</span>
            <div className="bg-gradient-to-br from-info/20 to-info/10 p-3 rounded-xl">
              <PersonIcon className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">{students.length}</p>
          <Link to="/trainer/students" className="link-primary text-sm">
            View All
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="card-gradient slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Weekly Capacity</span>
            <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-3 rounded-xl">
              <ClockIcon className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">{availability.weeklyCapacity}h</p>
          <Link to="/trainer/availability" className="link-primary text-sm">
            Manage
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="card-gradient slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Today's Sessions</span>
            <div className="bg-gradient-to-br from-success/20 to-success/10 p-3 rounded-xl">
              <CalendarIcon className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">{todaySessions.length}</p>
          <p className="text-sm text-text-muted font-medium">Scheduled</p>
        </div>

        <div className="card-gradient slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Wallet Balance</span>
            <div className="bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 p-3 rounded-xl">
              <WalletIcon className="w-5 h-5 text-tertiary-accent" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="link-primary text-sm">
            View Details
            <ArrowRightIcon className="w-4 h-4" />
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
                  <Button variant="primary" size="md">
                    Start Session
                  </Button>
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
          className="card-interactive slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Create New Roadmap</h3>
          <p className="text-text-muted text-sm mb-4">
            Build a custom learning path for your students
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Get Started
          </Button>
        </Link>
        <Link
          to="/trainer/availability"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Update Availability</h3>
          <p className="text-text-muted text-sm mb-4">
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

