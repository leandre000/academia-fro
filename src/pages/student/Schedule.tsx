import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import { CalendarIcon, CheckIcon } from '@radix-ui/react-icons';

export default function StudentSchedule() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByStudentId(user.id) : [];

  const scheduledSessions = sessions.filter((s) => s.status === 'scheduled');
  const completedSessions = sessions.filter((s) => s.status === 'completed');
  const cancelledSessions = sessions.filter((s) => s.status === 'cancelled');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8 slide-up">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Weekly Schedule
        </h1>
        <p className="text-text-muted text-lg">View and manage your learning sessions</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Upcoming Sessions
        </h2>
        {scheduledSessions.length > 0 ? (
          <div className="space-y-4">
            {scheduledSessions.map((session, idx) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="card slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>{date}</p>
                        <p>{time}</p>
                        <p>Duration: {session.duration} minutes</p>
                      </div>
                      {session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-sm text-white hover:underline"
                        >
                          Meeting Link →
                        </a>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="btn-primary">
                        Join Session
                      </button>
                      {!session.attendanceConfirmed && (
                        <button className="btn-secondary">
                          Confirm Attendance
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-12 slide-up">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-text-muted" />
            <p className="text-text-muted text-lg">No upcoming sessions scheduled</p>
          </div>
        )}
      </div>

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckIcon className="w-5 h-5" />
            Completed Sessions
          </h2>
          <div className="space-y-4">
            {completedSessions.map((session, idx) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="card opacity-75 slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>{date}</p>
                        <p>{time}</p>
                        <p>Duration: {session.duration} minutes</p>
                      </div>
                    </div>
                    <span className="badge-success">
                      Completed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Sessions */}
      {cancelledSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Cancelled Sessions</h2>
          <div className="space-y-4">
            {cancelledSessions.map((session, idx) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="card opacity-50 slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>{date}</p>
                        <p>{time}</p>
                      </div>
                    </div>
                    <span className="badge-error">
                      Cancelled
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

