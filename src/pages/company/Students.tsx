import { useAuthStore } from '../../store/authStore';
import { mockUsers, mockRoadmaps, mockStudentProgress } from '../../data/mockData';
import * as PersonIcon from '@radix-ui/react-icons/dist/PersonIcon';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';

export default function CompanyStudents() {
  const { user } = useAuthStore();
  const companyStudents = Object.values(mockUsers).filter(
    (u) => u.role === 'student' && u.companyId === user?.companyId
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Students</h1>
        <p className="text-text-secondary">View progress and engagement of company-sponsored students</p>
      </div>

      {companyStudents.length > 0 ? (
        <div className="space-y-6">
          {companyStudents.map((student) => {
            const progress = mockStudentProgress.find((p) => p.studentId === student.id);
            const roadmap = mockRoadmaps.find((r) => r.studentId === student.id);

            return (
              <div
                key={student.id}
                className="bg-bg-secondary border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg-tertiary border border-border rounded-full flex items-center justify-center">
                      <PersonIcon.default className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{student.name}</h2>
                      <p className="text-text-secondary">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{progress?.completionPercentage || 0}%</p>
                    <p className="text-sm text-text-muted">Progress</p>
                  </div>
                </div>

                {roadmap && (
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">{roadmap.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-bg-tertiary border border-border rounded p-4">
                    <p className="text-sm text-text-muted mb-1">Current Phase</p>
                    <p className="text-2xl font-bold">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded p-4">
                    <p className="text-sm text-text-muted mb-1">Tasks Completed</p>
                    <p className="text-2xl font-bold">
                      {progress?.completedTasks || 0} / {progress?.totalTasks || 0}
                    </p>
                    <p className="text-xs text-text-muted mt-1">Total tasks</p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded p-4">
                    <p className="text-sm text-text-muted mb-1">Last Activity</p>
                    <p className="text-sm font-medium">
                      {progress?.lastActivity
                        ? new Date(progress.lastActivity).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckIcon.default className="w-4 h-4 text-white" />
                    <span className="text-text-secondary">
                      {progress?.completedTasks || 0} tasks completed out of {progress?.totalTasks || 0} total
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border rounded-lg p-12 text-center">
          <PersonIcon.default className="w-16 h-16 mx-auto mb-4 text-text-muted" />
          <h2 className="text-xl font-semibold mb-2">No Students Found</h2>
          <p className="text-text-secondary">
            Students sponsored by your company will appear here
          </p>
        </div>
      )}
    </div>
  );
}

