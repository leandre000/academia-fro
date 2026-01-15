import { useAuthStore } from '../../store/authStore';
import { getSessionsByTrainerId, getStudentsByTrainerId, mockTrainerAvailability, mockWallets } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { CalendarIcon, PersonIcon } from '@radix-ui/react-icons';

export default function TrainerDashboard() {
  const { user } = useAuthStore();
  const sessions = user ? getSessionsByTrainerId(user.id) : [];
  const students = user ? getStudentsByTrainerId(user.id) : [];
  const wallet = user ? mockWallets[user.id] : null;
  const availability = mockTrainerAvailability;

  const upcomingSessions = sessions.filter((s) => s.status === 'scheduled').slice(0, 3);
  const todaySessions = sessions.filter((s) => {
    const sessionDate = new Date(s.scheduledAt);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString() && s.status === 'scheduled';
  });

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-400 text-lg">Trainer Dashboard Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Assigned Students</span>
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <PersonIcon className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3">{students.length}</p>
          <Link to="/trainer/students" className="text-sm text-white hover:text-gray-300 transition-colors inline-block">
            View All →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Weekly Capacity</span>
            <div className="bg-purple-500/20 p-2 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3">{availability.weeklyCapacity}h</p>
          <Link to="/trainer/availability" className="text-sm text-white hover:text-gray-300 transition-colors inline-block">
            Manage →
          </Link>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Today's Sessions</span>
            <div className="bg-green-500/20 p-2 rounded-lg">
              <CalendarIcon className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">{todaySessions.length}</p>
          <p className="text-sm text-gray-500">Scheduled</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Wallet Balance</span>
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <PersonIcon className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <p className="text-4xl font-bold mb-3">${wallet?.balance.toLocaleString() || 0}</p>
          <Link to="/trainer/wallet" className="text-sm text-white hover:text-gray-300 transition-colors inline-block">
            View Details →
          </Link>
        </div>
      </div>

      {/* Today's Sessions */}
      {todaySessions.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Today's Sessions</h2>
          <div className="space-y-4">
            {todaySessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all hover:bg-gray-800/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{session.title}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} • {session.duration} minutes
                    </p>
                  </div>
                  <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 shadow-lg">
                    Start Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Sessions</h2>
          <Link to="/trainer/students" className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-1">
            View All →
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all hover:bg-gray-800/50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{session.title}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(session.scheduledAt).toLocaleDateString()} at{' '}
                      {new Date(session.scheduledAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 capitalize bg-gray-700 px-3 py-1 rounded-lg">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No upcoming sessions</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/trainer/roadmap-builder"
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-semibold mb-3">Create New Roadmap</h3>
          <p className="text-gray-400 text-sm">
            Build a custom learning path for your students
          </p>
        </Link>
        <Link
          to="/trainer/availability"
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <h3 className="text-xl font-semibold mb-3">Update Availability</h3>
          <p className="text-gray-400 text-sm">
            Manage your weekly schedule and capacity
          </p>
        </Link>
      </div>
    </div>
  );
}

