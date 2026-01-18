import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import { CalendarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';
import type { Session } from '../../types';

export default function StudentSchedule() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByStudentId(user.id) : [];

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
    return new Date(today.setDate(diff));
  });

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  const getSessionsForDate = (date: Date): Session[] => {
    return sessions.filter((s) => {
      const sessionDate = new Date(s.scheduledAt);
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const nextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const prevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const goToToday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(today.setDate(diff)));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">
          Weekly Schedule
        </h1>
        <p className="text-text-secondary text-base">View and manage your learning sessions</p>
      </div>

      {/* Week Navigator */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevWeek}
            className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeftIcon className="w-6 h-6 text-text-primary" />
          </button>

          <div className="text-center">
            <h2 className="text-xl font-bold text-text-primary">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
              {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>

          <button
            onClick={nextWeek}
            className="p-2 hover:bg-dark-600 rounded-lg transition-colors"
            aria-label="Next week"
          >
            <ChevronRightIcon className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        <div className="flex justify-center">
          <Button variant="secondary" size="sm" onClick={goToToday}>
            Today
          </Button>
        </div>
      </div>

      {/* Weekly Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weekDates.map((date, index) => {
          const daySessions = getSessionsForDate(date);
          const isCurrentDay = isToday(date);

          return (
            <div
              key={index}
              className={`bg-dark-700 border rounded-2xl p-5 transition-all ${isCurrentDay
                  ? 'border-primary-600 ring-2 ring-primary-600/20'
                  : 'border-dark-600 hover:border-primary-600/50'
                }`}
            >
              {/* Day Header */}
              <div className="mb-4 pb-3 border-b border-dark-600">
                <h3 className={`font-bold text-lg ${isCurrentDay ? 'text-primary-500' : 'text-text-primary'}`}>
                  {weekDays[index]}
                </h3>
                <p className="text-sm text-text-tertiary">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
                {isCurrentDay && (
                  <span className="inline-block mt-2 px-2 py-1 bg-primary-600/10 text-primary-400 rounded-full text-xs font-medium">
                    Today
                  </span>
                )}
              </div>

              {/* Sessions for this day */}
              {daySessions.length > 0 ? (
                <div className="space-y-3">
                  {daySessions.map((session) => {
                    const sessionTime = new Date(session.scheduledAt);
                    return (
                      <div
                        key={session.id}
                        className={`bg-dark-800 border rounded-xl p-3 transition-all ${session.status === 'completed'
                            ? 'border-success/30 hover:border-success/50'
                            : session.status === 'cancelled'
                              ? 'border-error/30 opacity-50'
                              : 'border-dark-600 hover:border-primary-600/50'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-xs font-semibold text-text-tertiary">
                            {sessionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {session.status === 'completed' && (
                            <CheckIcon className="w-4 h-4 text-success" />
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-text-primary mb-1">
                          {session.title}
                        </h4>
                        <p className="text-xs text-text-tertiary">
                          {session.duration} min
                        </p>
                        {session.status === 'scheduled' && session.meetingLink && (
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2"
                          >
                            <Button variant="primary" size="sm" className="w-full text-xs">
                              Join
                            </Button>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-text-tertiary opacity-50" />
                  <p className="text-xs text-text-tertiary">No sessions</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">This Week</span>
            <CalendarIcon className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-text-primary">
            {sessions.filter((s) => {
              const sessionDate = new Date(s.scheduledAt);
              return sessionDate >= weekDates[0] && sessionDate <= weekDates[6] && s.status === 'scheduled';
            }).length}
          </p>
          <p className="text-sm text-text-tertiary mt-1">Scheduled sessions</p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Completed</span>
            <CheckIcon className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-bold text-text-primary">
            {sessions.filter((s) => {
              const sessionDate = new Date(s.scheduledAt);
              return sessionDate >= weekDates[0] && sessionDate <= weekDates[6] && s.status === 'completed';
            }).length}
          </p>
          <p className="text-sm text-text-tertiary mt-1">Sessions completed</p>
        </div>

        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Total Hours</span>
            <span className="text-xl font-bold text-accent-emerald">⏱️</span>
          </div>
          <p className="text-3xl font-bold text-text-primary">
            {(sessions.filter((s) => {
              const sessionDate = new Date(s.scheduledAt);
              return sessionDate >= weekDates[0] && sessionDate <= weekDates[6] && s.status === 'completed';
            }).reduce((acc, s) => acc + s.duration, 0) / 60).toFixed(1)}h
          </p>
          <p className="text-sm text-text-tertiary mt-1">Learning time</p>
        </div>
      </div>
    </div>
  );
}
