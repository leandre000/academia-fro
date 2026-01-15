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
    danger: 'text-error',
    warning: 'text-warning',
    info: 'text-info',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="text-center py-4">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          variant === 'danger' ? 'bg-error-light' : 
          variant === 'warning' ? 'bg-warning-light' : 
          'bg-info-light'
        }`}>
          <ExclamationTriangleIcon className={`w-8 h-8 ${variantStyles[variant]}`} />
        </div>
        <p className="text-text-secondary text-lg mb-8">{message}</p>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

