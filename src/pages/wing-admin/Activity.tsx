import { mockUsers, mockStudentProgress, mockRoadmaps, mockSessions } from '../../data/mockData';
import * as PersonIcon from '@radix-ui/react-icons/dist/PersonIcon';
import * as CheckIcon from '@radix-ui/react-icons/dist/CheckIcon';

export default function WingAdminActivity() {
  const students = Object.values(mockUsers).filter((u) => u.role === 'student');
  const wingStudents = students.filter((s) => s.wingId === 'wing1');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Student Activity</h1>
        <p className="text-text-secondary">Monitor student progress and engagement</p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Total Students</p>
          <p className="text-3xl font-bold">{wingStudents.length}</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Active Roadmaps</p>
          <p className="text-3xl font-bold">
            {mockRoadmaps.filter((r) => r.status === 'approved').length}
          </p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Sessions This Week</p>
          <p className="text-3xl font-bold">
            {mockSessions.filter((s) => s.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Avg. Progress</p>
          <p className="text-3xl font-bold">
            {Math.round(
              mockStudentProgress.reduce((acc, p) => acc + p.completionPercentage, 0) /
                mockStudentProgress.length || 0
            )}%
          </p>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Student Activity Overview</h2>
        {wingStudents.length > 0 ? (
          <div className="space-y-4">
            {wingStudents.map((student) => {
              const progress = mockStudentProgress.find((p) => p.studentId === student.id);
              const roadmap = mockRoadmaps.find((r) => r.studentId === student.id);
              const sessions = mockSessions.filter((s) => s.studentId === student.id);

              return (
                <div
                  key={student.id}
                  className="bg-bg-tertiary border border-border rounded p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-bg-primary border border-border rounded-full flex items-center justify-center">
                        <PersonIcon.default className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-text-secondary">{student.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{progress?.completionPercentage || 0}%</p>
                      <p className="text-xs text-text-muted">Progress</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-text-muted mb-1">Roadmap</p>
                      <p className="text-sm font-medium">
                        {roadmap?.title || 'No roadmap assigned'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Current Phase</p>
                      <p className="text-sm font-medium">
                        Phase {progress?.currentPhase || 1}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Sessions</p>
                      <p className="text-sm font-medium">
                        {sessions.filter((s) => s.status === 'scheduled').length} upcoming
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckIcon.default className="w-4 h-4 text-white" />
                      <span className="text-text-secondary">
                        {progress?.completedTasks || 0} of {progress?.totalTasks || 0} tasks completed
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No students found</p>
        )}
      </div>
    </div>
  );
}

