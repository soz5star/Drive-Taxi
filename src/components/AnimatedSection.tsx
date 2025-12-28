import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'bounceUp' | 'rotateUp' | 'zoomIn' | 'flipX' | 'flipY';
  stagger?: boolean;
  staggerDelay?: number;
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '',
  variant = 'fadeUp',
  stagger = false,
  staggerDelay = 0.1
}: AnimatedSectionProps) {
  
  const animationVariants = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    },
    slideLeft: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    },
    slideRight: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    },
    bounceUp: {
      initial: { opacity: 0, y: 60 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }
    },
    rotateUp: {
      initial: { opacity: 0, y: 40, rotate: -20 },
      whileInView: { opacity: 1, y: 0, rotate: 0 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    },
    flipX: {
      initial: { opacity: 0, rotateY: -90 },
      whileInView: { opacity: 1, rotateY: 0 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    },
    flipY: {
      initial: { opacity: 0, rotateX: -90 },
      whileInView: { opacity: 1, rotateX: 0 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const selectedAnimation = animationVariants[variant];

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      viewport={{ once: true, margin: '-100px' }}
      transition={selectedAnimation.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
