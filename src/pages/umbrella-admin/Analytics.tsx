import { mockWings, mockUsers, mockRoadmaps, mockSessions, mockStudentProgress } from '../../data/mockData';

export default function UmbrellaAdminAnalytics() {
  const totalStudents = Object.values(mockUsers).filter((u) => u.role === 'student').length;
  const totalTrainers = Object.values(mockUsers).filter((u) => u.role === 'trainer').length;
  const avgProgress = Math.round(
    mockStudentProgress.reduce((acc, p) => acc + p.completionPercentage, 0) /
      mockStudentProgress.length || 0
  );
  const completionRate = Math.round(
    (mockRoadmaps.filter((r) => r.status === 'approved').length / mockRoadmaps.length) * 100 || 0
  );
  const sessionCompletionRate = Math.round(
    (mockSessions.filter((s) => s.status === 'completed').length / mockSessions.length) * 100 || 0
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Global Analytics</h1>
        <p className="text-text-secondary">Comprehensive system-wide analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Total Students</p>
          <p className="text-3xl font-bold">{totalStudents}</p>
          <p className="text-xs text-text-muted mt-1">Enrolled</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Total Trainers</p>
          <p className="text-3xl font-bold">{totalTrainers}</p>
          <p className="text-xs text-text-muted mt-1">Active</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Avg. Progress</p>
          <p className="text-3xl font-bold">{avgProgress}%</p>
          <p className="text-xs text-text-muted mt-1">Across all students</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Roadmap Approval</p>
          <p className="text-3xl font-bold">{completionRate}%</p>
          <p className="text-xs text-text-muted mt-1">Approval rate</p>
        </div>
      </div>

      {/* Wing Performance */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Wing Performance</h2>
        <div className="space-y-4">
          {mockWings.map((wing) => {
            const wingTrainers = Object.values(mockUsers).filter(
              (u) => u.role === 'trainer' && u.wingId === wing.id
            ).length;
            const wingStudents = Object.values(mockUsers).filter(
              (u) => u.role === 'student' && u.wingId === wing.id
            ).length;
            const capacityUtil = Math.round((wing.currentTrainers / wing.trainerCapacity) * 100);

            return (
              <div key={wing.id} className="bg-bg-tertiary border border-border rounded p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{wing.name}</h3>
                    <p className="text-sm text-text-secondary">{wing.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${wing.walletBalance.toLocaleString()}</p>
                    <p className="text-xs text-text-muted">Balance</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Trainers</p>
                    <p className="font-semibold">{wingTrainers} / {wing.trainerCapacity}</p>
                    <div className="bg-bg-primary border border-border rounded-full h-1 mt-1">
                      <div
                        className="bg-white h-1 rounded-full"
                        style={{ width: `${capacityUtil}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Students</p>
                    <p className="font-semibold">{wingStudents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Capacity</p>
                    <p className="font-semibold">{capacityUtil}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">System Health</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Roadmap Approval Rate</span>
              <span className="font-semibold">{completionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Completion</span>
              <span className="font-semibold">{sessionCompletionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Average Student Progress</span>
              <span className="font-semibold">{avgProgress}%</span>
            </div>
          </div>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Revenue</span>
              <span className="font-semibold">
                ${mockWings.reduce((sum, w) => sum + w.walletBalance, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Roadmaps</span>
              <span className="font-semibold">
                {mockRoadmaps.filter((r) => r.status === 'approved').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Monthly Recurring</span>
              <span className="font-semibold">
                ${mockRoadmaps
                  .filter((r) => r.status === 'approved')
                  .reduce((sum, r) => sum + r.monthlyPrice, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

