import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useAuthStore } from './authStore';
import type { User } from '../types';

interface ProfileState {
  updateProfile: (updates: Partial<User>) => void;
  updateAvatar: (avatarUrl: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      updateProfile: (updates) => {
        const { user, login } = useAuthStore.getState();
        if (user) {
          const updatedUser = { ...user, ...updates };
          login(updatedUser);
        }
      },
      
      updateAvatar: (avatarUrl) => {
        const { user, login } = useAuthStore.getState();
        if (user) {
          const updatedUser = { ...user, avatar: avatarUrl };
          login(updatedUser);
        }
      },
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

