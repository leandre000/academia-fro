import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { ExitIcon } from '@radix-ui/react-icons';

export default function Settings() {
  const { user, logout } = useAuthStore();
  const { updateProfile, updateAvatar } = useProfileStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: '',
  });
  const [avatarUrl] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      updateProfile({
        name: formData.name,
        email: formData.email,
      });
      
      if (avatarUrl) {
        updateAvatar(avatarUrl);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in max-w-4xl">
      <div className="mb-8 slide-up">
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Settings</h1>
        <p className="text-text-secondary">Manage your account settings and preferences</p>
      </div>

      {/* Basic Information */}
      <div className="card mb-8 slide-up">
        <h2 className="text-xl font-semibold mb-6 text-text-primary">Basic Information</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-text-secondary">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl shadow-soft">
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">Profile Photo</p>
              <p className="text-xs text-text-tertiary">This will be shown as your profile.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Names</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Old Password</label>
            <input
              type="password"
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              className="input"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="label">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className="input"
              placeholder="Enter new password"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Logout */}
      <div className="card slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1 text-text-primary">Logout</h3>
            <p className="text-sm text-text-secondary">Sign out of your account</p>
          </div>
          <button
            onClick={logout}
            className="btn btn-destructive flex items-center gap-2"
          >
            <ExitIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

