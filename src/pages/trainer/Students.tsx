import { useAuthStore } from '../../store/authStore';
import { getStudentsByTrainerId, getRoadmapByStudentId, getSessionsByTrainerId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function TrainerStudents() {
  const { user } = useAuthStore();
  const students = user ? getStudentsByTrainerId(user.id) : [];

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">
          Assigned Students
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">Manage and track your students' progress</p>
      </div>

      {students.length > 0 ? (
        <div className="space-y-6">
          {students.map((student, idx) => {
            const roadmap = getRoadmapByStudentId(student.id);
            const progress = mockStudentProgress.find((p) => p.studentId === student.id);
            const sessions = getSessionsByTrainerId(user?.id || '').filter((s) => s.studentId === student.id);
            const upcomingSessions = sessions.filter((s) => s.status === 'scheduled').length;

            return (
              <div
                key={student.id}
                className="card p-4 sm:p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center shadow-soft">
                      <span className="text-white font-semibold text-xl">{student.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">{student.name}</h2>
                      <p className="text-text-secondary">{student.email}</p>
                    </div>
                  </div>
                  <Link to="/trainer/roadmap-builder">
                    <Button variant="secondary" size="sm" showArrow>
                      Manage Roadmap
                    </Button>
                  </Link>
                </div>

                {roadmap && (
                  <div className="mb-6 bg-surface-tertiary border border-border rounded-xl p-5">
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-secondary mb-4">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="badge-brand"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all">
                    <p className="text-sm font-medium text-text-secondary mb-2">Progress</p>
                    <p className="text-4xl font-semibold mb-1 text-brand-600">{progress?.completionPercentage || 0}%</p>
                    <p className="text-xs text-text-tertiary">
                      {progress?.completedTasks || 0}/{progress?.totalTasks || 0} tasks
                    </p>
                  </div>
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all">
                    <p className="text-sm font-medium text-text-secondary mb-2">Current Phase</p>
                    <p className="text-4xl font-semibold mb-1 text-text-primary">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-tertiary">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-surface-tertiary border border-border rounded-xl p-5 hover:border-brand-300 transition-all">
                    <p className="text-sm font-medium text-text-secondary mb-2">Upcoming Sessions</p>
                    <p className="text-4xl font-semibold mb-1 text-text-primary">{upcomingSessions}</p>
                    <p className="text-xs text-text-tertiary">Scheduled</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12 sm:py-16">
          <PersonIcon className="w-20 h-20 mx-auto mb-6 text-text-tertiary" />
          <h2 className="text-2xl font-semibold mb-3 text-text-primary">No Students Assigned</h2>
          <p className="text-text-secondary">
            Students will appear here once they are assigned to you
          </p>
        </div>
      )}
    </div>
  );
}
