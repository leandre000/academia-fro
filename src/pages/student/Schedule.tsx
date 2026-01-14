import { useAuthStore } from '../../store/authStore';
import { getSessionsByStudentId } from '../../data/mockData';
import * as CalendarIcon from '@radix-ui/react-icons/dist/CalendarIcon';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';

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
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Weekly Schedule</h1>
        <p className="text-text-secondary">View and manage your learning sessions</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CalendarIcon.default className="w-5 h-5" />
          Upcoming Sessions
        </h2>
        {scheduledSessions.length > 0 ? (
          <div className="space-y-4">
            {scheduledSessions.map((session) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="bg-bg-secondary border border-white rounded-lg p-6"
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
                      <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                        Join Session
                      </button>
                      {!session.attendanceConfirmed && (
                        <button className="bg-bg-tertiary border border-border text-white px-6 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
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
          <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
            <p className="text-text-muted">No upcoming sessions scheduled</p>
          </div>
        )}
      </div>

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckIcon.default className="w-5 h-5" />
            Completed Sessions
          </h2>
          <div className="space-y-4">
            {completedSessions.map((session) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="bg-bg-secondary border border-border rounded-lg p-6 opacity-75"
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
                    <span className="bg-white text-black rounded px-3 py-1 text-sm font-medium">
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
            {cancelledSessions.map((session) => {
              const { date, time } = formatDate(session.scheduledAt);
              return (
                <div
                  key={session.id}
                  className="bg-bg-secondary border border-border rounded-lg p-6 opacity-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                      <div className="space-y-1 text-sm text-text-secondary">
                        <p>{date}</p>
                        <p>{time}</p>
                      </div>
                    </div>
                    <span className="bg-bg-tertiary border border-border rounded px-3 py-1 text-sm">
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

