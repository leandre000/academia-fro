import { useAuthStore } from '../../store/authStore';
import { mockRoadmaps, mockUsers } from '../../data/mockData';
import { FileTextIcon } from '@radix-ui/react-icons';

export default function CompanyPrograms() {
  const { user } = useAuthStore();
  const companyStudents = Object.values(mockUsers).filter(
    (u) => u.role === 'student' && u.companyId === user?.companyId
  );
  const companyRoadmaps = mockRoadmaps.filter((r) =>
    companyStudents.some((s) => s.id === r.studentId)
  );

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
          Active Programs
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">View learning programs and roadmaps for company students</p>
      </div>

      {companyRoadmaps.length > 0 ? (
        <div className="space-y-6">
          {companyRoadmaps.map((roadmap, idx) => {
            const student = companyStudents.find((s) => s.id === roadmap.studentId);
            const trainer = Object.values(mockUsers).find((u) => u.id === roadmap.trainerId);

            return (
              <div
                key={roadmap.id}
                className="card p-4 sm:p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-text-primary">{roadmap.title}</h2>
                    <p className="text-text-secondary mb-4">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="badge-brand">
                        {roadmap.weeklyHours}h/week
                      </span>
                      <span className="badge-brand">
                        ${roadmap.monthlyPrice}/month
                      </span>
                      <span className="badge-brand">
                        {roadmap.phases.length} phases
                      </span>
                      <span className="badge-success">
                        {roadmap.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-1">Student</p>
                    <p className="font-semibold text-text-primary">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-1">Trainer</p>
                    <p className="font-semibold text-text-primary">{trainer?.name}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3 text-text-primary">Learning Goals</p>
                  <ul className="space-y-2">
                    {roadmap.learningGoals.map((goal, idx) => (
                      <li key={idx} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-brand-600 mt-1">•</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-semibold mb-4 text-text-primary">Phases Overview</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {roadmap.phases.map((phase, idx) => (
                      <div key={phase.id} className="bg-surface-tertiary border border-border rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-brand-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-medium text-text-primary">{phase.title}</span>
                        </div>
                        <p className="text-xs text-text-tertiary">{phase.tasks.length} tasks</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12 sm:py-16">
          <FileTextIcon className="w-20 h-20 mx-auto mb-6 text-text-tertiary" />
          <h2 className="text-2xl font-semibold mb-3 text-text-primary">No Active Programs</h2>
          <p className="text-text-secondary">
            Programs and roadmaps for company students will appear here
          </p>
        </div>
      )}
    </div>
  );
}
