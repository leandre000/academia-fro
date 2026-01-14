import { mockWings, mockUsers, mockRoadmaps, mockSessions } from '../../data/mockData';
import { PersonIcon } from '@radix-ui/react-icons';

export default function UmbrellaAdminWings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wing Performance Comparison</h1>
        <p className="text-text-secondary">Compare performance metrics across all wings</p>
      </div>

      <div className="space-y-6">
        {mockWings.map((wing) => {
          const trainers = Object.values(mockUsers).filter(
            (u) => u.role === 'trainer' && u.wingId === wing.id
          );
          const students = Object.values(mockUsers).filter(
            (u) => u.role === 'student' && u.wingId === wing.id
          );
          const roadmaps = mockRoadmaps.filter((r) => {
            const student = Object.values(mockUsers).find((u) => u.id === r.studentId);
            return student?.wingId === wing.id;
          });
          const sessions = mockSessions.filter((s) => {
            const student = Object.values(mockUsers).find((u) => u.id === s.studentId);
            return student?.wingId === wing.id;
          });

          const capacityUtil = Math.round((wing.currentTrainers / wing.trainerCapacity) * 100);
          const activeRoadmaps = roadmaps.filter((r) => r.status === 'approved').length;
          const activeSessions = sessions.filter((s) => s.status === 'scheduled').length;

          return (
            <div key={wing.id} className="bg-bg-secondary border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{wing.name}</h2>
                  <p className="text-text-secondary">{wing.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">${wing.walletBalance.toLocaleString()}</p>
                  <p className="text-sm text-text-muted">Wallet Balance</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-bg-tertiary border border-border rounded p-4">
                  <p className="text-xs text-text-muted mb-1">Trainers</p>
                  <p className="text-2xl font-bold">{trainers.length}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {wing.currentTrainers} / {wing.trainerCapacity} capacity
                  </p>
                  <div className="bg-bg-primary border border-border rounded-full h-1 mt-2">
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${capacityUtil}%` }}
                    />
                  </div>
                </div>

                <div className="bg-bg-tertiary border border-border rounded p-4">
                  <p className="text-xs text-text-muted mb-1">Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-xs text-text-muted mt-1">Active</p>
                </div>

                <div className="bg-bg-tertiary border border-border rounded p-4">
                  <p className="text-xs text-text-muted mb-1">Roadmaps</p>
                  <p className="text-2xl font-bold">{activeRoadmaps}</p>
                  <p className="text-xs text-text-muted mt-1">Approved</p>
                </div>

                <div className="bg-bg-tertiary border border-border rounded p-4">
                  <p className="text-xs text-text-muted mb-1">Sessions</p>
                  <p className="text-2xl font-bold">{activeSessions}</p>
                  <p className="text-xs text-text-muted mt-1">Scheduled</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
                  View Details
                </button>
                <button className="bg-bg-tertiary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
                  Manage Wing
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

