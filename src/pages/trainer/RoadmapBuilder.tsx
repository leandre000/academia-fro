import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getStudentsByTrainerId, mockRoadmaps } from '../../data/mockData';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as PlusIcon from '@radix-ui/react-icons/dist/PlusIcon';
import * as TrashIcon from '@radix-ui/react-icons/dist/TrashIcon';
import * as EyeOpenIcon from '@radix-ui/react-icons/dist/EyeOpenIcon';

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
  const students = user ? getStudentsByTrainerId(user.id) : [];
  const [showPreview, setShowPreview] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<RoadmapForm>({
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

  const { fields: goalFields, append: appendGoal, remove: removeGoal } = useFieldArray({
    control,
    name: 'learningGoals',
  });

  const { fields: phaseFields, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: 'phases',
  });

  const addGoal = () => {
    if (newGoal.trim()) {
      appendGoal(newGoal.trim());
      setNewGoal('');
    }
  };

  const formData = watch();

  const onSubmit = (data: RoadmapForm) => {
    console.log('Roadmap created:', data);
    alert('Roadmap created successfully! (Mock - would submit to backend)');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Roadmap Builder</h1>
        <p className="text-text-secondary">Create a custom learning path for your students</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            !showPreview
              ? 'bg-white text-black'
              : 'bg-bg-secondary border border-border text-white hover:bg-bg-tertiary'
          }`}
        >
          Builder
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            showPreview
              ? 'bg-white text-black'
              : 'bg-bg-secondary border border-border text-white hover:bg-bg-tertiary'
          }`}
        >
          <EyeOpenIcon.default className="w-4 h-4 inline mr-2" />
          Preview
        </button>
      </div>

      {showPreview ? (
        <div className="bg-bg-secondary border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2">{formData.title || 'Roadmap Title'}</h2>
          <p className="text-text-secondary mb-6">{formData.description || 'Description'}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-bg-tertiary border border-border rounded p-4">
              <p className="text-sm text-text-muted mb-1">Weekly Hours</p>
              <p className="text-2xl font-bold">{formData.weeklyHours || 0}h</p>
            </div>
            <div className="bg-bg-tertiary border border-border rounded p-4">
              <p className="text-sm text-text-muted mb-1">Monthly Price</p>
              <p className="text-2xl font-bold">${formData.monthlyPrice || 0}</p>
            </div>
          </div>

          {formData.learningGoals && formData.learningGoals.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Learning Goals</h3>
              <ul className="space-y-2">
                {formData.learningGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-6">
            {formData.phases?.map((phase, phaseIdx) => (
              <div key={phaseIdx} className="bg-bg-tertiary border border-border rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {phaseIdx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{phase.title || 'Phase Title'}</h3>
                    <p className="text-text-secondary">{phase.description || 'Phase description'}</p>
                  </div>
                </div>
                {phase.reviewCheckpoint && (
                  <div className="ml-11 mb-4">
                    <span className="bg-bg-primary border border-border rounded px-2 py-1 text-xs">
                      Review Checkpoint
                    </span>
                  </div>
                )}
                <div className="ml-11 space-y-3">
                  {phase.tasks?.map((task, taskIdx) => (
                    <div key={taskIdx} className="bg-bg-primary border border-border rounded p-4">
                      <h4 className="font-medium mb-1">{task.title || 'Task Title'}</h4>
                      <p className="text-sm text-text-secondary">{task.description || 'Task description'}</p>
                      {task.estimatedHours && (
                        <p className="text-xs text-text-muted mt-2">
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
          <div className="bg-bg-secondary border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Student</label>
                <select
                  {...register('studentId')}
                  className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select a student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                {errors.studentId && (
                  <p className="text-red-400 text-sm mt-1">{errors.studentId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Roadmap Title</label>
                <input
                  {...register('title')}
                  className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="e.g., Full-Stack React Developer Path"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Describe the learning path..."
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weekly Hours</label>
                  <input
                    type="number"
                    {...register('weeklyHours', { valueAsNumber: true })}
                    min="1"
                    max="40"
                    className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Price ($)</label>
                  <input
                    type="number"
                    {...register('monthlyPrice', { valueAsNumber: true })}
                    min="0"
                    className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-bg-secondary border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGoal())}
                placeholder="Enter a learning goal"
                className="flex-1 bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="button"
                onClick={addGoal}
                className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
              >
                <PlusIcon.default className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {goalFields.map((field, idx) => (
                <div key={field.id} className="flex items-center gap-2 bg-bg-tertiary border border-border rounded p-3">
                  <span className="flex-1">{watch(`learningGoals.${idx}`)}</span>
                  <button
                    type="button"
                    onClick={() => removeGoal(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon.default className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {errors.learningGoals && (
              <p className="text-red-400 text-sm mt-2">{errors.learningGoals.message}</p>
            )}
          </div>

          {/* Phases */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Phases</h2>
              <button
                type="button"
                onClick={() => appendPhase({
                  title: '',
                  description: '',
                  reviewCheckpoint: false,
                  tasks: [{ title: '', description: '', estimatedHours: 0 }],
                })}
                className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <PlusIcon.default className="w-4 h-4" />
                Add Phase
              </button>
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Create Roadmap
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function PhaseBuilder({ phaseIdx, register, control, errors, removePhase }: any) {
  const { fields: taskFields, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: `phases.${phaseIdx}.tasks`,
  });

  return (
    <div className="bg-bg-secondary border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Phase {phaseIdx + 1}</h3>
        {removePhase && (
          <button
            type="button"
            onClick={removePhase}
            className="text-red-400 hover:text-red-300"
          >
            <TrashIcon.default className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Phase Title</label>
          <input
            {...register(`phases.${phaseIdx}.title`)}
            className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="e.g., Foundation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phase Description</label>
          <textarea
            {...register(`phases.${phaseIdx}.description`)}
            rows={2}
            className="w-full bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Describe what students will learn in this phase..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register(`phases.${phaseIdx}.reviewCheckpoint`)}
            className="w-4 h-4"
          />
          <label className="text-sm">Requires mentor review checkpoint</label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium">Tasks</label>
            <button
              type="button"
              onClick={() => appendTask({ title: '', description: '', estimatedHours: 0 })}
              className="bg-bg-tertiary border border-border text-white px-3 py-1 rounded text-sm hover:bg-bg-primary transition-colors flex items-center gap-1"
            >
              <PlusIcon.default className="w-3 h-3" />
              Add Task
            </button>
          </div>

          <div className="space-y-3">
            {taskFields.map((task, taskIdx) => (
              <div key={task.id} className="bg-bg-tertiary border border-border rounded p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium">Task {taskIdx + 1}</span>
                  {taskFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(taskIdx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon.default className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.title`)}
                    placeholder="Task title"
                    className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <textarea
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.description`)}
                    placeholder="Task description"
                    rows={2}
                    className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <input
                    type="number"
                    {...register(`phases.${phaseIdx}.tasks.${taskIdx}.estimatedHours`, { valueAsNumber: true })}
                    placeholder="Estimated hours (optional)"
                    min="0"
                    className="w-full bg-bg-primary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
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

