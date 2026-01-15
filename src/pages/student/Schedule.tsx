import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import { CalendarIcon, CheckIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

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
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
          Weekly Schedule
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">View and manage your learning sessions</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-text-primary">
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
                  className="card p-4 sm:p-6 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-text-primary">{session.title}</h3>
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
                          className="inline-block mt-4 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                        >
                          Meeting Link →
                        </a>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="primary" size="sm">
                        Join Session
                      </Button>
                      {!session.attendanceConfirmed && (
                        <Button variant="secondary" size="sm">
                          Confirm Attendance
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card text-center py-12">
            <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-text-tertiary" />
            <p className="text-text-secondary text-lg">No upcoming sessions scheduled</p>
          </div>
        )}
      </div>

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-text-primary">
            <CheckIcon className="w-5 h-5" />
            Completed Sessions
          </h2>
          <div className="space-y-4">
            {completedSessions.map((session, idx) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="card p-4 sm:p-6 opacity-75 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-text-primary">{session.title}</h3>
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
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-text-primary">Cancelled Sessions</h2>
          <div className="space-y-4">
            {cancelledSessions.map((session, idx) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="card p-4 sm:p-6 opacity-50 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-text-primary">{session.title}</h3>
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
