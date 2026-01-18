// Payment Distribution Logic
// Requirement: 35% to Wing, 65% to Umbrella, automatically on payment

export interface PaymentDistribution {
  totalAmount: number;
  wingAmount: number;      // 35%
  umbrellaAmount: number;  // 65%
  timestamp: string;
}

export function distributePayment(amount: number, wingId: string): PaymentDistribution {
  const wingPercentage = 0.35;
  const umbrellaPercentage = 0.65;
  
  const distribution: PaymentDistribution = {
    totalAmount: amount,
    wingAmount: amount * wingPercentage,
    umbrellaAmount: amount * umbrellaPercentage,
    timestamp: new Date().toISOString(),
  };

  // In real implementation, this would:
  // 1. Create transaction records
  // 2. Update wing wallet
  // 3. Update umbrella wallet
  // 4. Log the distribution
  // 5. Send confirmation emails
  
  console.log('Payment Distribution:', {
    total: `$${distribution.totalAmount}`,
    wing: `$${distribution.wingAmount} (35%)`,
    umbrella: `$${distribution.umbrellaAmount} (65%)`,
    wingId,
  });

  return distribution;
}

// Trainer Capacity Management
// Requirement: Calculate how many students a trainer can handle based on available hours

export interface TrainerCapacityInfo {
  trainerId: string;
  weeklyAvailableHours: number;
  minimumHoursPerStudent: number;
  maxStudents: number;
  currentStudents: number;
  remainingCapacity: number;
  canAcceptMore: boolean;
}

export function calculateTrainerCapacity(
  trainerId: string,
  weeklyAvailableHours: number,
  currentStudents: number,
  minimumHoursPerStudent: number = 4.5 // System default
): TrainerCapacityInfo {
  const maxStudents = Math.floor(weeklyAvailableHours / minimumHoursPerStudent);
  const remainingCapacity = maxStudents - currentStudents;
  const canAcceptMore = remainingCapacity > 0;

  const capacityInfo: TrainerCapacityInfo = {
    trainerId,
    weeklyAvailableHours,
    minimumHoursPerStudent,
    maxStudents,
    currentStudents,
    remainingCapacity,
    canAcceptMore,
  };

  console.log('Trainer Capacity:', {
    trainer: trainerId,
    available: `${weeklyAvailableHours}h/week`,
    maxStudents,
    current: currentStudents,
    remaining: remainingCapacity,
    status: canAcceptMore ? '✓ Can accept' : '✗ Full',
  });

  return capacityInfo;
}

// Payment Access Control
// Requirement: Lock/unlock learning based on payment status

export interface PaymentStatus {
  studentId: string;
  lastPaymentDate: string;
  nextPaymentDue: string;
  isPaid: boolean;
  daysUntilDue: number;
  accessGranted: boolean;
}

export function checkPaymentStatus(
  studentId: string,
  lastPaymentDate: string,
  paymentCycleDays: number = 30
): PaymentStatus {
  const lastPayment = new Date(lastPaymentDate);
  const now = new Date();
  const nextDue = new Date(lastPayment);
  nextDue.setDate(nextDue.getDate() + paymentCycleDays);

  const daysUntilDue = Math.ceil((nextDue.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isPaid = daysUntilDue > 0;
  const accessGranted = isPaid;

  const status: PaymentStatus = {
    studentId,
    lastPaymentDate,
    nextPaymentDue: nextDue.toISOString(),
    isPaid,
    daysUntilDue,
    accessGranted,
  };

  if (!accessGranted) {
    console.warn('Access Denied:', {
      student: studentId,
      reason: 'Payment overdue',
      daysPastDue: Math.abs(daysUntilDue),
    });
  }

  return status;
}

// Session Confirmation Tracking
// Requirement: Track dual confirmation and flag disputes

export interface SessionConfirmationStatus {
  sessionId: string;
  trainerConfirmed: boolean;
  studentConfirmed: boolean;
  bothConfirmed: boolean;
  isDisputed: boolean;
  countsTowardHours: boolean;
}

export function getSessionConfirmationStatus(
  sessionId: string,
  trainerConfirmed: boolean,
  studentConfirmed: boolean,
  status: string
): SessionConfirmationStatus {
  const bothConfirmed = trainerConfirmed && studentConfirmed;
  const isDisputed = status === 'disputed' || (status === 'completed' && !bothConfirmed);
  const countsTowardHours = bothConfirmed && status === 'completed';

  return {
    sessionId,
    trainerConfirmed,
    studentConfirmed,
    bothConfirmed,
    isDisputed,
    countsTowardHours,
  };
}

// Weekly Hours Calculation
// Requirement: Only count confirmed sessions toward weekly hours

export function calculateWeeklyHours(
  sessions: Array<{
    id: string;
    duration: number;
    status: string;
    trainerConfirmed: boolean;
    studentConfirmed: boolean;
    scheduledAt: string;
  }>,
  weekStartDate: Date
): { totalHours: number; confirmedHours: number; disputedSessions: string[] } {
  const weekEnd = new Date(weekStartDate);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const weekSessions = sessions.filter(s => {
    const sessionDate = new Date(s.scheduledAt);
    return sessionDate >= weekStartDate && sessionDate < weekEnd;
  });

  let totalHours = 0;
  let confirmedHours = 0;
  const disputedSessions: string[] = [];

  weekSessions.forEach(session => {
    const hours = session.duration / 60;
    totalHours += hours;

    const bothConfirmed = session.trainerConfirmed && session.studentConfirmed;
    if (bothConfirmed && session.status === 'completed') {
      confirmedHours += hours;
    } else if (session.status === 'completed') {
      disputedSessions.push(session.id);
    }
  });

  return {
    totalHours,
    confirmedHours,
    disputedSessions,
  };
}

// Roadmap Approval Workflow
// Requirement: Enforce mentor approval before learning starts

export interface RoadmapApprovalStatus {
  roadmapId: string;
  status: string;
  canStartLearning: boolean;
  blockedReason?: string;
}

export function checkRoadmapApproval(
  roadmapId: string,
  status: string
): RoadmapApprovalStatus {
  const canStartLearning = status === 'approved';
  
  let blockedReason: string | undefined;
  if (status === 'draft') {
    blockedReason = 'Roadmap not submitted for review';
  } else if (status === 'pending_review') {
    blockedReason = 'Awaiting mentor approval';
  } else if (status === 'rejected') {
    blockedReason = 'Roadmap rejected by mentor';
  } else if (status === 'changes_requested') {
    blockedReason = 'Changes requested by mentor';
  }

  return {
    roadmapId,
    status,
    canStartLearning,
    blockedReason,
  };
}
