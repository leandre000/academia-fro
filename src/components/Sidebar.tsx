import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types';
import {
  HomeIcon,
  PersonIcon,
  ExitIcon,
  CalendarIcon,
  CheckIcon,
  FileTextIcon,
  Pencil1Icon,
  GearIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@radix-ui/react-icons';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleNavItems: Record<UserRole, NavItem[]> = {
  student: [
    { path: '/student', label: 'Dashboard', icon: HomeIcon },
    { path: '/student/roadmap', label: 'My Roadmap', icon: FileTextIcon },
    { path: '/student/schedule', label: 'Schedule', icon: CalendarIcon },
    { path: '/student/attendance', label: 'Attendance', icon: CheckIcon },
    { path: '/settings', label: 'Settings', icon: GearIcon },
  ],
  trainer: [
    { path: '/trainer', label: 'Dashboard', icon: HomeIcon },
    { path: '/trainer/availability', label: 'Availability', icon: CalendarIcon },
    { path: '/trainer/students', label: 'Students', icon: PersonIcon },
    { path: '/trainer/roadmap-builder', label: 'Roadmap Builder', icon: Pencil1Icon },
    { path: '/trainer/wallet', label: 'Wallet', icon: ArrowUpIcon },
    { path: '/settings', label: 'Settings', icon: GearIcon },
  ],
  master_mentor: [
    { path: '/master-mentor', label: 'Dashboard', icon: HomeIcon },
    { path: '/master-mentor/reviews', label: 'Roadmap Reviews', icon: FileTextIcon },
    { path: '/master-mentor/progression', label: 'Progression Control', icon: CheckIcon },
    { path: '/master-mentor/logs', label: 'Checkup Logs', icon: FileTextIcon },
  ],
  wing_admin: [
    { path: '/wing-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/wing-admin/capacity', label: 'Trainer Capacity', icon: PersonIcon },
    { path: '/wing-admin/activity', label: 'Student Activity', icon: CalendarIcon },
    { path: '/wing-admin/wallet', label: 'Wing Wallet', icon: ArrowUpIcon },
  ],
  umbrella_admin: [
    { path: '/umbrella-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/umbrella-admin/analytics', label: 'Analytics', icon: ArrowUpIcon },
    { path: '/umbrella-admin/wings', label: 'Wing Performance', icon: PersonIcon },
    { path: '/umbrella-admin/rules', label: 'System Rules', icon: GearIcon },
    { path: '/umbrella-admin/payments', label: 'Payment Flow', icon: ArrowDownIcon },
  ],
  company: [
    { path: '/company', label: 'Dashboard', icon: HomeIcon },
    { path: '/company/students', label: 'Our Students', icon: PersonIcon },
    { path: '/company/programs', label: 'Programs', icon: FileTextIcon },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const navItems = roleNavItems[user.role] || [];

  return (
    <div className="w-64 bg-bg-secondary border-r border-border h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-medium to-blue-light rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            Academia FRO
          </h1>
        </div>
        <p className="text-sm text-text-secondary font-medium">{user.name}</p>
        <p className="text-xs text-text-muted mt-1 capitalize">{user.role.replace('_', ' ')}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative ${
                isActive
                  ? 'bg-accent text-white font-semibold shadow-lg'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
              }`}
            >
              {isActive && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-text-muted'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <ExitIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

