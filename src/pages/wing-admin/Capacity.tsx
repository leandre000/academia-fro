import { mockWings, mockUsers } from '../../data/mockData';
import * as PersonIcon from '@radix-ui/react-icons/dist/PersonIcon';

export default function WingAdminCapacity() {
  const wing = mockWings[0];
  const trainers = Object.values(mockUsers).filter((u) => u.role === 'trainer' && u.wingId === wing.id);

  const capacityPercentage = (wing.currentTrainers / wing.trainerCapacity) * 100;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trainer Capacity</h1>
        <p className="text-text-secondary">Manage trainer assignments and capacity for {wing.name}</p>
      </div>

      {/* Capacity Overview */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Capacity Overview</h2>
            <p className="text-text-secondary">
              {wing.currentTrainers} of {wing.trainerCapacity} trainers assigned
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{Math.round(capacityPercentage)}%</p>
            <p className="text-sm text-text-muted">Utilized</p>
          </div>
        </div>
        <div className="bg-bg-tertiary border border-border rounded-full h-4">
          <div
            className="bg-white h-4 rounded-full transition-all"
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
      </div>

      {/* Trainer List */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Assigned Trainers</h2>
        {trainers.length > 0 ? (
          <div className="space-y-4">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-bg-tertiary border border-border rounded p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg-primary border border-border rounded-full flex items-center justify-center">
                      <PersonIcon.default className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{trainer.name}</h3>
                      <p className="text-sm text-text-secondary">{trainer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-text-muted">Status</p>
                      <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <button className="bg-bg-primary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-tertiary transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No trainers assigned</p>
        )}
      </div>

      {/* Capacity Actions */}
      <div className="mt-6 flex gap-4">
        <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
          Add Trainer
        </button>
        <button className="bg-bg-secondary border border-border text-white px-6 py-2 rounded font-medium hover:bg-bg-tertiary transition-colors">
          Adjust Capacity
        </button>
      </div>
    </div>
  );
}

