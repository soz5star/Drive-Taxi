import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { buttonHover, buttonHoverAdvanced, buttonTap } from '../lib/animations';

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
  animationVariant?: 'basic' | 'advanced' | 'pulse' | 'bounce';
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
  disabled = false,
  animationVariant = 'advanced'
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

  const hoverAnimations = {
    basic: { ...buttonHover, ...glowEffect },
    advanced: { ...buttonHoverAdvanced, ...glowEffect },
    pulse: { 
      scale: 1.08, 
      y: -3, 
      boxShadow: `0 20px 40px ${glowColor || 'rgba(250, 204, 21, 0.3)'}`,
      transition: { duration: 0.3 }
    },
    bounce: { 
      scale: 1.1, 
      y: -5, 
      boxShadow: `0 25px 50px ${glowColor || 'rgba(250, 204, 21, 0.4)'}`,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
    }
  };

  const animationProps = {
    whileHover: disabled ? {} : hoverAnimations[animationVariant],
    whileTap: disabled ? {} : { ...buttonTap, scale: 0.95 }
  };

  if (to) {
    return (
      <motion.div 
        {...animationProps}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}
