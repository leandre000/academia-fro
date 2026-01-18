import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { CheckIcon } from '@radix-ui/react-icons';
import type { Session } from '../types';

interface SessionConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    session: Session | null;
    userRole: 'trainer' | 'student';
    onConfirm: (sessionId: string, notes?: string) => void;
}

export default function SessionConfirmationModal({
    isOpen,
    onClose,
    session,
    userRole,
    onConfirm,
}: SessionConfirmationModalProps) {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    if (!session) return null;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await onConfirm(session.id, notes);
            setNotes('');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    const sessionDate = new Date(session.scheduledAt);
    const isPastSession = sessionDate < new Date();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirm Session Attendance" size="md">
            <div className="space-y-6">
                {/* Session Info */}
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
                    <h3 className="font-semibold text-text-primary mb-3">{session.title}</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-text-tertiary">Date:</span>
                            <span className="text-text-secondary">{sessionDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-tertiary">Time:</span>
                            <span className="text-text-secondary">{sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-tertiary">Duration:</span>
                            <span className="text-text-secondary">{session.duration} minutes</span>
                        </div>
                    </div>
                </div>

                {/* Warning if not past */}
                {!isPastSession && (
                    <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                        <p className="text-sm text-warning">
                            ⚠️ This session hasn't occurred yet. Please confirm only after the session has taken place.
                        </p>
                    </div>
                )}

                {/* Confirmation Status */}
                <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
                    <h4 className="font-medium text-text-primary mb-3">Confirmation Status</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-text-secondary">Trainer Confirmed</span>
                            {session.trainerConfirmed ? (
                                <CheckIcon className="w-5 h-5 text-success" />
                            ) : (
                                <span className="text-xs text-text-tertiary">Pending</span>
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-text-secondary">Student Confirmed</span>
                            {session.studentConfirmed ? (
                                <CheckIcon className="w-5 h-5 text-success" />
                            ) : (
                                <span className="text-xs text-text-tertiary">Pending</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notes Input */}
                {userRole === 'trainer' && (
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                            Session Notes (Optional)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes about this session (topics covered, student progress, etc.)"
                            className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px]"
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirm}
                        loading={loading}
                        disabled={loading || (userRole === 'trainer' && session.trainerConfirmed) || (userRole === 'student' && session.studentConfirmed)}
                    >
                        <CheckIcon className="w-4 h-4" />
                        Confirm Attendance
                    </Button>
                </div>

                {/* Info */}
                <p className="text-xs text-text-tertiary text-center">
                    Both trainer and student must confirm for the session to count toward weekly hours.
                </p>
            </div>
        </Modal>
    );
}
