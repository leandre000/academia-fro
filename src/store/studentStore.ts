import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, StudentProgress } from '../types';
import { mockUsers, mockStudentProgress } from '../data/mockData';

interface StudentState {
  students: User[];
  studentProgress: StudentProgress[];
  initializeStudents: () => void;
  createStudent: (student: Omit<User, 'id'>) => User;
  updateStudent: (id: string, updates: Partial<User>) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => User | undefined;
  getStudentsByCompanyId: (companyId: string) => User[];
  updateStudentProgress: (studentId: string, progress: Partial<StudentProgress>) => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      students: [],
      studentProgress: [],
      
      initializeStudents: () => {
        const stored = get().students;
        if (stored.length === 0) {
          const students = Object.values(mockUsers).filter(u => u.role === 'student');
          set({ 
            students,
            studentProgress: mockStudentProgress,
          });
        }
      },
      
      createStudent: (studentData) => {
        const newStudent: User = {
          ...studentData,
          id: `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        set((state) => ({
          students: [...state.students, newStudent],
        }));
        return newStudent;
      },
      
      updateStudent: (id, updates) => {
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));
      },
      
      deleteStudent: (id) => {
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
          studentProgress: state.studentProgress.filter((p) => p.studentId !== id),
        }));
      },
      
      getStudentById: (id) => {
        return get().students.find((s) => s.id === id);
      },
      
      getStudentsByCompanyId: (companyId) => {
        return get().students.filter((s) => s.companyId === companyId);
      },
      
      updateStudentProgress: (studentId, progress) => {
        set((state) => {
          const existing = state.studentProgress.find((p) => p.studentId === studentId);
          if (existing) {
            return {
              studentProgress: state.studentProgress.map((p) =>
                p.studentId === studentId ? { ...p, ...progress } : p
              ),
            };
          } else {
            return {
              studentProgress: [...state.studentProgress, { studentId, ...progress } as StudentProgress],
            };
          }
        });
      },
    }),
    {
      name: 'student-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

