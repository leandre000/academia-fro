import Modal from './Modal';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false,
}: ConfirmationModalProps) {
  const variantStyles = {
    danger: {
      icon: '⚠️',
      iconBg: 'bg-error/10',
      iconColor: 'text-error',
      confirmVariant: 'destructive' as const,
    },
    warning: {
      icon: '⚡',
      iconBg: 'bg-warning/10',
      iconColor: 'text-warning',
      confirmVariant: 'primary' as const,
    },
    info: {
      icon: 'ℹ️',
      iconBg: 'bg-primary-600/10',
      iconColor: 'text-primary-500',
      confirmVariant: 'primary' as const,
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <span className="text-3xl">{style.icon}</span>
        </div>

        <p className="text-base text-text-secondary mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={style.confirmVariant}
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
