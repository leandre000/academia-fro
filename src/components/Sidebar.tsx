import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types';
import { HomeIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  student: [
    { path: '/student', label: 'Dashboard', icon: HomeIcon },
    { path: '/student/roadmap', label: 'Roadmap', icon: PersonIcon },
    { path: '/student/schedule', label: 'Schedule', icon: PersonIcon },
    { path: '/student/attendance', label: 'Attendance', icon: PersonIcon },
  ],
  trainer: [
    { path: '/trainer', label: 'Dashboard', icon: HomeIcon },
    { path: '/trainer/availability', label: 'Availability', icon: PersonIcon },
    { path: '/trainer/students', label: 'Students', icon: PersonIcon },
    { path: '/trainer/roadmap-builder', label: 'Roadmap Builder', icon: PersonIcon },
    { path: '/trainer/wallet', label: 'Wallet', icon: PersonIcon },
  ],
  master_mentor: [
    { path: '/master-mentor', label: 'Dashboard', icon: HomeIcon },
    { path: '/master-mentor/reviews', label: 'Roadmap Reviews', icon: PersonIcon },
    { path: '/master-mentor/progression', label: 'Progression Control', icon: PersonIcon },
    { path: '/master-mentor/logs', label: 'Checkup Logs', icon: PersonIcon },
  ],
  wing_admin: [
    { path: '/wing-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/wing-admin/capacity', label: 'Trainer Capacity', icon: PersonIcon },
    { path: '/wing-admin/activity', label: 'Student Activity', icon: PersonIcon },
    { path: '/wing-admin/wallet', label: 'Wing Wallet', icon: PersonIcon },
  ],
  umbrella_admin: [
    { path: '/umbrella-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/umbrella-admin/analytics', label: 'Analytics', icon: PersonIcon },
    { path: '/umbrella-admin/wings', label: 'Wing Performance', icon: PersonIcon },
    { path: '/umbrella-admin/rules', label: 'System Rules', icon: PersonIcon },
    { path: '/umbrella-admin/payments', label: 'Payment Flow', icon: PersonIcon },
  ],
  company: [
    { path: '/company', label: 'Dashboard', icon: HomeIcon },
    { path: '/company/students', label: 'Our Students', icon: PersonIcon },
    { path: '/company/programs', label: 'Programs', icon: PersonIcon },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const navItems = roleNavItems[user.role] || [];

  return (
    <div className="w-64 bg-bg-secondary border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold">Academia FRO</h1>
        <p className="text-sm text-text-muted mt-1">{user.name}</p>
        <p className="text-xs text-text-muted mt-1 capitalize">{user.role.replace('_', ' ')}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                isActive
                  ? 'bg-white text-black font-medium'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors"
        >
          <ExitIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

