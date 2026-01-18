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
    { path: '/settings', label: 'Settings', icon: GearIcon },
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
    <>
      <div className="hidden lg:flex w-64 bg-surface-primary border-r border-border h-screen flex-col">
        {/* Logo Section */}
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-soft">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <h1 className="text-base sm:text-lg font-semibold text-text-primary">
              Academia FRO
            </h1>
          </div>
          <div className="bg-surface-tertiary rounded-xl p-3 border border-border">
            <p className="text-sm font-medium text-text-primary">{user.name}</p>
            <p className="text-xs text-text-tertiary mt-0.5 capitalize">{user.role.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? 'nav-link-active' : 'nav-link'}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full nav-link text-error hover:bg-error-light hover:text-error-dark"
          >
            <ExitIcon className="w-5 h-5 flex-shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Hidden by default, can be toggled */}
      <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" style={{ display: 'none' }} id="mobile-sidebar-overlay">
        <div className="w-64 bg-surface-primary h-full border-r border-border flex flex-col">
          {/* Same content as desktop sidebar */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-soft">
                <span className="text-white font-semibold text-lg">A</span>
              </div>
              <h1 className="text-base font-semibold text-text-primary">
                Academia FRO
              </h1>
            </div>
            <div className="bg-surface-tertiary rounded-xl p-3 border border-border">
              <p className="text-sm font-medium text-text-primary">{user.name}</p>
              <p className="text-xs text-text-tertiary mt-0.5 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive ? 'nav-link-active' : 'nav-link'}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-border">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full nav-link text-error hover:bg-error-light hover:text-error-dark"
            >
              <ExitIcon className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>
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
    </>
  );
}
