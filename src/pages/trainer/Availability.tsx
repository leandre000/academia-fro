import { useState } from 'react';
import { mockTrainerAvailability } from '../../data/mockData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';

const availabilitySchema = z.object({
  weeklyCapacity: z.number().min(1).max(40),
  availableDays: z.array(z.string()),
  timeSlots: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  })),
});

type AvailabilityForm = z.infer<typeof availabilitySchema>;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function TrainerAvailability() {
  const [saved, setSaved] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AvailabilityForm>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      weeklyCapacity: mockTrainerAvailability.weeklyCapacity,
      availableDays: mockTrainerAvailability.availableDays,
      timeSlots: mockTrainerAvailability.timeSlots,
    },
  });

  const selectedDays = watch('availableDays') || [];

  const toggleDay = (day: string) => {
    const current = watch('availableDays') || [];
    if (current.includes(day)) {
      setValue('availableDays', current.filter((d) => d !== day));
    } else {
      setValue('availableDays', [...current, day]);
    }
  };

  const onSubmit = (data: AvailabilityForm) => {
    console.log('Availability updated:', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Availability & Capacity</h1>
        <p className="text-text-secondary">Manage your weekly schedule and teaching capacity</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Weekly Capacity */}
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Weekly Capacity
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2">
              Hours per week
            </label>
            <input
              type="number"
              {...register('weeklyCapacity', { valueAsNumber: true })}
              min="1"
              max="40"
              className="w-full max-w-xs bg-bg-tertiary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.weeklyCapacity && (
              <p className="text-red-400 text-sm mt-1">{errors.weeklyCapacity.message}</p>
            )}
            <p className="text-sm text-text-muted mt-2">
              Maximum hours you can dedicate to teaching per week
            </p>
          </div>
        </div>

        {/* Available Days */}
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Days</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`p-4 rounded border transition-colors ${
                  selectedDays.includes(day)
                    ? 'bg-white text-black border-white font-medium'
                    : 'bg-bg-tertiary border-border hover:bg-bg-primary'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Time Slots</h2>
          <div className="space-y-4">
            {selectedDays.map((day, idx) => (
              <div key={day} className="bg-bg-tertiary border border-border rounded p-4">
                <h3 className="font-medium mb-3">{day}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1">Start Time</label>
                    <input
                      type="time"
                      {...register(`timeSlots.${idx}.startTime`)}
                      className="w-full bg-bg-primary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1">End Time</label>
                    <input
                      type="time"
                      {...register(`timeSlots.${idx}.endTime`)}
                      className="w-full bg-bg-primary border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            {selectedDays.length === 0 && (
              <p className="text-text-muted text-center py-4">
                Select available days to set time slots
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <div>
            {saved && (
              <p className="text-white text-sm">Availability saved successfully!</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Save Availability
          </button>
        </div>
      </form>
    </div>
  );
}

