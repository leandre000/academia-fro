import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useRoadmapStore } from '../../store/roadmapStore';
import { getStudentsByTrainerId } from '../../data/mockData';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlusIcon, TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const roadmapSchema = z.object({
  studentId: z.string().min(1, 'Select a student'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  learningGoals: z.array(z.string()).min(1, 'At least one learning goal is required'),
  weeklyHours: z.number().min(1).max(40),
  monthlyPrice: z.number().min(0),
  phases: z.array(z.object({
    title: z.string().min(1, 'Phase title is required'),
    description: z.string().min(1, 'Phase description is required'),
    reviewCheckpoint: z.boolean(),
    tasks: z.array(z.object({
      title: z.string().min(1, 'Task title is required'),
      description: z.string().min(1, 'Task description is required'),
      estimatedHours: z.number().min(0).optional(),
    })).min(1, 'At least one task is required'),
  })).min(1, 'At least one phase is required'),
});

type RoadmapForm = z.infer<typeof roadmapSchema>;

export default function TrainerRoadmapBuilder() {
  const { user } = useAuthStore();
  const { createRoadmap, initializeRoadmaps } = useRoadmapStore();
  const navigate = useNavigate();
  const students = user ? getStudentsByTrainerId(user.id) : [];
  const [showPreview, setShowPreview] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initializeRoadmaps();
  }, [initializeRoadmaps]);

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<RoadmapForm>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      studentId: '',
      title: '',
      description: '',
      learningGoals: [],
      weeklyHours: 20,
      monthlyPrice: 500,
      phases: [
        {
          title: '',
          description: '',
          reviewCheckpoint: false,
          tasks: [{ title: '', description: '', estimatedHours: 0 }],
        },
      ],
    },
  });

  const [learningGoals, setLearningGoals] = useState<string[]>([]);

  const { fields: phaseFields, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: 'phases',
  });

  const addGoal = () => {
    if (newGoal.trim()) {
      setLearningGoals([...learningGoals, newGoal.trim()]);
      setValue('learningGoals', [...learningGoals, newGoal.trim()]);
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    const updated = learningGoals.filter((_, i) => i !== index);
    setLearningGoals(updated);
    setValue('learningGoals', updated);
  };

  const formData = watch();

  const onSubmit = async (data: RoadmapForm) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Transform form data to roadmap format
      const roadmapData = {
        trainerId: user.id,
        studentId: data.studentId,
        title: data.title,
        description: data.description,
        learningGoals: data.learningGoals,
        weeklyHours: data.weeklyHours,
        monthlyPrice: data.monthlyPrice,
        status: 'pending_review' as const,
        phases: data.phases.map((phase, idx) => ({
          id: `phase_${Date.now()}_${idx}`,
          title: phase.title,
          description: phase.description,
          order: idx + 1,
          reviewCheckpoint: phase.reviewCheckpoint,
          isLocked: idx > 0,
          isApproved: false,
          tasks: phase.tasks.map((task, taskIdx) => ({
            id: `task_${Date.now()}_${idx}_${taskIdx}`,
            title: task.title,
            description: task.description,
            order: taskIdx + 1,
            status: 'pending' as const,
            estimatedHours: task.estimatedHours,
          })),
        })),
      };

      createRoadmap(roadmapData);
      
      // Show success message
      alert('Roadmap created successfully!');
      
      // Navigate to students page or roadmap list
      navigate('/trainer/students');
    } catch (error) {
      console.error('Error creating roadmap:', error);
      alert('Failed to create roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">Roadmap Builder</h1>
        <p className="text-sm sm:text-base text-text-secondary">Create a custom learning path for your students</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowPreview(false)}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            !showPreview
              ? 'bg-brand-600 text-white shadow-soft'
              : 'bg-surface-primary border border-border text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
          }`}
        >
          Builder
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            showPreview
              ? 'bg-brand-600 text-white shadow-soft'
              : 'bg-surface-primary border border-border text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
          }`}
        >
          <EyeOpenIcon className="w-4 h-4" />
          Preview
        </button>
      </div>

      {showPreview ? (
        <div className="card p-8">
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">{formData.title || 'Roadmap Title'}</h2>
          <p className="text-text-secondary mb-6">{formData.description || 'Description'}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-surface-tertiary border border-border rounded-xl p-4">
              <p className="text-sm font-medium text-text-secondary mb-1">Weekly Hours</p>
              <p className="text-2xl font-semibold text-text-primary">{formData.weeklyHours || 0}h</p>
            </div>
            <div className="bg-surface-tertiary border border-border rounded-xl p-4">
              <p className="text-sm font-medium text-text-secondary mb-1">Monthly Price</p>
              <p className="text-2xl font-semibold text-text-primary">${formData.monthlyPrice || 0}</p>
            </div>
          </div>

          {learningGoals.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-text-primary">Learning Goals</h3>
              <ul className="space-y-2">
                {learningGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-text-secondary">
                    <span className="text-brand-600 mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-6">
            {formData.phases?.map((phase, phaseIdx) => (
              <div key={phaseIdx} className="bg-surface-tertiary border border-border rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-brand-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                    {phaseIdx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-text-primary">{phase.title || 'Phase Title'}</h3>
                    <p className="text-text-secondary">{phase.description || 'Phase description'}</p>
                  </div>
                </div>
                {phase.reviewCheckpoint && (
                  <div className="ml-11 mb-4">
                    <span className="badge-info">
                      Review Checkpoint
                    </span>
                  </div>
                )}
                <div className="ml-11 space-y-3">
                  {phase.tasks?.map((task, taskIdx) => (
                    <div key={taskIdx} className="bg-surface-primary border border-border rounded-xl p-4">
                      <h4 className="font-semibold mb-1 text-text-primary">{task.title || 'Task Title'}</h4>
                      <p className="text-sm text-text-secondary">{task.description || 'Task description'}</p>
                      {task.estimatedHours && (
                        <p className="text-xs text-text-tertiary mt-2">
                          Estimated: {task.estimatedHours} hours
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
        <div className="card p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Student</label>
                <select
                  {...register('studentId')}
                  className={`input ${errors.studentId ? 'input-error' : ''}`}
                >
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                {errors.studentId && (
                  <p className="error-text">{errors.studentId.message}</p>
                )}
              </div>

              <div>
                <label className="label">Roadmap Title</label>
                <input
                  {...register('title')}
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  placeholder="e.g., Full-Stack React Developer Path"
                />
                {errors.title && (
                  <p className="error-text">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className={`input ${errors.description ? 'input-error' : ''}`}
                  placeholder="Describe the learning path..."
                />
                {errors.description && (
                  <p className="error-text">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Weekly Hours</label>
                  <input
                    type="number"
                    {...register('weeklyHours', { valueAsNumber: true })}
                    min="1"
                    max="40"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Monthly Price ($)</label>
                  <input
                    type="number"
                    {...register('monthlyPrice', { valueAsNumber: true })}
                    min="0"
                    className="input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Learning Goals */}
          <div className="card p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-text-primary">Learning Goals</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Enter a learning goal"
                className="flex-1 input"
              />
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={addGoal}
              >
                <PlusIcon className="w-4 h-4" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {learningGoals.map((goal, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-surface-tertiary border border-border rounded-xl p-4">
                  <span className="flex-1 font-medium text-text-primary">{goal}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(idx)}
                    className="icon-button hover:bg-error/10 hover:text-error"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.learningGoals && (
              <p className="error-text">{errors.learningGoals.message}</p>
            )}
          </div>

          {/* Phases */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Phases</h2>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => appendPhase({
                  title: '',
                  description: '',
                  reviewCheckpoint: false,
                  tasks: [{ title: '', description: '', estimatedHours: 0 }],
                })}
              >
                <PlusIcon className="w-4 h-4" />
                Add Phase
              </Button>
            </div>

            {phaseFields.map((phase, phaseIdx) => (
              <PhaseBuilder
                key={phase.id}
                phaseIdx={phaseIdx}
                register={register}
                control={control}
                errors={errors}
                removePhase={phaseFields.length > 1 ? () => removePhase(phaseIdx) : undefined}
              />
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              showArrow
            >
              {isSubmitting ? 'Creating...' : 'Create Roadmap'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function PhaseBuilder({ phaseIdx, register, control, removePhase }: any) {
  const { fields: taskFields, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: `phases.${phaseIdx}.tasks`,
  });

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">Phase {phaseIdx + 1}</h3>
        {removePhase && (
          <button
            type="button"
            onClick={removePhase}
            className="icon-button hover:bg-error/10 hover:text-error"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="label">Phase Title</label>
          <input
            {...register(`phases.${phaseIdx}.title`)}
            className="input"
            placeholder="e.g., Foundation"
          />
        </div>

        <div>
          <label className="label">Phase Description</label>
          <textarea
            {...register(`phases.${phaseIdx}.description`)}
            rows={3}
            className="input"
            placeholder="Describe what students will learn in this phase..."
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-surface-tertiary rounded-xl border border-border">
          <input
            type="checkbox"
            {...register(`phases.${phaseIdx}.reviewCheckpoint`)}
            className="w-5 h-5 rounded border-2 border-border text-accent focus:ring-accent/20"
          />
          <label className="text-sm font-medium text-text-primary cursor-pointer">Requires mentor review checkpoint</label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="label mb-0">Tasks</label>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => appendTask({ title: '', description: '', estimatedHours: 0 })}
            >
              <PlusIcon className="w-4 h-4" />
              Add Task
            </Button>
          </div>

          <div className="space-y-4">
            {taskFields.map((task, taskIdx) => (
              <div key={task.id} className="bg-surface-tertiary border border-border rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-semibold text-text-primary">Task {taskIdx + 1}</span>
                  {taskFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(taskIdx)}
                      className="icon-button hover:bg-error/10 hover:text-error"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <input
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.title`)}
                    placeholder="Task title"
                    className="input text-sm"
                  />
                  <textarea
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.description`)}
                    placeholder="Task description"
                    rows={2}
                    className="input text-sm"
                  />
                  <input
                    type="number"
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.estimatedHours`, { valueAsNumber: true })}
                    placeholder="Estimated hours (optional)"
                    min="0"
                    className="input text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

