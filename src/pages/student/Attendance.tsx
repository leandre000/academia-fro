import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';
import * as CrossCircledIcon from '@radix-ui/react-icons/dist/CrossCircledIcon';

export default function StudentAttendance() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByStudentId(user.id) : [];

  const attendanceStats = {
    total: sessions.length,
    confirmed: sessions.filter((s) => s.attendanceConfirmed).length,
    pending: sessions.filter((s) => s.status === 'scheduled' && !s.attendanceConfirmed).length,
    missed: sessions.filter((s) => s.status === 'scheduled' && !s.attendanceConfirmed && new Date(s.scheduledAt) < new Date()).length,
  };

  const attendanceRate = attendanceStats.total > 0 
    ? Math.round((attendanceStats.confirmed / attendanceStats.total) * 100)
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Attendance</h1>
        <p className="text-text-secondary">Track your session attendance and participation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Attendance Rate</p>
          <p className="text-3xl font-bold">{attendanceRate}%</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Total Sessions</p>
          <p className="text-3xl font-bold">{attendanceStats.total}</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Confirmed</p>
          <p className="text-3xl font-bold text-white">{attendanceStats.confirmed}</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Pending</p>
          <p className="text-3xl font-bold">{attendanceStats.pending}</p>
        </div>
      </div>

      {/* Session List */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Session History</h2>
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => {
              const isPast = new Date(session.scheduledAt) < new Date();
              const isConfirmed = session.attendanceConfirmed;
              
              return (
                <div
                  key={session.id}
                  className="bg-bg-tertiary border border-border rounded p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{session.title}</h3>
                        {isConfirmed ? (
                          <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium flex items-center gap-1">
                            <CheckIcon.default className="w-3 h-3" />
                            Confirmed
                          </span>
                        ) : isPast ? (
                          <span className="bg-red-900/20 border border-red-500/50 rounded px-2 py-1 text-xs text-red-400 flex items-center gap-1">
                            <CrossCircledIcon.default className="w-3 h-3" />
                            Missed
                          </span>
                        ) : (
                          <span className="bg-bg-primary border border-border rounded px-2 py-1 text-xs">
                            Pending
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-text-secondary space-y-1">
                        <p>
                          {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p>
                          {new Date(session.scheduledAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })} • {session.duration} minutes
                        </p>
                        <p className="capitalize">Status: {session.status}</p>
                      </div>
                    </div>
                    {!isPast && !isConfirmed && (
                      <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                        Confirm Attendance
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No sessions found</p>
        )}
      </div>
    </div>
  );
}

