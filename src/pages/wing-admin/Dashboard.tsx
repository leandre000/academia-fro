import { useAuthStore } from '../../store/authStore';
import { mockWings, mockUsers, mockRoadmaps, mockSessions } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, CalendarIcon, BarChartIcon, RocketIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function WingAdminDashboard() {
  const { user } = useAuthStore();
  const wing = user?.wingId ? mockWings.find((w) => w.id === user.wingId) : mockWings[0];

  const trainers = Object.values(mockUsers).filter((u) => u.role === 'trainer' && u.wingId === wing?.id);
  const students = Object.values(mockUsers).filter((u) => u.role === 'student' && u.wingId === wing?.id);
  const activeRoadmaps = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const activeSessions = mockSessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-text-primary">
          Wing Administration
        </h1>
        <p className="text-text-secondary">{wing?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Trainers</span>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{trainers.length}</p>
          <p className="text-sm text-text-secondary mb-3">
            {wing?.currentTrainers || 0} / {wing?.trainerCapacity || 0} capacity
          </p>
          <Link to="/wing-admin/capacity">
            <Button variant="ghost" size="sm" showArrow>
              Manage
            </Button>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Students</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{students.length}</p>
          <p className="text-sm text-text-secondary mb-3">Active</p>
          <Link to="/wing-admin/activity">
            <Button variant="ghost" size="sm" showArrow>
              View Activity
            </Button>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Active Roadmaps</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{activeRoadmaps}</p>
          <p className="text-sm text-text-secondary">Approved</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Scheduled Sessions</span>
            <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-warning-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{activeSessions}</p>
          <p className="text-sm text-text-secondary">This week</p>
        </div>
      </div>

      {/* Wing Info */}
      <div className="card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-xl font-semibold mb-6 text-text-primary">Wing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Description</p>
            <p className="text-text-primary">{wing?.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">Capacity Utilization</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-surface-tertiary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((wing?.currentTrainers || 0) / (wing?.trainerCapacity || 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-lg font-semibold text-brand-600">
                {Math.round(((wing?.currentTrainers || 0) / (wing?.trainerCapacity || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/wing-admin/capacity"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
            <PersonIcon className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Trainer Capacity</h3>
          <p className="text-text-secondary text-sm mb-4">
            Manage trainer assignments and capacity
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Manage
          </Button>
        </Link>
        <Link
          to="/wing-admin/activity"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
            <BarChartIcon className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Student Activity</h3>
          <p className="text-text-secondary text-sm mb-4">
            Monitor student progress and engagement
          </p>
          <Button variant="ghost" size="sm" showArrow>
            View Activity
          </Button>
        </Link>
        <Link
          to="/wing-admin/wallet"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="w-12 h-12 bg-warning-light rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-warning-dark">$</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Wing Wallet</h3>
          <p className="text-text-secondary text-sm mb-4">
            View financial overview and transactions
          </p>
          <Button variant="ghost" size="sm" showArrow>
            View Wallet
          </Button>
        </Link>
      </div>
    </div>
  );
}
