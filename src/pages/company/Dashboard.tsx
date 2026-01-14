import { useAuthStore } from '../../store/authStore';
import { mockUsers, mockRoadmaps, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import * as PersonIcon from '@radix-ui/react-icons/dist/PersonIcon';

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Portal</h1>
        <p className="text-text-secondary">Welcome, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Our Students</span>
            <PersonIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{companyStudents.length}</p>
          <Link to="/company/students" className="text-sm text-white hover:underline mt-2 inline-block">
            View All →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Active Programs</span>
            <PersonIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{activeRoadmaps}</p>
          <Link to="/company/programs" className="text-sm text-white hover:underline mt-2 inline-block">
            View Programs →
          </Link>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Average Progress</span>
            <PersonIcon.default className="w-5 h-5 text-white" />
          </div>
          <p className="text-3xl font-bold">{avgProgress}%</p>
          <p className="text-sm text-text-muted mt-1">Across all students</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/company/students"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">View Our Students</h3>
          <p className="text-text-secondary text-sm">
            Monitor student progress and engagement
          </p>
        </Link>
        <Link
          to="/company/programs"
          className="bg-bg-secondary border border-white rounded-lg p-6 hover:bg-bg-tertiary transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2">View Programs</h3>
          <p className="text-text-secondary text-sm">
            See active learning programs and roadmaps
          </p>
        </Link>
      </div>
    </div>
  );
}

