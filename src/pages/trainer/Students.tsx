import { useAuthStore } from '../../store/authStore';
import { getStudentsByTrainerId, getRoadmapByStudentId, getSessionsByTrainerId, mockStudentProgress } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons';

export default function TrainerStudents() {
  const { user } = useAuthStore();
  const students = user ? getStudentsByTrainerId(user.id) : [];

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Assigned Students
        </h1>
        <p className="text-gray-400 text-lg">Manage and track your students' progress</p>
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
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-lg hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <PersonIcon className="w-7 h-7 text-gray-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">{student.name}</h2>
                      <p className="text-gray-400">{student.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/trainer/roadmap-builder"
                    className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-700"
                  >
                    Manage Roadmap
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>

                {roadmap && (
                  <div className="mb-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-lg">{roadmap.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{roadmap.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {roadmap.learningGoals.slice(0, 3).map((goal, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-xs text-gray-300"
                        >
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all">
                    <p className="text-sm text-gray-400 mb-2 font-medium">Progress</p>
                    <p className="text-3xl font-bold mb-1">{progress?.completionPercentage || 0}%</p>
                    <p className="text-xs text-gray-500">
                      {progress?.completedTasks || 0}/{progress?.totalTasks || 0} tasks
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all">
                    <p className="text-sm text-gray-400 mb-2 font-medium">Current Phase</p>
                    <p className="text-3xl font-bold mb-1">Phase {progress?.currentPhase || 1}</p>
                    <p className="text-xs text-gray-500">
                      {roadmap?.phases.find((p) => p.order === progress?.currentPhase)?.title || 'Foundation'}
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:border-gray-600 transition-all">
                    <p className="text-sm text-gray-400 mb-2 font-medium">Upcoming Sessions</p>
                    <p className="text-3xl font-bold mb-1">{upcomingSessions}</p>
                    <p className="text-xs text-gray-500">Scheduled</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-12 text-center shadow-lg">
          <PersonIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-semibold mb-2">No Students Assigned</h2>
          <p className="text-gray-400">
            Students will appear here once they are assigned to you
          </p>
        </div>
      )}
    </div>
  );
}

