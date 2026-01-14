import { useAuthStore } from '../../store/authStore';
import { mockRoadmaps, mockUsers } from '../../data/mockData';
import * as FileTextIcon from '@radix-ui/react-icons/dist/FileTextIcon';

export default function CompanyPrograms() {
  const { user } = useAuthStore();
  const companyStudents = Object.values(mockUsers).filter(
    (u) => u.role === 'student' && u.companyId === user?.companyId
  );
  const companyRoadmaps = mockRoadmaps.filter((r) =>
    companyStudents.some((s) => s.id === r.studentId)
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Active Programs</h1>
        <p className="text-text-secondary">View learning programs and roadmaps for company students</p>
      </div>

      {companyRoadmaps.length > 0 ? (
        <div className="space-y-6">
          {companyRoadmaps.map((roadmap) => {
            const student = companyStudents.find((s) => s.id === roadmap.studentId);
            const trainer = Object.values(mockUsers).find((u) => u.id === roadmap.trainerId);

            return (
              <div
                key={roadmap.id}
                className="bg-bg-secondary border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{roadmap.title}</h2>
                    <p className="text-text-secondary mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                        {roadmap.weeklyHours}h/week
                      </span>
                      <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                        ${roadmap.monthlyPrice}/month
                      </span>
                      <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                        {roadmap.phases.length} phases
                      </span>
                      <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium">
                        {roadmap.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-text-muted mb-1">Student</p>
                    <p className="font-medium">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">Trainer</p>
                    <p className="font-medium">{trainer?.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Learning Goals</p>
                  <ul className="space-y-1">
                    {roadmap.learningGoals.map((goal, idx) => (
                      <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                        <span>•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Phases Overview</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {roadmap.phases.map((phase, idx) => (
                      <div key={phase.id} className="bg-bg-tertiary border border-border rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium">{phase.title}</span>
                        </div>
                        <p className="text-xs text-text-muted">{phase.tasks.length} tasks</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border rounded-lg p-12 text-center">
          <FileTextIcon.default className="w-16 h-16 mx-auto mb-4 text-text-muted" />
          <h2 className="text-xl font-semibold mb-2">No Active Programs</h2>
          <p className="text-text-secondary">
            Programs and roadmaps for company students will appear here
          </p>
        </div>
      )}
    </div>
  );
}

