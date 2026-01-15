import { useState } from 'react';
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
  BarChartIcon,
  RocketIcon,
  LayersIcon,
} from '@radix-ui/react-icons';
import ConfirmationModal from './ConfirmationModal';

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
    { path: '/master-mentor/progression', label: 'Progression Control', icon: RocketIcon },
    { path: '/master-mentor/logs', label: 'Checkup Logs', icon: LayersIcon },
    { path: '/settings', label: 'Settings', icon: GearIcon },
  ],
  wing_admin: [
    { path: '/wing-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/wing-admin/capacity', label: 'Trainer Capacity', icon: PersonIcon },
    { path: '/wing-admin/activity', label: 'Student Activity', icon: BarChartIcon },
    { path: '/wing-admin/wallet', label: 'Wing Wallet', icon: ArrowUpIcon },
    { path: '/settings', label: 'Settings', icon: GearIcon },
  ],
  umbrella_admin: [
    { path: '/umbrella-admin', label: 'Dashboard', icon: HomeIcon },
    { path: '/umbrella-admin/analytics', label: 'Analytics', icon: BarChartIcon },
    { path: '/umbrella-admin/wings', label: 'Wing Performance', icon: LayersIcon },
    { path: '/umbrella-admin/rules', label: 'System Rules', icon: GearIcon },
    { path: '/umbrella-admin/payments', label: 'Payment Flow', icon: ArrowDownIcon },
    { path: '/settings', label: 'Settings', icon: GearIcon },
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return null;

  const navItems = roleNavItems[user.role] || [];

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <div className="w-64 bg-white border-r border-border h-screen flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-border bg-gradient-soft">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Academia FRO
          </h1>
        </div>
        <div className="bg-white rounded-lg p-3 border border-border shadow-sm">
          <p className="text-sm font-semibold text-text-primary">{user.name}</p>
          <p className="text-xs text-text-muted mt-1 capitalize">{user.role.replace('_', ' ')}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive
                  ? 'bg-gradient-accent text-white font-semibold shadow-lg shadow-accent/30'
                  : 'text-text-secondary hover:bg-gradient-soft hover:text-accent'
              }`}
            >
              {isActive && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-white rounded-l-full opacity-80" />
              )}
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-text-muted'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border bg-gradient-soft">
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-error-light hover:text-error hover:border-error/20 border-2 border-transparent transition-all duration-300 font-medium"
        >
          <ExitIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout? You'll need to sign in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        variant="warning"
      />
    </div>
  );
}

