import { useEffect } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div
        className={`relative bg-surface-primary rounded-xl shadow-large w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-scale-in`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-border">
          <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-text-primary">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-surface-tertiary text-text-tertiary hover:text-text-primary transition-all duration-200"
              aria-label="Close modal"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
