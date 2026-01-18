import type {
  User,
  Wing,
  Company,
  Roadmap,
  Session,
  TrainerAvailability,
  Wallet,
  StudentProgress,
} from '../types';

// Mock Users
export const mockUsers: Record<string, User> = {
  student1: {
    id: 'student1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    wingId: 'wing1',
    avatar: undefined,
  },
  trainer1: {
    id: 'trainer1',
    email: 'trainer@example.com',
    name: 'Sarah Trainer',
    role: 'trainer',
    wingId: 'wing1',
    avatar: undefined,
  },
  mentor1: {
    id: 'mentor1',
    email: 'mentor@example.com',
    name: 'Dr. Master Mentor',
    role: 'master_mentor',
    avatar: undefined,
  },
  wingAdmin1: {
    id: 'wingAdmin1',
    email: 'wingadmin@example.com',
    name: 'Wing Administrator',
    role: 'wing_admin',
    wingId: 'wing1',
    avatar: undefined,
  },
  umbrellaAdmin1: {
    id: 'umbrellaAdmin1',
    email: 'admin@example.com',
    name: 'System Administrator',
    role: 'umbrella_admin',
    avatar: undefined,
  },
  company1: {
    id: 'company1',
    email: 'company@example.com',
    name: 'Tech Corp',
    role: 'company',
    companyId: 'comp1',
    avatar: undefined,
  },
};

// Mock Wings
export const mockWings: Wing[] = [
  {
    id: 'wing1',
    name: 'Frontend Development Wing',
    description: 'Specialized in React, TypeScript, and modern frontend technologies',
    trainerCapacity: 10,
    currentTrainers: 5,
    walletBalance: 50000,
  },
  {
    id: 'wing2',
    name: 'Backend Development Wing',
    description: 'Specialized in Node.js, Python, and cloud architectures',
    trainerCapacity: 8,
    currentTrainers: 4,
    walletBalance: 45000,
  },
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 'comp1',
    name: 'Tech Corp',
    email: 'contact@techcorp.com',
    contactPerson: 'Jane Doe',
    status: 'active',
  },
  {
    id: 'comp2',
    name: 'Innovate Inc',
    email: 'info@innovate.com',
    contactPerson: 'Bob Smith',
    status: 'active',
  },
];

// Mock Roadmaps
export const mockRoadmaps: Roadmap[] = [
  {
    id: 'roadmap1',
    trainerId: 'trainer1',
    studentId: 'student1',
    title: 'Full-Stack React Developer Path',
    description: 'Complete roadmap to become a professional React developer',
    learningGoals: [
      'Master React fundamentals',
      'Learn TypeScript',
      'Build production-ready applications',
      'Understand state management',
    ],
    weeklyHours: 20,
    monthlyPrice: 500,
    status: 'approved',
    phases: [
      {
        id: 'phase1',
        title: 'Foundation',
        description: 'Learn the basics of React and JavaScript',
        order: 1,
        reviewCheckpoint: true,
        isLocked: false,
        isApproved: true,
        tasks: [
          {
            id: 'task1',
            title: 'Setup development environment',
            description: 'Install Node.js, VS Code, and necessary tools',
            order: 1,
            status: 'completed',
            completedAt: '2024-01-15T10:00:00Z',
            estimatedHours: 2,
          },
          {
            id: 'task2',
            title: 'Learn JavaScript ES6+',
            description: 'Study arrow functions, destructuring, async/await',
            order: 2,
            status: 'completed',
            completedAt: '2024-01-16T14:00:00Z',
            estimatedHours: 10,
          },
          {
            id: 'task3',
            title: 'React Basics',
            description: 'Components, props, state, and hooks',
            order: 3,
            status: 'pending',
            estimatedHours: 15,
          },
        ],
      },
      {
        id: 'phase2',
        title: 'Advanced React',
        description: 'Deep dive into React patterns and best practices',
        order: 2,
        reviewCheckpoint: true,
        isLocked: true,
        isApproved: false,
        tasks: [
          {
            id: 'task4',
            title: 'State Management',
            description: 'Learn Context API and Zustand',
            order: 1,
            status: 'blocked',
            estimatedHours: 12,
          },
          {
            id: 'task5',
            title: 'Performance Optimization',
            description: 'Memoization, code splitting, lazy loading',
            order: 2,
            status: 'blocked',
            estimatedHours: 10,
          },
        ],
      },
    ],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

// Mock Sessions
export const mockSessions: Session[] = [
  {
    id: 'session1',
    roadmapId: 'roadmap1',
    trainerId: 'trainer1',
    studentId: 'student1',
    title: 'React Fundamentals Review',
    scheduledAt: '2024-01-25T14:00:00Z',
    duration: 60,
    status: 'completed',
    attendanceConfirmed: true,
    trainerConfirmed: true,
    studentConfirmed: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Covered components and props',
  },
  {
    id: 'session2',
    roadmapId: 'roadmap1',
    trainerId: 'trainer1',
    studentId: 'student1',
    title: 'State Management Deep Dive',
    scheduledAt: '2024-01-27T14:00:00Z',
    duration: 90,
    status: 'completed',
    attendanceConfirmed: false,
    trainerConfirmed: true,
    studentConfirmed: false,
    meetingLink: 'https://meet.google.com/xyz-uvwx-stu',
    notes: 'Student did not confirm attendance',
  },
  {
    id: 'session3',
    roadmapId: 'roadmap1',
    trainerId: 'trainer1',
    studentId: 'student1',
    title: 'TypeScript Basics',
    scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    duration: 60,
    status: 'scheduled',
    attendanceConfirmed: false,
    trainerConfirmed: false,
    studentConfirmed: false,
    meetingLink: 'https://meet.google.com/new-meet-link',
  },
];

// Mock Trainer Availability
export const mockTrainerAvailability: TrainerAvailability = {
  trainerId: 'trainer1',
  weeklyCapacity: 20,
  availableDays: ['Monday', 'Wednesday', 'Friday'],
  timeSlots: [
    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', startTime: '09:00', endTime: '17:00' },
  ],
};

// Mock Wallets
export const mockWallets: Record<string, Wallet> = {
  trainer1: {
    userId: 'trainer1',
    balance: 2500,
    transactions: [
      {
        id: 'tx1',
        type: 'credit',
        amount: 500,
        description: 'Monthly payment - January',
        createdAt: '2024-01-01T00:00:00Z',
        status: 'completed',
      },
      {
        id: 'tx2',
        type: 'credit',
        amount: 500,
        description: 'Monthly payment - February',
        createdAt: '2024-02-01T00:00:00Z',
        status: 'completed',
      },
    ],
  },
  wing1: {
    userId: 'wing1',
    balance: 50000,
    transactions: [],
  },
};

// Mock Student Progress
export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: 'student1',
    roadmapId: 'roadmap1',
    currentPhase: 1,
    completedTasks: 2,
    totalTasks: 5,
    completionPercentage: 40,
    lastActivity: '2024-01-20T10:00:00Z',
  },
];

// Helper function to get user by email (for login)
export const getUserByEmail = (email: string): User | undefined => {
  return Object.values(mockUsers).find((user) => user.email === email);
};

// Helper function to get roadmap by student ID
export const getRoadmapByStudentId = (studentId: string): Roadmap | undefined => {
  return mockRoadmaps.find((r) => r.studentId === studentId);
};

// Helper function to get roadmap by trainer ID
export const getRoadmapsByTrainerId = (trainerId: string): Roadmap[] => {
  return mockRoadmaps.filter((r) => r.trainerId === trainerId);
};

// Helper function to get sessions by student ID
export const getSessionsByStudentId = (studentId: string): Session[] => {
  return mockSessions.filter((s) => s.studentId === studentId);
};

// Helper function to get sessions by trainer ID
export const getSessionsByTrainerId = (trainerId: string): Session[] => {
  return mockSessions.filter((s) => s.trainerId === trainerId);
};

// Helper function to get students by trainer ID
export const getStudentsByTrainerId = (trainerId: string): User[] => {
  const roadmap = mockRoadmaps.find((r) => r.trainerId === trainerId);
  if (!roadmap) return [];
  return [mockUsers.student1].filter((u) => u.id === roadmap.studentId);
};

