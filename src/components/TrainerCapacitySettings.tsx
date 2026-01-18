import { useState } from 'react';
import Button from './Button';
import { calculateTrainerCapacity } from '../utils/businessLogic';

interface TrainerCapacitySettingsProps {
    trainerId: string;
    currentWeeklyHours: number;
    currentStudents: number;
    onUpdate: (weeklyHours: number) => void;
}

export default function TrainerCapacitySettings({
    trainerId,
    currentWeeklyHours,
    currentStudents,
    onUpdate,
}: TrainerCapacitySettingsProps) {
    const [weeklyHours, setWeeklyHours] = useState(currentWeeklyHours);
    const [loading, setLoading] = useState(false);

    const capacity = calculateTrainerCapacity(trainerId, weeklyHours, currentStudents);

    const handleSave = async () => {
        setLoading(true);
        try {
            await onUpdate(weeklyHours);
            alert('Capacity settings updated successfully!');
        } catch (error) {
            alert('Failed to update capacity settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-text-primary mb-6">Weekly Capacity Settings</h3>

            {/* Current Status */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-800 rounded-xl p-4">
                    <p className="text-sm text-text-tertiary mb-1">Current Students</p>
                    <p className="text-3xl font-bold text-text-primary">{currentStudents}</p>
                </div>
                <div className="bg-dark-800 rounded-xl p-4">
                    <p className="text-sm text-text-tertiary mb-1">Max Students</p>
                    <p className="text-3xl font-bold text-text-primary">{capacity.maxStudents}</p>
                </div>
            </div>

            {/* Hours Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                    Weekly Available Hours
                </label>
                <input
                    type="number"
                    min="0"
                    max="168"
                    step="0.5"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-text-tertiary mt-2">
                    Minimum 4.5 hours required per student per week
                </p>
            </div>

            {/* Capacity Info */}
            <div className="bg-dark-800 border border-dark-600 rounded-xl p-5 mb-6">
                <h4 className="font-semibold text-text-primary mb-4">Capacity Breakdown</h4>
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Available Hours/Week:</span>
                        <span className="text-text-primary font-semibold">{weeklyHours}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Hours per Student:</span>
                        <span className="text-text-primary font-semibold">{capacity.minimumHoursPerStudent}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Maximum Students:</span>
                        <span className="text-text-primary font-semibold">{capacity.maxStudents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Current Students:</span>
                        <span className="text-text-primary font-semibold">{capacity.currentStudents}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-dark-600">
                        <span className="text-text-secondary">Remaining Capacity:</span>
                        <span className={`font-bold ${capacity.canAcceptMore ? 'text-success' : 'text-error'}`}>
                            {capacity.remainingCapacity} {capacity.remainingCapacity === 1 ? 'student' : 'students'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${capacity.canAcceptMore
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error'
                    }`}>
                    {capacity.canAcceptMore ? '✓ Can Accept New Students' : '✗ At Full Capacity'}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <Button
                    variant="primary"
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading || weeklyHours === currentWeeklyHours}
                >
                    Save Changes
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => setWeeklyHours(currentWeeklyHours)}
                    disabled={loading}
                >
                    Reset
                </Button>
            </div>

            {/* Warning */}
            {capacity.remainingCapacity < 1 && (
                <div className="mt-6 bg-warning/10 border border-warning/20 rounded-xl p-4">
                    <p className="text-sm text-warning">
                        ⚠️ You are at full capacity. To accept more students, increase your weekly available hours.
                    </p>
                </div>
            )}
        </div>
    );
}
