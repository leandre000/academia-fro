import { useAuthStore } from '../../store/authStore';
import { mockUsers, mockRoadmaps, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, FileTextIcon, RocketIcon } from '@radix-ui/react-icons';

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
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
          Company Portal
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">Welcome, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Our Students</span>
            <div className="w-10 h-10 bg-info-light rounded-xl flex items-center justify-center">
              <PersonIcon className="w-5 h-5 text-info-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{companyStudents.length}</p>
          <Link to="/company/students" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View All
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Active Programs</span>
            <div className="w-10 h-10 bg-success-light rounded-xl flex items-center justify-center">
              <FileTextIcon className="w-5 h-5 text-success-dark" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-text-primary">{activeRoadmaps}</p>
          <Link to="/company/programs" className="text-sm font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors">
            View Programs
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">Average Progress</span>
            <div className="w-10 h-10 bg-accent-50 rounded-xl flex items-center justify-center">
              <RocketIcon className="w-5 h-5 text-accent-600" />
            </div>
          </div>
          <p className="text-4xl font-semibold mb-2 text-brand-600">{avgProgress}%</p>
          <p className="text-sm text-text-secondary">Across all students</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/company/students"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">View Our Students</h3>
          <p className="text-text-secondary">
            Monitor student progress and engagement
          </p>
        </Link>
        <Link
          to="/company/programs"
          className="card-interactive p-6 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <h3 className="text-xl font-semibold mb-3 text-text-primary">View Programs</h3>
          <p className="text-text-secondary">
            See active learning programs and roadmaps
          </p>
        </Link>
      </div>
    </div>
  );
}
