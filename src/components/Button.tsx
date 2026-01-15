import type { ReactNode } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  showArrow = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {showArrow && <ArrowRightIcon className="w-4 h-4" />}
    </button>
  );
}

