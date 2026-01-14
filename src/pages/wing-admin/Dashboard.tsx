import { useAuthStore } from '../../store/authStore';
import { mockWings, mockUsers, mockRoadmaps, mockSessions } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, CalendarIcon } from '@radix-ui/react-icons';

export default function WingAdminDashboard() {
  const { user } = useAuthStore();
  const wing = user?.wingId ? mockWings.find((w) => w.id === user.wingId) : mockWings[0];

  const trainers = Object.values(mockUsers).filter((u) => u.role === 'trainer' && u.wingId === wing?.id);
  const students = Object.values(mockUsers).filter((u) => u.role === 'student' && u.wingId === wing?.id);
  const activeRoadmaps = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const activeSessions = mockSessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wing Administration</h1>
        <p className="text-text-secondary">{wing?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Trainers</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{trainers.length}</p>
          <p className="text-sm text-text-muted mt-1">
            {wing?.currentTrainers || 0} / {wing?.trainerCapacity || 0} capacity
          </p>
          <Link to="/wing-admin/capacity" className="text-sm text-white hover:underline mt-2 inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Students</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{students.length}</p>
          <p className="text-sm text-text-muted mt-1">Active</p>
          <Link to="/wing-admin/activity" className="text-sm text-white hover:underline mt-2 inline-block">
            View Activity →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Active Roadmaps</span>
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{activeRoadmaps}</p>
          <p className="text-sm text-text-muted mt-1">Approved</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Scheduled Sessions</span>
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{activeSessions}</p>
          <p className="text-sm text-text-muted mt-1">This week</p>
        </div>
      </div>

      {/* Wing Info */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Wing Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-text-muted mb-1">Description</p>
            <p className="text-text-secondary">{wing?.description}</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Capacity Utilization</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-bg-tertiary border border-border rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{
                    width: `${((wing?.currentTrainers || 0) / (wing?.trainerCapacity || 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm font-medium">
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
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Trainer Capacity</h3>
          <p className="text-text-secondary text-sm">
            Manage trainer assignments and capacity
          </p>
        </Link>
        <Link
          to="/wing-admin/activity"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Student Activity</h3>
          <p className="text-text-secondary text-sm">
            Monitor student progress and engagement
          </p>
        </Link>
        <Link
          to="/wing-admin/wallet"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Wing Wallet</h3>
          <p className="text-text-secondary text-sm">
            View financial overview and transactions
          </p>
        </Link>
      </div>
    </div>
  );
}

