import { mockWings, mockUsers, mockRoadmaps, mockSessions } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, CalendarIcon, BarChartIcon, LayersIcon, GearIcon, RocketIcon } from '@radix-ui/react-icons';

export default function UmbrellaAdminDashboard() {
  const totalWings = mockWings.length;
  const totalTrainers = Object.values(mockUsers).filter((u) => u.role === 'trainer').length;
  const totalStudents = Object.values(mockUsers).filter((u) => u.role === 'student').length;
  const totalRevenue = mockWings.reduce((sum, w) => sum + w.walletBalance, 0);
  const activeRoadmaps = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const activeSessions = mockSessions.filter((s) => s.status === 'scheduled').length;

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-text-primary">
          Umbrella Administration
        </h1>
        <p className="text-text-secondary">Global system overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Wings</span>
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <LayersIcon className="w-5 h-5 text-brand-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{totalWings}</p>
          <Link to="/umbrella-admin/wings" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View Performance
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Trainers</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{totalTrainers}</p>
          <p className="text-sm text-text-secondary">Active</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Students</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{totalStudents}</p>
          <p className="text-sm text-text-secondary">Enrolled</p>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Total Revenue</span>
            <div className="w-10 h-10 bg-warning-light rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-warning-dark">$</span>
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">${totalRevenue.toLocaleString()}</p>
          <Link to="/umbrella-admin/payments" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View Details
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-5 h-5 text-brand-600" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Active Roadmaps</h2>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{activeRoadmaps}</p>
          <p className="text-sm text-text-secondary">Approved and in progress</p>
        </div>
        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-accent-600" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Scheduled Sessions</h2>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{activeSessions}</p>
          <p className="text-sm text-text-secondary">This week</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link
          to="/umbrella-admin/analytics"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
            <BarChartIcon className="w-6 h-6 text-brand-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Analytics</h3>
          <p className="text-text-secondary text-sm">
            View comprehensive system analytics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/wings"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-4">
            <LayersIcon className="w-6 h-6 text-accent-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Wing Performance</h3>
          <p className="text-text-secondary text-sm">
            Compare wing performance metrics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/rules"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.9s' }}
        >
          <div className="w-12 h-12 bg-warning-light rounded-xl flex items-center justify-center mb-4">
            <GearIcon className="w-6 h-6 text-warning-dark" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">System Rules</h3>
          <p className="text-text-secondary text-sm">
            Manage system-wide rules and policies
          </p>
        </Link>
        <Link
          to="/umbrella-admin/payments"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '1.0s' }}
        >
          <div className="w-12 h-12 bg-success-light rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-success-dark">$</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Payment Flow</h3>
          <p className="text-text-secondary text-sm">
            Monitor payment processing and flows
          </p>
        </Link>
      </div>
    </div>
  );
}
