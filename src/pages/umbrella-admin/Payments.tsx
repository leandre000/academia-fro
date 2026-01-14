import { mockRoadmaps, mockWings } from '../../data/mockData';
import * as ArrowUpIcon from '@radix-ui/react-icons/dist/ArrowUpIcon';
import * as ArrowDownIcon from '@radix-ui/react-icons/dist/ArrowDownIcon';

export default function UmbrellaAdminPayments() {
  const totalRevenue = mockWings.reduce((sum, w) => sum + w.walletBalance, 0);
  const monthlyRecurring = mockRoadmaps
    .filter((r) => r.status === 'approved')
    .reduce((sum, r) => sum + r.monthlyPrice, 0);

  const paymentFlows = [
    {
      id: '1',
      type: 'revenue',
      amount: monthlyRecurring,
      description: 'Monthly recurring revenue',
      date: '2024-02-01T00:00:00Z',
      status: 'completed',
    },
    {
      id: '2',
      type: 'payout',
      amount: 5000,
      description: 'Trainer payments - January',
      date: '2024-01-15T00:00:00Z',
      status: 'completed',
    },
    {
      id: '3',
      type: 'revenue',
      amount: monthlyRecurring,
      description: 'Monthly recurring revenue',
      date: '2024-01-01T00:00:00Z',
      status: 'completed',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment Flow Overview</h1>
        <p className="text-text-secondary">Monitor payment processing and financial flows</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-bg-secondary border border-white rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Total Revenue</p>
          <p className="text-4xl font-bold">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-text-muted mt-1">Across all wings</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Monthly Recurring</p>
          <p className="text-4xl font-bold">${monthlyRecurring.toLocaleString()}</p>
          <p className="text-xs text-text-muted mt-1">From active roadmaps</p>
        </div>
        <div className="bg-bg-secondary border border-border rounded-lg p-6">
          <p className="text-sm text-text-muted mb-2">Active Roadmaps</p>
          <p className="text-4xl font-bold">
            {mockRoadmaps.filter((r) => r.status === 'approved').length}
          </p>
          <p className="text-xs text-text-muted mt-1">Generating revenue</p>
        </div>
      </div>

      {/* Payment Flows */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Payment Flows</h2>
        <div className="space-y-4">
          {paymentFlows.map((flow) => (
            <div
              key={flow.id}
              className="bg-bg-tertiary border border-border rounded p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {flow.type === 'revenue' ? (
                    <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                      <ArrowUpIcon.default className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                      <ArrowDownIcon.default className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{flow.description}</h3>
                    <p className="text-sm text-text-muted">
                      {new Date(flow.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      flow.type === 'revenue' ? 'text-white' : 'text-text-muted'
                    }`}
                  >
                    {flow.type === 'revenue' ? '+' : '-'}${flow.amount.toLocaleString()}
                  </p>
                  <span className="text-xs text-white capitalize">{flow.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wing Breakdown */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Wing Revenue Breakdown</h2>
        <div className="space-y-3">
          {mockWings.map((wing) => (
            <div key={wing.id} className="bg-bg-tertiary border border-border rounded p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{wing.name}</h3>
                  <p className="text-sm text-text-secondary">{wing.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${wing.walletBalance.toLocaleString()}</p>
                  <p className="text-xs text-text-muted">Current Balance</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

