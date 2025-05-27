"use client";

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick 
}: ButtonProps) => {
  const baseStyles = "font-medium rounded-md transition-all duration-300 inline-flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-green-800 hover:bg-green-900 text-cream-100 shadow-sm hover:shadow",
    secondary: "bg-amber-700 hover:bg-amber-800 text-cream-100 shadow-sm hover:shadow",
    outline: "bg-transparent border-2 border-green-800 text-green-800 hover:bg-green-800/10"
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3"
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
