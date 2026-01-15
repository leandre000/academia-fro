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
              <label className="input-label">Email</label>
              <div className="relative">
                <PersonIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="input-field"
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
              <div className="bg-error-light border-2 border-error rounded-xl p-4 text-error text-sm animate-slide-up flex items-center gap-2">
                <span className="font-semibold">⚠</span>
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 text-center">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleDisplayNames).map(([role, name]) => (
                <button
                  key={role}
                  onClick={() => quickLogin(role as UserRole)}
                  type="button"
                  className="text-xs bg-gradient-soft border border-border rounded-xl px-4 py-3 hover:border-accent hover:bg-white transition-all text-left text-text-primary font-medium hover:shadow-md"
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

