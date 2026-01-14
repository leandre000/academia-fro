import { mockWings, mockWallets } from '../../data/mockData';
import { useAuthStore } from '../../store/authStore';
import * as ArrowUpIcon from '@radix-ui/react-icons/dist/ArrowUpIcon';
import * as ArrowDownIcon from '@radix-ui/react-icons/dist/ArrowDownIcon';

export default function WingAdminWallet() {
  const { user } = useAuthStore();
  const wing = user?.wingId ? mockWings.find((w) => w.id === user.wingId) : mockWings[0];
  const wallet = wing ? mockWallets[wing.id] : null;

  const mockTransactions = [
    {
      id: '1',
      type: 'credit' as const,
      amount: 10000,
      description: 'Monthly revenue - January',
      createdAt: '2024-01-01T00:00:00Z',
      status: 'completed' as const,
    },
    {
      id: '2',
      type: 'debit' as const,
      amount: 5000,
      description: 'Trainer payments',
      createdAt: '2024-01-15T00:00:00Z',
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'credit' as const,
      amount: 12000,
      description: 'Monthly revenue - February',
      createdAt: '2024-02-01T00:00:00Z',
      status: 'completed' as const,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wing Wallet</h1>
        <p className="text-text-secondary">Financial overview for {wing?.name}</p>
      </div>

      {/* Balance Card */}
      <div className="bg-bg-secondary border border-white rounded-lg p-8 mb-8">
        <div className="mb-4">
          <p className="text-text-muted text-sm mb-2">Current Balance</p>
          <p className="text-5xl font-bold">${(wing?.walletBalance || 0).toLocaleString()}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
            View Withdrawals
          </button>
          <button className="bg-bg-tertiary border border-border text-white px-6 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {mockTransactions.length > 0 ? (
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-bg-tertiary border border-border rounded p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {transaction.type === 'credit' ? (
                      <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                        <ArrowUpIcon.default className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                        <ArrowDownIcon.default className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{transaction.description}</h3>
                      <p className="text-sm text-text-muted">
                        {new Date(transaction.createdAt).toLocaleDateString('en-US', {
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
                        transaction.type === 'credit' ? 'text-white' : 'text-text-muted'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <span className="text-xs text-white capitalize">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-center py-8">No transactions yet</p>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Withdrawal History (Read-Only)</h2>
        <div className="bg-bg-tertiary border border-border rounded p-4">
          <p className="text-text-muted text-sm">
            Withdrawal history is managed by the umbrella administration.
          </p>
        </div>
      </div>
    </div>
  );
}

