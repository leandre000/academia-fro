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
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Wing Administration
        </h1>
        <p className="text-text-muted text-lg font-medium">{wing?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Trainers</span>
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{trainers.length}</p>
          <p className="text-sm text-text-muted font-medium mb-3">
            {wing?.currentTrainers || 0} / {wing?.trainerCapacity || 0} capacity
          </p>
          <Link to="/wing-admin/capacity">
            <Button variant="ghost" size="sm" showArrow>
              Manage
            </Button>
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Students</span>
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{students.length}</p>
          <p className="text-sm text-text-muted font-medium mb-3">Active</p>
          <Link to="/wing-admin/activity">
            <Button variant="ghost" size="sm" showArrow>
              View Activity
            </Button>
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Active Roadmaps</span>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-6 h-6 text-secondary-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{activeRoadmaps}</p>
          <p className="text-sm text-text-muted font-medium">Approved</p>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Scheduled Sessions</span>
            <div className="w-12 h-12 bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-tertiary-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{activeSessions}</p>
          <p className="text-sm text-text-muted font-medium">This week</p>
        </div>
      </div>

      {/* Wing Info */}
      <div className="card mb-8 slide-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-semibold mb-6 text-text-primary">Wing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-text-muted mb-2 font-semibold">Description</p>
            <p className="text-text-secondary">{wing?.description}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-2 font-semibold">Capacity Utilization</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-bg-tertiary rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-accent h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((wing?.currentTrainers || 0) / (wing?.trainerCapacity || 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-lg font-bold text-accent">
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
          className="card-interactive slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-4">
            <PersonIcon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Trainer Capacity</h3>
          <p className="text-text-muted text-sm mb-4">
            Manage trainer assignments and capacity
          </p>
          <Button variant="ghost" size="sm" showArrow>
            Manage
          </Button>
        </Link>
        <Link
          to="/wing-admin/activity"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center mb-4">
            <BarChartIcon className="w-6 h-6 text-secondary-accent" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Student Activity</h3>
          <p className="text-text-muted text-sm mb-4">
            Monitor student progress and engagement
          </p>
          <Button variant="ghost" size="sm" showArrow>
            View Activity
          </Button>
        </Link>
        <Link
          to="/wing-admin/wallet"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-tertiary-accent">$</span>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-text-primary">Wing Wallet</h3>
          <p className="text-text-muted text-sm mb-4">
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
