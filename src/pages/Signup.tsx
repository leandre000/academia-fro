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

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Create new user (in real app, this would call an API)
    const newUser = {
      id: `user_${Date.now()}`,
      email: formData.email,
      name: formData.name,
      role: formData.role as UserRole,
    };

    login(newUser);

    // Navigate based on role
    const roleRoutes: Record<UserRole, string> = {
      student: '/student',
      trainer: '/trainer',
      master_mentor: '/master-mentor',
      wing_admin: '/wing-admin',
      umbrella_admin: '/umbrella-admin',
      company: '/company',
    };

    navigate(roleRoutes[formData.role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4 relative overflow-hidden">
      {/* Beautiful Gradient Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-gradient-purple to-gradient-pink opacity-20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-accent-light opacity-15 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="glass-effect rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-2xl font-bold">A</span>
            </div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">Create Account</h2>
            <p className="text-text-muted">Sign up to get started</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="input-label">Full Name</label>
              <div className="relative">
                <PersonIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className="input-field"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm your password"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                className="input-field"
                required
              >
                <option value="">Select your role</option>
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
              showArrow
            >
              Sign Up
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:text-accent-hover font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

