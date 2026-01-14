import { mockWings, mockUsers, mockRoadmaps, mockSessions } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, CalendarIcon } from '@radix-ui/react-icons';

export default function UmbrellaAdminDashboard() {
  const totalWings = mockWings.length;
  const totalTrainers = Object.values(mockUsers).filter((u) => u.role === 'trainer').length;
  const totalStudents = Object.values(mockUsers).filter((u) => u.role === 'student').length;
  const totalRevenue = mockWings.reduce((sum, w) => sum + w.walletBalance, 0);
  const activeRoadmaps = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const activeSessions = mockSessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Umbrella Administration</h1>
        <p className="text-text-secondary">Global system overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Total Wings</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{totalWings}</p>
          <Link to="/umbrella-admin/wings" className="text-sm text-white hover:underline mt-2 inline-block">
            View Performance →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Total Trainers</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{totalTrainers}</p>
          <p className="text-sm text-text-muted mt-1">Active</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Total Students</span>
            <PersonIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{totalStudents}</p>
          <p className="text-sm text-text-muted mt-1">Enrolled</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Total Revenue</span>
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
          <Link to="/umbrella-admin/payments" className="text-sm text-white hover:underline mt-2 inline-block">
            View Details →
          </Link>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Active Roadmaps</h2>
          <p className="text-4xl font-bold mb-2">{activeRoadmaps}</p>
          <p className="text-sm text-text-muted">Approved and in progress</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Scheduled Sessions</h2>
          <p className="text-4xl font-bold mb-2">{activeSessions}</p>
          <p className="text-sm text-text-muted">This week</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link
          to="/umbrella-admin/analytics"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-text-secondary text-sm">
            View comprehensive system analytics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/wings"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Wing Performance</h3>
          <p className="text-text-secondary text-sm">
            Compare wing performance metrics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/rules"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">System Rules</h3>
          <p className="text-text-secondary text-sm">
            Manage system-wide rules and policies
          </p>
        </Link>
        <Link
          to="/umbrella-admin/payments"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">Payment Flow</h3>
          <p className="text-text-secondary text-sm">
            Monitor payment processing and flows
          </p>
        </Link>
      </div>
    </div>
  );
}

