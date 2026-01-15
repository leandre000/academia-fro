import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons';

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
    <div className="p-6 animate-fade-in">
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Attendance
        </h1>
        <p className="text-text-muted text-lg">Track your session attendance and participation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-text-muted mb-2 font-semibold">Attendance Rate</p>
          <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">{attendanceRate}%</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm text-text-muted mb-2 font-semibold">Total Sessions</p>
          <p className="text-4xl font-bold text-text-primary">{attendanceStats.total}</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-text-muted mb-2 font-semibold">Confirmed</p>
          <p className="text-4xl font-bold text-success">{attendanceStats.confirmed}</p>
        </div>
        <div className="card slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm text-text-muted mb-2 font-semibold">Pending</p>
          <p className="text-4xl font-bold text-warning">{attendanceStats.pending}</p>
        </div>
      </div>

      {/* Session List */}
      <div className="card slide-up" style={{ animationDelay: '0.5s' }}>
        <h2 className="text-2xl font-semibold mb-6 text-text-primary">Session History</h2>
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session, idx) => {
              const isPast = new Date(session.scheduledAt) < new Date();
              const isConfirmed = session.attendanceConfirmed;
              
              return (
                <div
                  key={session.id}
                  className="bg-gradient-soft border border-border rounded-xl p-5 hover:shadow-md transition-all slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{session.title}</h3>
                        {isConfirmed ? (
                          <span className="badge-success flex items-center gap-1">
                            <CheckIcon className="w-3 h-3" />
                            Confirmed
                          </span>
                        ) : isPast ? (
                          <span className="badge-error flex items-center gap-1">
                            <CrossCircledIcon className="w-3 h-3" />
                            Missed
                          </span>
                        ) : (
                          <span className="badge-warning">
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
                      <button className="btn-primary">
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

