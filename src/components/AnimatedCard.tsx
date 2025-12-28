import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover, cardHoverAdvanced, cardHover3D } from '../lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverEffect?: boolean;
  variant?: 'basic' | 'lift' | '3d' | 'glow' | 'gradient' | 'flip';
  onClick?: () => void;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverEffect = true,
  variant = 'lift',
  onClick
}: AnimatedCardProps) {
  
  const hoverVariants = {
    basic: cardHover,
    lift: cardHoverAdvanced,
    '3d': cardHover3D,
    glow: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(250, 204, 21, 0.3)',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    gradient: {
      y: -10,
      scale: 1.03,
      boxShadow: '0 25px 50px rgba(250, 204, 21, 0.2)',
      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.05) 0%, transparent 100%)',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    flip: {
      rotateY: 5,
      rotateX: 5,
      y: -8,
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={hoverEffect ? hoverVariants[variant] : {}}
      onClick={onClick}
      className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
}
