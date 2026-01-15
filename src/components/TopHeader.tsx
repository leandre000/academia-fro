import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { CalendarIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import Button from './Button';

export default function TopHeader() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-14 sm:h-16 bg-header border-b border-header-border flex items-center justify-between px-3 sm:px-4 lg:px-6 sticky top-0 z-10 shadow-soft">
      {/* Search Bar */}
      <div className="flex-1 max-w-md mr-2 sm:mr-4">
        <div className="relative">
          <svg className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-8 sm:pl-10 text-sm sm:text-base bg-white border-header-border"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Button variant="primary" size="sm" className="hidden sm:flex">
          <CalendarIcon className="w-4 h-4" />
          <span className="hidden md:inline">Schedule Calendar</span>
        </Button>

        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-semibold shadow-soft group-hover:scale-105 transition-transform text-sm sm:text-base">
            {user?.name.charAt(0).toUpperCase() || 'U'}
          </div>
          <ChevronDownIcon className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
