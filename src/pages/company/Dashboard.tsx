import { useAuthStore } from '../../store/authStore';
import { mockUsers, mockRoadmaps, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon } from '@radix-ui/react-icons';

export default function CompanyDashboard() {
  const { user } = useAuthStore();
  const companyStudents = Object.values(mockUsers).filter(
    (u) => u.role === 'student' && u.companyId === user?.companyId
  );
  const activeRoadmaps = mockRoadmaps.filter((r) => r.status === 'approved').length;
  const avgProgress = Math.round(
    mockStudentProgress.reduce((acc, p) => acc + p.completionPercentage, 0) /
      mockStudentProgress.length || 0
  );

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Company Portal
        </h1>
        <p className="text-text-muted text-lg">Welcome, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Our Students</span>
            <div className="w-12 h-12 bg-gradient-to-br from-info/20 to-info/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-info" />
            </div>
          </div>
          <p className="text-4xl font-bold text-text-primary mb-2">{companyStudents.length}</p>
          <Link to="/company/students" className="link-primary">
            View All →
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Active Programs</span>
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-4xl font-bold text-text-primary mb-2">{activeRoadmaps}</p>
          <Link to="/company/programs" className="link-primary">
            View Programs →
          </Link>
        </div>

        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-muted text-sm font-semibold">Average Progress</span>
            <div className="w-12 h-12 bg-gradient-to-br from-gradient-purple/20 to-gradient-pink/10 rounded-xl flex items-center justify-center">
              <PersonIcon className="w-6 h-6 text-gradient-purple" />
            </div>
          </div>
          <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">{avgProgress}%</p>
          <p className="text-sm text-text-muted">Across all students</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/company/students"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          <h3 className="text-xl font-semibold mb-2 text-text-primary">View Our Students</h3>
          <p className="text-text-muted">
            Monitor student progress and engagement
          </p>
        </Link>
        <Link
          to="/company/programs"
          className="card-interactive slide-up"
          style={{ animationDelay: '0.5s' }}
        >
          <h3 className="text-xl font-semibold mb-2 text-text-primary">View Programs</h3>
          <p className="text-text-muted">
            See active learning programs and roadmaps
          </p>
        </Link>
      </div>
    </div>
  );
}

