import Modal from './Modal';
import Button from './Button';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const variantStyles = {
    danger: {
      icon: 'text-error',
      bg: 'bg-error-light',
      button: 'destructive' as const,
    },
    warning: {
      icon: 'text-warning',
      bg: 'bg-warning-light',
      button: 'primary' as const,
    },
    info: {
      icon: 'text-info',
      bg: 'bg-info-light',
      button: 'primary' as const,
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="text-center py-2 sm:py-4">
        <div className={`w-16 h-16 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center ${style.bg} animate-scale-in`}>
          <ExclamationTriangleIcon className={`w-8 h-8 ${style.icon}`} />
        </div>
        <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 leading-relaxed">{message}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant={style.button}
            onClick={handleConfirm}
            disabled={isLoading}
            loading={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
