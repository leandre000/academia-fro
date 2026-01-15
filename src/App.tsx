import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import PortalLayout from './components/PortalLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Student Portal
import StudentDashboard from './pages/student/Dashboard';
import StudentRoadmap from './pages/student/Roadmap';
import StudentSchedule from './pages/student/Schedule';
import StudentAttendance from './pages/student/Attendance';

// Trainer Portal
import TrainerDashboard from './pages/trainer/Dashboard';
import TrainerAvailability from './pages/trainer/Availability';
import TrainerStudents from './pages/trainer/Students';
import TrainerRoadmapBuilder from './pages/trainer/RoadmapBuilder';
import TrainerWallet from './pages/trainer/Wallet';

// Master Mentor Portal
import MasterMentorDashboard from './pages/master-mentor/Dashboard';
import MasterMentorReviews from './pages/master-mentor/Reviews';
import MasterMentorProgression from './pages/master-mentor/Progression';
import MasterMentorLogs from './pages/master-mentor/Logs';

// Wing Admin Portal
import WingAdminDashboard from './pages/wing-admin/Dashboard';
import WingAdminCapacity from './pages/wing-admin/Capacity';
import WingAdminActivity from './pages/wing-admin/Activity';
import WingAdminWallet from './pages/wing-admin/Wallet';

// Umbrella Admin Portal
import UmbrellaAdminDashboard from './pages/umbrella-admin/Dashboard';
import UmbrellaAdminAnalytics from './pages/umbrella-admin/Analytics';
import UmbrellaAdminWings from './pages/umbrella-admin/Wings';
import UmbrellaAdminRules from './pages/umbrella-admin/Rules';
import UmbrellaAdminPayments from './pages/umbrella-admin/Payments';

// Company Portal
import CompanyDashboard from './pages/company/Dashboard';
import CompanyStudents from './pages/company/Students';
import CompanyPrograms from './pages/company/Programs';

// Settings (shared)
import Settings from './pages/Settings';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  const getDefaultRoute = () => {
    if (!isAuthenticated || !user) return '/login';
    const roleRoutes: Record<string, string> = {
      student: '/student',
      trainer: '/trainer',
      master_mentor: '/master-mentor',
      wing_admin: '/wing-admin',
      umbrella_admin: '/umbrella-admin',
      company: '/company',
    };
    return roleRoutes[user.role] || '/login';
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to={getDefaultRoute()} replace />} />
        
        {/* Settings - Available to all authenticated users */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={['student', 'trainer', 'master_mentor', 'wing_admin', 'umbrella_admin', 'company']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Settings />} />
        </Route>

        {/* Student Portal */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="roadmap" element={<StudentRoadmap />} />
          <Route path="schedule" element={<StudentSchedule />} />
          <Route path="attendance" element={<StudentAttendance />} />
        </Route>

        {/* Trainer Portal */}
        <Route
          path="/trainer"
          element={
            <ProtectedRoute allowedRoles={['trainer']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TrainerDashboard />} />
          <Route path="availability" element={<TrainerAvailability />} />
          <Route path="students" element={<TrainerStudents />} />
          <Route path="roadmap-builder" element={<TrainerRoadmapBuilder />} />
          <Route path="wallet" element={<TrainerWallet />} />
        </Route>

        {/* Master Mentor Portal */}
        <Route
          path="/master-mentor"
          element={
            <ProtectedRoute allowedRoles={['master_mentor']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MasterMentorDashboard />} />
          <Route path="reviews" element={<MasterMentorReviews />} />
          <Route path="progression" element={<MasterMentorProgression />} />
          <Route path="logs" element={<MasterMentorLogs />} />
        </Route>

        {/* Wing Admin Portal */}
        <Route
          path="/wing-admin"
          element={
            <ProtectedRoute allowedRoles={['wing_admin']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<WingAdminDashboard />} />
          <Route path="capacity" element={<WingAdminCapacity />} />
          <Route path="activity" element={<WingAdminActivity />} />
          <Route path="wallet" element={<WingAdminWallet />} />
        </Route>

        {/* Umbrella Admin Portal */}
        <Route
          path="/umbrella-admin"
          element={
            <ProtectedRoute allowedRoles={['umbrella_admin']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UmbrellaAdminDashboard />} />
          <Route path="analytics" element={<UmbrellaAdminAnalytics />} />
          <Route path="wings" element={<UmbrellaAdminWings />} />
          <Route path="rules" element={<UmbrellaAdminRules />} />
          <Route path="payments" element={<UmbrellaAdminPayments />} />
        </Route>

        {/* Company Portal */}
        <Route
          path="/company"
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <PortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboard />} />
          <Route path="students" element={<CompanyStudents />} />
          <Route path="programs" element={<CompanyPrograms />} />
        </Route>

        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
