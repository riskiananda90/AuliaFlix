import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  className = ''
}) => {
  const baseStyles = 'font-medium transition-colors duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outlined: 'bg-transparent border border-white hover:bg-white/10 text-white',
    text: 'bg-transparent hover:bg-white/10 text-white'
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1 px-2 rounded',
    md: 'text-sm py-2 px-4 rounded-md',
    lg: 'text-base py-3 px-6 rounded-md'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;