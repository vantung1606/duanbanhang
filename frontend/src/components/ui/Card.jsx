import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ 
  children, 
  className, 
  variant = 'flat', 
  padding = 'p-6',
  ...props 
}) => {
  const variants = {
    flat: 'bg-background-light dark:bg-background-dark shadow-neumo-md dark:shadow-neumo-dark-md',
    inset: 'bg-background-light dark:bg-background-dark shadow-neumo-inner dark:shadow-neumo-dark-inner',
    glass: 'glass-card',
  };

  return (
    <div 
      className={twMerge(
        'rounded-clay overflow-hidden',
        variants[variant],
        padding,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
