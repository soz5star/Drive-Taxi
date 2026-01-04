import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ReactNode, useRef } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  magneticStrength?: number;
  glowOnHover?: boolean;
  rippleEffect?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  magneticStrength = 0.3,
  glowOnHover = true,
  rippleEffect = true,
  type = 'button',
  disabled = false
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-yellow-400 text-black hover:bg-yellow-500',
    secondary: 'bg-white text-black hover:bg-gray-100',
    outline: 'border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent',
    ghost: 'bg-transparent text-yellow-400 hover:bg-yellow-400/10'
  };

  const baseClasses = `
    rounded-lg font-semibold transition-colors duration-300
    inline-flex items-center justify-center relative overflow-hidden
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const glowStyle = glowOnHover && !disabled ? {
    boxShadow: variant === 'primary' 
      ? '0 0 30px rgba(250, 204, 21, 0.5)'
      : '0 0 20px rgba(250, 204, 21, 0.3)'
  } : {};

  const content = (
    <motion.div
      ref={ref}
      className={baseClasses}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={disabled ? {} : { scale: 1.02, ...glowStyle }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {rippleEffect && (
        <motion.span
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 'inherit' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
}

// Animated CTA Button with arrow
interface CTAButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function CTAButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: CTAButtonProps) {
  const content = (
    <motion.div
      className={`
        bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg
        inline-flex items-center gap-3 group cursor-pointer
        ${className}
      `}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 40px rgba(250, 204, 21, 0.5)'
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
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </motion.svg>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
}

// Glowing button with animated border
interface GlowingButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function GlowingButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: GlowingButtonProps) {
  const content = (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 rounded-lg blur opacity-75"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Button content */}
      <div className="relative bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2">
        {children}
      </div>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
}

// Pulsing button for important CTAs
interface PulsingButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function PulsingButton({
  children,
  to,
  href,
  onClick,
  className = ''
}: PulsingButtonProps) {
  const content = (
    <motion.div
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-lg"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />
      <motion.div
        className="absolute inset-0 bg-yellow-400 rounded-lg"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.5
        }}
      />
      
      {/* Button content */}
      <div className="relative bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2">
        {children}
      </div>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
}

// Icon button with hover reveal text
interface IconButtonProps {
  icon: ReactNode;
  text: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({
  icon,
  text,
  to,
  href,
  onClick,
  className = ''
}: IconButtonProps) {
  const content = (
    <motion.div
      className={`
        bg-yellow-400 text-black rounded-full font-semibold
        flex items-center gap-0 overflow-hidden cursor-pointer
        ${className}
      `}
      initial={{ width: 48 }}
      whileHover={{ width: 'auto' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <motion.span
        className="pr-6 whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        {text}
      </motion.span>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick}>{content}</button>;
}
