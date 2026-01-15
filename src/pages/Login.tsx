import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { mockUsers } from '../data/mockData';
import type { UserRole } from '../types';
import { PersonIcon } from '@radix-ui/react-icons';

const roleDisplayNames: Record<UserRole, string> = {
  student: 'Student Portal',
  trainer: 'Trainer Portal',
  master_mentor: 'Master Mentor Portal',
  wing_admin: 'Wing Administrator Portal',
  umbrella_admin: 'Umbrella Administrator Portal',
  company: 'Company Portal',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !selectedRole) {
      setError('Please select a role and enter an email');
      return;
    }

    // Find user by email and role
    const user = Object.values(mockUsers).find(
      (u) => u.email === email && u.role === selectedRole
    );

    if (!user) {
      setError('Invalid credentials for selected role');
      return;
    }

    login(user);

    // Navigate based on role
    const roleRoutes: Record<UserRole, string> = {
      student: '/student',
      trainer: '/trainer',
      master_mentor: '/master-mentor',
      wing_admin: '/wing-admin',
      umbrella_admin: '/umbrella-admin',
      company: '/company',
    };

    navigate(roleRoutes[selectedRole]);
  };

  const quickLogin = (role: UserRole) => {
    const user = Object.values(mockUsers).find((u) => u.role === role);
    if (user) {
      setEmail(user.email);
      setSelectedRole(role);
      login(user);
      const roleRoutes: Record<UserRole, string> = {
        student: '/student',
        trainer: '/trainer',
        master_mentor: '/master-mentor',
        wing_admin: '/wing-admin',
        umbrella_admin: '/umbrella-admin',
        company: '/company',
      };
      navigate(roleRoutes[role]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4 relative overflow-hidden">
      {/* Beautiful Gradient Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-gradient-purple to-gradient-pink opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-accent-light opacity-15 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute -top-20 right-20 w-72 h-72 bg-gradient-accent opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Beautiful Glass Card */}
        <div className="glass-effect rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">Welcome back!</h2>
            <p className="text-text-muted">Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="">Select role</option>
                {Object.entries(roleDisplayNames).map(([role, name]) => (
                  <option key={role} value={role}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm animate-slide-up">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary text-lg py-4"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 text-center">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleDisplayNames).map(([role, name]) => (
                <button
                  key={role}
                  onClick={() => quickLogin(role as UserRole)}
                  type="button"
                  className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-100 hover:border-gray-300 transition-all text-left text-gray-700"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <span className="text-accent hover:underline cursor-pointer">Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
}

