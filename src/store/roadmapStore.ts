import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Roadmap } from '../types';
import { mockRoadmaps } from '../data/mockData';

interface RoadmapState {
  roadmaps: Roadmap[];
  initializeRoadmaps: () => void;
  createRoadmap: (roadmap: Omit<Roadmap, 'id' | 'createdAt' | 'updatedAt'>) => Roadmap;
  updateRoadmap: (id: string, updates: Partial<Roadmap>) => void;
  deleteRoadmap: (id: string) => void;
  getRoadmapById: (id: string) => Roadmap | undefined;
  getRoadmapsByTrainerId: (trainerId: string) => Roadmap[];
  getRoadmapByStudentId: (studentId: string) => Roadmap | undefined;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      roadmaps: [],
      
      initializeRoadmaps: () => {
        const stored = get().roadmaps;
        if (stored.length === 0) {
          set({ roadmaps: mockRoadmaps });
        }
      },
      
      createRoadmap: (roadmapData) => {
        const newRoadmap: Roadmap = {
          ...roadmapData,
          id: `roadmap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          roadmaps: [...state.roadmaps, newRoadmap],
        }));
        return newRoadmap;
      },
      
      updateRoadmap: (id, updates) => {
        set((state) => ({
          roadmaps: state.roadmaps.map((r) =>
            r.id === id
              ? { ...r, ...updates, updatedAt: new Date().toISOString() }
              : r
          ),
        }));
      },
      
      deleteRoadmap: (id) => {
        set((state) => ({
          roadmaps: state.roadmaps.filter((r) => r.id !== id),
        }));
      },
      
      getRoadmapById: (id) => {
        return get().roadmaps.find((r) => r.id === id);
      },
      
      getRoadmapsByTrainerId: (trainerId) => {
        return get().roadmaps.filter((r) => r.trainerId === trainerId);
      },
      
      getRoadmapByStudentId: (studentId) => {
        return get().roadmaps.find((r) => r.studentId === studentId);
      },
    }),
    {
      name: 'roadmap-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

