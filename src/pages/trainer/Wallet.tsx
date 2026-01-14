import { useAuthStore } from '../../store/authStore';
import { mockWallets } from '../../data/mockData';
import * as ArrowUpIcon from '@radix-ui/react-icons/dist/ArrowUpIcon';
import * as ArrowDownIcon from '@radix-ui/react-icons/dist/ArrowDownIcon';

export default function TrainerWallet() {
  const { user } = useAuthStore();
  const wallet = user ? mockWallets[user.id] : null;

  if (!wallet) {
    return (
      <div className="p-8">
        <div className="bg-bg-secondary border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Wallet Found</h2>
          <p className="text-text-secondary">Wallet information is not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-text-secondary">View your earnings and transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="bg-bg-secondary border border-white rounded-lg p-8 mb-8">
        <div className="mb-4">
          <p className="text-text-muted text-sm mb-2">Current Balance</p>
          <p className="text-5xl font-bold">${wallet.balance.toLocaleString()}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors">
            Request Withdrawal
          </button>
          <button className="bg-bg-tertiary border border-border text-white px-6 py-2 rounded font-medium hover:bg-bg-primary transition-colors">
            View Statements
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-bg-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        {wallet.transactions.length > 0 ? (
          <div className="space-y-4">
            {wallet.transactions.map((transaction) => (
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
                    <span
                      className={`text-xs capitalize ${
                        transaction.status === 'completed'
                          ? 'text-white'
                          : transaction.status === 'pending'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
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
    </div>
  );
}

