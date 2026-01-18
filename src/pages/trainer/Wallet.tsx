import { useAuthStore } from '../../store/authStore';
import { mockWallets } from '../../data/mockData';
import { ArrowUpIcon, ArrowDownIcon, DownloadIcon } from '@radix-ui/react-icons';
import Button from '../../components/Button';

export default function TrainerWallet() {
  const { user } = useAuthStore();
  const wallet = user ? mockWallets[user.id] : null;

  if (!wallet) {
    return (
      <div className="p-6 sm:p-8">
        <div className="bg-dark-700 border border-dark-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">No Wallet Found</h2>
          <p className="text-text-secondary text-base">Wallet information is not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-text-primary">Wallet</h1>
        <p className="text-text-secondary text-base">View your earnings and transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="mb-6">
          <p className="text-primary-100 text-sm font-medium mb-2">Current Balance</p>
          <p className="text-5xl sm:text-6xl font-bold text-white">${wallet.balance.toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="lg"
          >
            <DownloadIcon className="w-4 h-4" />
            Request Withdrawal
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white border-white/30 hover:bg-white/10"
          >
            View Statements
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-dark-700 border border-dark-600 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-text-primary">Transaction History</h2>
        {wallet.transactions.length > 0 ? (
          <div className="space-y-3">
            {wallet.transactions.map((transaction) => (
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
                    <span
                      className={`inline-block text-xs font-medium capitalize px-2.5 py-1 rounded-full mt-1 ${transaction.status === 'completed'
                        ? 'bg-success/10 text-success'
                        : transaction.status === 'pending'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-error/10 text-error'
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
          <div className="text-center py-12">
            <p className="text-text-tertiary text-base">No transactions yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
