import { useState } from 'react';
import type { Roadmap } from '../types';
import Button from './Button';
import { CheckIcon, Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons';

interface RoadmapApprovalCardProps {
    roadmap: Roadmap;
    onApprove: (roadmapId: string) => void;
    onRequestChanges: (roadmapId: string, notes: string) => void;
    onReject: (roadmapId: string, reason: string) => void;
}

export default function RoadmapApprovalCard({
    roadmap,
    onApprove,
    onRequestChanges,
    onReject,
}: RoadmapApprovalCardProps) {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState<'changes' | 'reject' | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!notes.trim() && action) {
            alert('Please provide notes');
            return;
        }

        setLoading(true);
        try {
            if (action === 'changes') {
                await onRequestChanges(roadmap.id, notes);
            } else if (action === 'reject') {
                await onReject(roadmap.id, notes);
            }
            setNotes('');
            setAction(null);
            setShowNotes(false);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async () => {
        setLoading(true);
        try {
            await onApprove(roadmap.id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 hover:border-primary-600/50 transition-all">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-text-primary mb-2">{roadmap.title}</h3>
                <p className="text-text-secondary text-sm">{roadmap.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-800 rounded-xl p-4">
                    <p className="text-xs text-text-tertiary mb-1">Weekly Hours</p>
                    <p className="text-2xl font-bold text-text-primary">{roadmap.weeklyHours}h</p>
                </div>
                <div className="bg-dark-800 rounded-xl p-4">
                    <p className="text-xs text-text-tertiary mb-1">Monthly Price</p>
                    <p className="text-2xl font-bold text-text-primary">${roadmap.monthlyPrice}</p>
                </div>
            </div>

            {/* Learning Goals */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Learning Goals</h4>
                <ul className="space-y-2">
                    {roadmap.learningGoals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckIcon className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            <span>{goal}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Phases Summary */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary mb-3">
                    Phases ({roadmap.phases.length})
                </h4>
                <div className="space-y-2">
                    {roadmap.phases.map((phase) => (
                        <div key={phase.id} className="bg-dark-800 rounded-lg p-3">
                            <p className="font-medium text-text-primary text-sm">{phase.title}</p>
                            <p className="text-xs text-text-tertiary mt-1">{phase.tasks.length} tasks</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Notes Input (when requesting changes or rejecting) */}
            {showNotes && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        {action === 'changes' ? 'Changes Requested' : 'Rejection Reason'}
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={action === 'changes' ? 'Describe what changes are needed...' : 'Explain why this roadmap is being rejected...'}
                        className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
                    />
                    <div className="flex gap-2 mt-3">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                setShowNotes(false);
                                setAction(null);
                                setNotes('');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleSubmit} loading={loading}>
                            Submit
                        </Button>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            {!showNotes && (
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="primary"
                        onClick={handleApprove}
                        loading={loading}
                        className="flex-1"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Approve Roadmap
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setAction('changes');
                            setShowNotes(true);
                        }}
                    >
                        <Pencil1Icon className="w-4 h-4" />
                        Request Changes
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setAction('reject');
                            setShowNotes(true);
                        }}
                    >
                        <Cross2Icon className="w-4 h-4" />
                        Reject
                    </Button>
                </div>
            )}

            {/* Status Badge */}
            <div className="mt-4 pt-4 border-t border-dark-600">
                <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${roadmap.status === 'approved' ? 'bg-success/10 text-success' :
                        roadmap.status === 'pending_review' ? 'bg-warning/10 text-warning' :
                            roadmap.status === 'rejected' ? 'bg-error/10 text-error' :
                                'bg-dark-600 text-text-tertiary'
                    }`}>
                    {roadmap.status.replace('_', ' ').toUpperCase()}
                </span>
            </div>
        </div>
    );
}
