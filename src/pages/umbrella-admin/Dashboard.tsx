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
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Umbrella Administration
        </h1>
        <p className="text-text-muted text-lg">Global system overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Total Wings</span>
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
              <LayersIcon className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{totalWings}</p>
          <Link to="/umbrella-admin/wings" className="link-primary text-sm">
            View Performance →
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Total Trainers</span>
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{totalTrainers}</p>
          <p className="text-sm text-text-muted font-medium">Active</p>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Total Students</span>
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-secondary-accent" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{totalStudents}</p>
          <p className="text-sm text-text-muted font-medium">Enrolled</p>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Total Revenue</span>
            <div className="w-12 h-12 bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-tertiary-accent">$</span>
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">${totalRevenue.toLocaleString()}</p>
          <Link to="/umbrella-admin/payments" className="link-primary text-sm">
            View Details →
          </Link>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Active Roadmaps</h2>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{activeRoadmaps}</p>
          <p className="text-sm text-text-muted font-medium">Approved and in progress</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-secondary-accent" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Scheduled Sessions</h2>
          </div>
          <p className="text-4xl font-bold mb-2 text-text-primary">{activeSessions}</p>
          <p className="text-sm text-text-muted font-medium">This week</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link
          to="/umbrella-admin/analytics"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.7s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-4">
            <BarChartIcon className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Analytics</h3>
          <p className="text-text-muted text-sm">
            View comprehensive system analytics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/wings"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-secondary-accent/20 to-secondary-accent/10 rounded-xl flex items-center justify-center mb-4">
            <LayersIcon className="w-6 h-6 text-secondary-accent" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Wing Performance</h3>
          <p className="text-text-muted text-sm">
            Compare wing performance metrics
          </p>
        </Link>
        <Link
          to="/umbrella-admin/rules"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.9s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-tertiary-accent/20 to-tertiary-accent/10 rounded-xl flex items-center justify-center mb-4">
            <GearIcon className="w-6 h-6 text-tertiary-accent" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">System Rules</h3>
          <p className="text-text-muted text-sm">
            Manage system-wide rules and policies
          </p>
        </Link>
        <Link
          to="/umbrella-admin/payments"
          className="card-interactive slide-up"
          style={{ animationDelay: '1.0s' }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-success">$</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-text-primary">Payment Flow</h3>
          <p className="text-text-muted text-sm">
            Monitor payment processing and flows
          </p>
        </Link>
      </div>
    </div>
  );
}
