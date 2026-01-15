import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { CalendarIcon, ChevronDownIcon } from '@radix-ui/react-icons';

export default function TopHeader() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Schedule Calendar Button */}
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm">
          <CalendarIcon className="w-5 h-5" />
          <span>Schedule Calendar</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:scale-110 transition-transform">
            {user?.name.charAt(0).toUpperCase() || 'U'}
          </div>
          <ChevronDownIcon className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
        </div>
      </div>
    </header>
  );
}

