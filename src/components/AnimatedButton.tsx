import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { buttonHover, buttonTap } from '../lib/animations';

interface AnimatedButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  glowColor?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  glowColor,
  type = 'button',
  disabled = false
}: AnimatedButtonProps) {
  const baseClasses = 'px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
  };

  const glowEffect = glowColor
    ? { boxShadow: `0 0 30px ${glowColor}` }
    : {};

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const animationProps = {
    whileHover: disabled ? {} : { ...buttonHover, ...glowEffect },
    whileTap: disabled ? {} : buttonTap
  };

  if (to) {
    return (
      <motion.div {...animationProps}>
        <Link to={to} className={combinedClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        {...animationProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...animationProps}
    >
      {children}
    </motion.button>
  );
}
