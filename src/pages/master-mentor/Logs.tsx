import { mockRoadmaps, mockUsers } from '../../data/mockData';
import * as FileTextIcon from '@radix-ui/react-icons/dist/FileTextIcon';

export default function MasterMentorLogs() {
  const checkupLogs = [
    {
      id: '1',
      studentId: 'student1',
      roadmapId: 'roadmap1',
      date: '2024-01-20T10:00:00Z',
      notes: 'Student progressing well through Phase 1. All tasks completed on time.',
      status: 'positive',
    },
    {
      id: '2',
      studentId: 'student1',
      roadmapId: 'roadmap1',
      date: '2024-01-15T14:00:00Z',
      notes: 'Initial roadmap review completed. Approved with minor suggestions.',
      status: 'neutral',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkup Logs</h1>
        <p className="text-text-secondary">View mentor checkup and review history</p>
      </div>

      <div className="space-y-4">
        {checkupLogs.map((log) => {
          const roadmap = mockRoadmaps.find((r) => r.id === log.roadmapId);
          const student = mockUsers.student1;

          return (
            <div
              key={log.id}
              className="bg-bg-secondary border border-border rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileTextIcon.default className="w-5 h-5 text-white" />
                    <h3 className="font-semibold">Checkup Log #{log.id}</h3>
                    <span className={`text-xs rounded px-2 py-1 ${
                      log.status === 'positive'
                        ? 'bg-white text-black'
                        : log.status === 'negative'
                        ? 'bg-red-900/20 border border-red-500/50 text-red-400'
                        : 'bg-bg-tertiary border border-border'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {new Date(log.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Student</p>
                <p className="text-text-secondary">{student?.name}</p>
              </div>

              {roadmap && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Roadmap</p>
                  <p className="text-text-secondary">{roadmap.title}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Notes</p>
                <p className="text-text-secondary">{log.notes}</p>
              </div>
            </div>
          );
        })}
      </div>

      {checkupLogs.length === 0 && (
        <div className="bg-bg-secondary border border-border rounded-lg p-12 text-center">
          <FileTextIcon.default className="w-16 h-16 mx-auto mb-4 text-text-muted" />
          <h2 className="text-xl font-semibold mb-2">No Checkup Logs</h2>
          <p className="text-text-secondary">Checkup logs will appear here as you review roadmaps</p>
        </div>
      )}
    </div>
  );
}

