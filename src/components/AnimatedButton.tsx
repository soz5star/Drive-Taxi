import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glowColor?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  animated?: boolean;
}

export default function AnimatedButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  glowColor,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  animated = true
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent',
    ghost: 'bg-transparent text-yellow-400 hover:bg-yellow-400/10',
    gradient: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
  };

  const baseClasses = `
    rounded-lg font-semibold transition-all duration-300
    inline-flex items-center justify-center gap-2
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const defaultGlow = variant === 'primary' 
    ? 'rgba(250, 204, 21, 0.5)' 
    : 'rgba(250, 204, 21, 0.3)';
  
  const activeGlow = glowColor || defaultGlow;

  const hoverAnimation = disabled ? {} : {
    scale: 1.03,
    boxShadow: `0 0 30px ${activeGlow}`,
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  const tapAnimation = disabled ? {} : {
    scale: 0.97,
    transition: { duration: 0.1 }
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <motion.span
          animate={animated ? { x: [0, -3, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <motion.span
          animate={animated ? { x: [0, 3, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (to) {
    return (
      <motion.div
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        className="inline-block"
      >
        <Link to={to} className={baseClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {content}
    </motion.button>
  );
}

// Arrow button with animated arrow
interface ArrowButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export function ArrowButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = ''
}: ArrowButtonProps) {
  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent'
  };

  const content = (
    <motion.div
      className={`
        px-6 py-3 rounded-lg font-semibold
        inline-flex items-center gap-3 group
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px rgba(250, 204, 21, 0.4)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:translate-x-1 transition-transform"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </motion.svg>
    </motion.div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}

// Shimmer button with animated background
interface ShimmerButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function ShimmerButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: ShimmerButtonProps) {
  const content = (
    <motion.div
      className={`
        relative px-8 py-4 rounded-lg font-semibold text-black
        overflow-hidden group cursor-pointer
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-yellow-400" />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}

// Outline button with fill animation
interface FillButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function FillButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: FillButtonProps) {
  const content = (
    <motion.div
      className={`
        relative px-8 py-4 rounded-lg font-semibold
        border-2 border-yellow-400 text-yellow-400
        overflow-hidden group cursor-pointer
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fill background */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Content */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {children}
      </span>
    </motion.div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}

// Bouncing button for CTAs
interface BouncingButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function BouncingButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: BouncingButtonProps) {
  const content = (
    <motion.div
      className={`
        bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold
        inline-flex items-center gap-2 cursor-pointer
        ${className}
      `}
      animate={{
        y: [0, -5, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick}>{content}</button>;
}

// Icon-only button
interface IconButtonProps {
  icon: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel: string;
}

export function IconOnlyButton({
  icon,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent'
  };

  const content = (
    <motion.div
      className={`
        rounded-full flex items-center justify-center
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      {icon}
    </motion.div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return <button onClick={onClick} aria-label={ariaLabel}>{content}</button>;
}

// Social button
interface SocialButtonProps {
  icon: ReactNode;
  href: string;
  label: string;
  className?: string;
}

export function SocialButton({
  icon,
  href,
  label,
  className = ''
}: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-10 h-10 rounded-full bg-gray-800 text-white
        flex items-center justify-center
        hover:bg-yellow-400 hover:text-black
        transition-colors duration-300
        ${className}
      `}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
