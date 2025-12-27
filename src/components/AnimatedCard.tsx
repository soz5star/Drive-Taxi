import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover } from '../lib/animations';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverEffect?: boolean;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverEffect = true
}: AnimatedCardProps) {
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
      whileHover={hoverEffect ? cardHover : {}}
      className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}
