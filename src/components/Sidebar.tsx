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
    { path: '/student/roadmap', label: 'Roadmap', icon: FileTextIcon },
    { path: '/student/schedule', label: 'Schedule', icon: CalendarIcon },
    { path: '/student/attendance', label: 'Attendance', icon: CheckIcon },
  ],
  trainer: [
    { path: '/trainer', label: 'Dashboard', icon: HomeIcon },
    { path: '/trainer/availability', label: 'Availability', icon: CalendarIcon },
    { path: '/trainer/students', label: 'Students', icon: PersonIcon },
    { path: '/trainer/roadmap-builder', label: 'Roadmap Builder', icon: Pencil1Icon },
    { path: '/trainer/wallet', label: 'Wallet', icon: ArrowUpIcon },
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
    <div className="w-64 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Academia FRO
        </h1>
        <p className="text-sm text-gray-300 mt-2 font-medium">{user.name}</p>
        <p className="text-xs text-gray-500 mt-1 capitalize">{user.role.replace('_', ' ')}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-lg transform scale-[1.02]'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 border border-transparent hover:border-red-900/50"
        >
          <ExitIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

