import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import Button from '../components/Button';

export default function Settings() {
  const { user } = useAuthStore();
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
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">Settings</h1>
        <p className="text-sm sm:text-base text-text-secondary">Manage your account settings and preferences</p>
      </div>

      {/* Basic Information */}
      <div className="card p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-text-primary">Basic Information</h2>
        
        {/* Profile Photo Section */}
        <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
          <label className="block text-sm font-semibold mb-3 sm:mb-4 text-text-primary">Profile Photo</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-600 rounded-full flex items-center justify-center text-white font-semibold text-xl sm:text-2xl shadow-soft flex-shrink-0">
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-secondary mb-1">Profile Photo</p>
              <p className="text-xs sm:text-sm text-text-tertiary">This will be shown as your profile picture across the platform.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input"
              required
              placeholder="Enter your email address"
            />
          </div>

          {/* Password Section */}
          <div className="pt-4 sm:pt-6 border-t border-border">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5 text-text-primary">Change Password</h3>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="label">Current Password</label>
                <input
                  type="password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  className="input"
                  placeholder="Enter your current password"
                />
                <p className="helper-text">Leave blank if you don't want to change your password</p>
              </div>

              <div>
                <label className="label">New Password</label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="input"
                  placeholder="Enter your new password"
                  minLength={6}
                />
                <p className="helper-text">Password must be at least 6 characters long</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSaving}
              loading={isSaving}
              className="w-full sm:w-auto"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      {/* Account Information Section */}
      <div className="card p-4 sm:p-6 lg:p-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-text-primary">Account Information</h2>
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-border last:border-b-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary mb-1">User Role</p>
              <p className="text-xs sm:text-sm text-text-secondary capitalize">{user?.role.replace('_', ' ') || 'N/A'}</p>
            </div>
            <span className="badge-brand capitalize text-xs sm:text-sm">
              {user?.role.replace('_', ' ') || 'N/A'}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 sm:py-4 border-b border-border last:border-b-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary mb-1">Account ID</p>
              <p className="text-xs sm:text-sm text-text-secondary font-mono">{user?.id || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
