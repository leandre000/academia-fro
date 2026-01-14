import { useAuthStore } from '../../store/authStore';
import { getStudentsByTrainerId, getRoadmapByStudentId, getSessionsByTrainerId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export default function TrainerStudents() {
  const { user } = useAuthStore();
  const students = user ? getStudentsByTrainerId(user.id) : [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assigned Students</h1>
        <p className="text-text-secondary">Manage and track your students' progress</p>
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
                className="bg-bg-secondary border border-border rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg-tertiary border border-border rounded-full flex items-center justify-center">
                      <PersonIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{student.name}</h2>
                      <p className="text-text-secondary">{student.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/trainer/roadmap-builder"
                    className="text-sm text-white hover:underline flex items-center gap-1"
                  >
                    Manage Roadmap
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
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
                    <p className="text-sm text-text-muted mb-1">Progress</p>
                    <p className="text-2xl font-bold">{progress?.completionPercentage || 0}%</p>
                    <p className="text-xs text-text-muted mt-1">
                      {progress?.completedTasks || 0}/{progress?.totalTasks || 0} tasks
                    </p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded p-4">
                    <p className="text-sm text-text-muted mb-1">Current Phase</p>
                    <p className="text-2xl font-bold">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-bg-tertiary border border-border rounded p-4">
                    <p className="text-sm text-text-muted mb-1">Upcoming Sessions</p>
                    <p className="text-2xl font-bold">{upcomingSessions}</p>
                    <p className="text-xs text-text-muted mt-1">Scheduled</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-bg-secondary border border-border rounded-lg p-12 text-center">
          <PersonIcon className="w-16 h-16 mx-auto mb-4 text-text-muted" />
          <h2 className="text-xl font-semibold mb-2">No Students Assigned</h2>
          <p className="text-text-secondary">
            Students will appear here once they are assigned to you
          </p>
        </div>
      )}
    </div>
  );
}

