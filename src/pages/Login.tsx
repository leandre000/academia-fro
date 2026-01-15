import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { mockUsers } from '../data/mockData';
import type { UserRole } from '../types';
import { PersonIcon } from '@radix-ui/react-icons';
import Button from '../components/Button';

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

    const user = Object.values(mockUsers).find(
      (u) => u.email === email && u.role === selectedRole
    );

    if (!user) {
      setError('Invalid credentials for selected role');
      return;
    }

    login(user);

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
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
              <span className="text-white text-2xl font-semibold">A</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-text-primary">Welcome back</h2>
            <p className="text-text-secondary">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="input"
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
              <label className="label">Email</label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error-light border border-error rounded-xl text-error text-sm animate-fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-text-secondary mb-4 text-center">Quick Login (Demo):</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(roleDisplayNames).map(([role, name]) => (
                <button
                  key={role}
                  onClick={() => quickLogin(role as UserRole)}
                  type="button"
                  className="btn-tertiary text-left text-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 hover:text-brand-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
