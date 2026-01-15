import { useAuthStore } from '../../store/authStore';
import { getStudentsByTrainerId, getRoadmapByStudentId, getSessionsByTrainerId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export default function TrainerStudents() {
  const { user } = useAuthStore();
  const students = user ? getStudentsByTrainerId(user.id) : [];

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">
          Assigned Students
        </h1>
        <p className="text-text-muted">Manage and track your students' progress</p>
      </div>

      {students.length > 0 ? (
        <div className="space-y-6">
          {students.map((student) => {
            const roadmap = getRoadmapByStudentId(student.id);
            const progress = mockStudentProgress.find((p) => p.studentId === student.id);
            const sessions = getSessionsByTrainerId(user?.id || '').filter((s) => s.studentId === student.id);
            const upcomingSessions = sessions.filter((s) => s.status === 'scheduled').length;

            return (
              <div
                key={student.id}
                className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-bg-tertiary border border-border rounded-full flex items-center justify-center">
                      <PersonIcon className="w-7 h-7 text-text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary">{student.name}</h2>
                      <p className="text-text-muted">{student.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/trainer/roadmap-builder"
                    className="text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-2 bg-bg-tertiary border border-border rounded-lg px-4 py-2 hover:border-accent/50"
                  >
                    Manage Roadmap
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>

                {roadmap && (
                  <div className="mb-6 bg-bg-tertiary border border-border rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-lg text-text-primary">{roadmap.title}</h3>
                    <p className="text-sm text-text-muted mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="bg-bg-secondary border border-border rounded-lg px-3 py-1 text-xs text-text-secondary"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-bg-tertiary border border-border rounded-lg p-5 hover:border-accent/50 transition-all">
                    <p className="text-sm text-text-muted mb-2 font-medium">Progress</p>
                    <p className="text-3xl font-bold mb-1 text-text-primary">{progress?.completionPercentage || 0}%</p>
                    <p className="text-xs text-text-muted">
                      {progress?.completedTasks || 0}/{progress?.totalTasks || 0} tasks
                    </p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded-lg p-5 hover:border-accent/50 transition-all">
                    <p className="text-sm text-text-muted mb-2 font-medium">Current Phase</p>
                    <p className="text-3xl font-bold mb-1 text-text-primary">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-muted">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded-lg p-5 hover:border-accent/50 transition-all">
                    <p className="text-sm text-text-muted mb-2 font-medium">Upcoming Sessions</p>
                    <p className="text-3xl font-bold mb-1 text-text-primary">{upcomingSessions}</p>
                    <p className="text-xs text-text-muted">Scheduled</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border rounded-xl p-12 text-center">
          <PersonIcon className="w-16 h-16 mx-auto mb-4 text-text-muted" />
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">No Students Assigned</h2>
          <p className="text-text-muted">
            Students will appear here once they are assigned to you
          </p>
        </div>
      )}
    </div>
  );
}

