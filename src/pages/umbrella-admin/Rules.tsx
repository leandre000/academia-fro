export default function UmbrellaAdminRules() {
  const systemRules = [
    {
      id: '1',
      name: 'Roadmap Approval Required',
      description: 'All roadmaps must be approved by a master mentor before activation',
      status: 'enforced',
      category: 'Roadmap',
    },
    {
      id: '2',
      name: 'Phase Progression Lock',
      description: 'Students cannot progress to next phase without mentor approval at checkpoints',
      status: 'enforced',
      category: 'Progression',
    },
    {
      id: '3',
      name: 'Minimum Weekly Hours',
      description: 'Minimum 5 hours per week required for active roadmaps',
      status: 'enforced',
      category: 'Engagement',
    },
    {
      id: '4',
      name: 'Payment Processing',
      description: 'Monthly payments processed automatically on the 1st of each month',
      status: 'enforced',
      category: 'Payment',
    },
    {
      id: '5',
      name: 'Trainer Capacity Limit',
      description: 'Maximum trainer capacity per wing enforced to maintain quality',
      status: 'enforced',
      category: 'Capacity',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">System Rules & Policies</h1>
        <p className="text-text-secondary">Manage system-wide rules and enforcement policies</p>
      </div>

      <div className="space-y-4">
        {systemRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-bg-secondary border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{rule.name}</h3>
                  <span className="bg-white text-black rounded px-2 py-1 text-xs font-medium">
                    {rule.status}
                  </span>
                  <span className="bg-bg-tertiary border border-border rounded px-2 py-1 text-xs">
                    {rule.category}
                  </span>
                </div>
                <p className="text-text-secondary">{rule.description}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-bg-tertiary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
                Edit Rule
              </button>
              <button className="bg-bg-tertiary border border-border text-white px-4 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
          Add New Rule
        </button>
      </div>
    </div>
  );
}

