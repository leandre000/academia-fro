import { mockWings } from '../../data/mockData';
import { useAuthStore } from '../../store/authStore';
import { ArrowUpIcon, ArrowDownIcon, FileTextIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function WingAdminWallet() {
  const { user } = useAuthStore();
  const wing = user?.wingId ? mockWings.find((w) => w.id === user.wingId) : mockWings[0];

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
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">Wing Wallet</h1>
        <p className="text-text-secondary text-base">Financial overview for {wing?.name}</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="mb-6">
          <p className="text-primary-100 text-sm font-medium mb-2">Current Balance</p>
          <p className="text-5xl sm:text-6xl font-bold text-white">${(wing?.walletBalance || 0).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="lg"
          >
            View Withdrawals
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/30 hover:bg-white/10"
          >
            <FileTextIcon className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6 text-text-primary">Transaction History</h2>
        {mockTransactions.length > 0 ? (
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-dark-800 border border-dark-600 rounded-xl p-5 hover:border-primary-600/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {transaction.type === 'credit' ? (
                      <div className="w-12 h-12 bg-success/10 border border-success/20 rounded-xl flex items-center justify-center">
                        <ArrowUpIcon className="w-6 h-6 text-success" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-error/10 border border-error/20 rounded-xl flex items-center justify-center">
                        <ArrowDownIcon className="w-6 h-6 text-error" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-base text-text-primary">{transaction.description}</h3>
                      <p className="text-sm text-text-tertiary mt-1">
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
                      className={`font-bold text-lg ${transaction.type === 'credit' ? 'text-success' : 'text-error'
                        }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <span className="inline-block text-xs font-medium capitalize px-2.5 py-1 rounded-full mt-1 bg-success/10 text-success">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-tertiary text-base">No transactions yet</p>
          </div>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-text-primary">Withdrawal History (Read-Only)</h2>
        <div className="bg-dark-800 border border-dark-600 rounded-xl p-5">
          <p className="text-text-secondary text-base">
            Withdrawal history is managed by the umbrella administration.
          </p>
        </div>
      </div>
    </div>
  );
}
