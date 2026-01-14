export type UserRole = 
  | 'student'
  | 'trainer'
  | 'master_mentor'
  | 'wing_admin'
  | 'umbrella_admin'
  | 'company';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  wingId?: string;
  avatar?: string;
}

export interface Wing {
  id: string;
  name: string;
  description: string;
  trainerCapacity: number;
  currentTrainers: number;
  walletBalance: number;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  status: 'active' | 'inactive';
}

export interface Roadmap {
  id: string;
  trainerId: string;
  studentId: string;
  title: string;
  description: string;
  learningGoals: string[];
  weeklyHours: number;
  monthlyPrice: number;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'changes_requested';
  phases: RoadmapPhase[];
  createdAt: string;
  updatedAt: string;
  mentorNotes?: string;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  order: number;
  tasks: Task[];
  reviewCheckpoint: boolean;
  isLocked: boolean;
  isApproved: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  order: number;
  status: 'pending' | 'completed' | 'blocked';
  completedAt?: string;
  estimatedHours?: number;
}

export interface Session {
  id: string;
  roadmapId: string;
  trainerId: string;
  studentId: string;
  title: string;
  scheduledAt: string;
  duration: number; // minutes
  status: 'scheduled' | 'completed' | 'cancelled';
  attendanceConfirmed: boolean;
  meetingLink?: string;
}

export interface TrainerAvailability {
  trainerId: string;
  weeklyCapacity: number; // hours per week
  availableDays: string[];
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface StudentProgress {
  studentId: string;
  roadmapId: string;
  currentPhase: number;
  completedTasks: number;
  totalTasks: number;
  completionPercentage: number;
  lastActivity: string;
}

