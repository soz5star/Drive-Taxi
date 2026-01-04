import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  variant?: 'fade' | 'slide' | 'scale' | 'blur' | 'spring' | 'bounce';
  duration?: number;
  once?: boolean;
  amount?: number;
}

const getDirectionOffset = (direction: string) => {
  switch (direction) {
    case 'up': return { y: 60, x: 0 };
    case 'down': return { y: -60, x: 0 };
    case 'left': return { x: 60, y: 0 };
    case 'right': return { x: -60, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

const getVariantConfig = (variant: string, direction: string) => {
  const offset = getDirectionOffset(direction);
  
  const variants: Record<string, { initial: any; animate: any; transition: any }> = {
    fade: {
      initial: { opacity: 0, ...offset },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    slide: {
      initial: { opacity: 0, ...offset },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8, ...offset },
      animate: { opacity: 1, scale: 1, x: 0, y: 0 },
      transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }
    },
    blur: {
      initial: { opacity: 0, filter: 'blur(10px)', ...offset },
      animate: { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
    spring: {
      initial: { opacity: 0, ...offset },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    bounce: {
      initial: { opacity: 0, scale: 0.5, ...offset },
      animate: { opacity: 1, scale: 1, x: 0, y: 0 },
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };
  
  return variants[variant] || variants.fade;
};

export default function AnimatedSection({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  variant = 'fade',
  duration,
  once = true,
  amount = 0.3
}: AnimatedSectionProps) {
  const config = getVariantConfig(variant, direction);
  
  return (
    <motion.div
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once, amount, margin: '-50px' }}
      transition={{
        ...config.transition,
        delay,
        ...(duration && { duration })
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated container for staggered children
interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
}

export function AnimatedContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
  once = true
}: AnimatedContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
}

// Animated item for use inside AnimatedContainer
interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';
}

export function AnimatedItem({
  children,
  className = '',
  variant = 'fadeUp'
}: AnimatedItemProps) {
  const itemVariants: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
      }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants[variant]}
    >
      {children}
    </motion.div>
  );
}

// Animated list component
interface AnimatedListProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function AnimatedList({
  items,
  className = '',
  itemClassName = '',
  staggerDelay = 0.1,
  direction = 'up'
}: AnimatedListProps) {
  const getItemVariants = (): Variants => {
    const initial = direction === 'up' 
      ? { opacity: 0, y: 30 }
      : direction === 'left'
        ? { opacity: 0, x: 30 }
        : { opacity: 0, x: -30 };

    return {
      hidden: initial,
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    };
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay }
        }
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={getItemVariants()}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Split text reveal animation
interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitReveal({
  text,
  className = '',
  delay = 0
}: SplitRevealProps) {
  const words = text.split(' ');

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay
          }
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-2 overflow-hidden inline-block"
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Mask reveal animation
interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export function MaskReveal({
  children,
  className = '',
  delay = 0,
  direction = 'left'
}: MaskRevealProps) {
  const getMaskAnimation = () => {
    switch (direction) {
      case 'left': return { left: ['0%', '100%'] };
      case 'right': return { right: ['0%', '100%'] };
      case 'up': return { top: ['0%', '100%'] };
      case 'down': return { bottom: ['0%', '100%'] };
      default: return { left: ['0%', '100%'] };
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.01, delay: delay + 0.3 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-yellow-400 z-10"
        initial={{ [direction === 'left' || direction === 'right' ? 'width' : 'height']: '100%' }}
        whileInView={{ [direction === 'left' || direction === 'right' ? 'width' : 'height']: '0%' }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{
          [direction]: 0
        }}
      />
    </div>
  );
}
