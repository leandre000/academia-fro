import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getUserByEmail, mockUsers } from '../data/mockData';
import type { UserRole } from '../types';
import { PersonIcon, LockClosedIcon } from '@radix-ui/react-icons';

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
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Academia FRO</h1>
          <p className="text-text-secondary">Enterprise Learning Management System</p>
        </div>

        <div className="bg-bg-secondary border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                required
              >
                <option value="">Select a role</option>
                {Object.entries(roleDisplayNames).map(([role, name]) => (
                  <option key={role} value={role}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-text-muted mb-3">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleDisplayNames).map(([role, name]) => (
                <button
                  key={role}
                  onClick={() => quickLogin(role as UserRole)}
                  className="text-xs bg-bg-tertiary border border-border rounded px-3 py-2 hover:bg-bg-primary transition-colors text-left"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-text-muted">
          <p>Mock authentication - Select any role to explore</p>
        </div>
      </div>
    </div>
  );
}

