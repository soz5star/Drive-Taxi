import { motion, Variants } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  containerClassName?: string;
  variant?: 'bounce' | 'pulse' | 'spin' | 'float' | 'wiggle' | 'glow' | 'morph' | 'wave' | 'breathe' | 'shake';
  hoverEffect?: 'scale' | 'rotate' | 'flip' | 'bounce' | 'glow' | 'shake' | 'none';
  color?: string;
  bgColor?: string;
  continuous?: boolean;
  delay?: number;
}

const continuousVariants: Record<string, Variants> = {
  bounce: {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  pulse: {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  },
  float: {
    animate: {
      y: [0, -10, 0],
      x: [0, 3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  wiggle: {
    animate: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 2,
        ease: 'easeInOut'
      }
    }
  },
  glow: {
    animate: {
      boxShadow: [
        '0 0 0 0 rgba(250, 204, 21, 0)',
        '0 0 20px 5px rgba(250, 204, 21, 0.4)',
        '0 0 0 0 rgba(250, 204, 21, 0)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  morph: {
    animate: {
      borderRadius: ['30%', '50%', '30%'],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  wave: {
    animate: {
      rotate: [0, 14, -8, 14, -4, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut'
      }
    }
  },
  breathe: {
    animate: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  shake: {
    animate: {
      x: [0, -3, 3, -3, 3, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'easeInOut'
      }
    }
  }
};

const hoverVariants: Record<string, any> = {
  scale: {
    scale: 1.2,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  rotate: {
    rotate: 360,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  flip: {
    rotateY: 180,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  bounce: {
    y: -10,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  glow: {
    scale: 1.1,
    boxShadow: '0 0 25px rgba(250, 204, 21, 0.6)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 }
  },
  none: {}
};

export default function AnimatedIcon({
  icon: Icon,
  size = 24,
  className = '',
  containerClassName = '',
  variant = 'float',
  hoverEffect = 'scale',
  color = 'text-black',
  bgColor = 'bg-yellow-400',
  continuous = true,
  delay = 0
}: AnimatedIconProps) {
  const containerSize = size * 2.5;

  return (
    <motion.div
      className={`rounded-full flex items-center justify-center ${bgColor} ${containerClassName}`}
      style={{ width: containerSize, height: containerSize }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 15
      }}
      whileHover={hoverVariants[hoverEffect]}
      {...(continuous && continuousVariants[variant])}
    >
      <Icon className={`${color} ${className}`} size={size} />
    </motion.div>
  );
}

// Simple animated icon without container
interface SimpleAnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  variant?: 'bounce' | 'pulse' | 'spin' | 'float' | 'wiggle' | 'none';
  hoverEffect?: 'scale' | 'rotate' | 'bounce' | 'none';
  delay?: number;
}

export function SimpleAnimatedIcon({
  icon: Icon,
  size = 24,
  className = '',
  variant = 'none',
  hoverEffect = 'scale',
  delay = 0
}: SimpleAnimatedIconProps) {
  const getAnimation = () => {
    if (variant === 'none') return {};
    return continuousVariants[variant]?.animate || {};
  };

  return (
    <motion.div
      className="inline-flex"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      animate={getAnimation()}
      whileHover={hoverVariants[hoverEffect]}
    >
      <Icon className={className} size={size} />
    </motion.div>
  );
}

// Icon with animated ring effect
interface RingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  ringColor?: string;
  delay?: number;
}

export function RingIcon({
  icon: Icon,
  size = 24,
  className = '',
  ringColor = 'border-yellow-400',
  delay = 0
}: RingIconProps) {
  const containerSize = size * 2.5;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${ringColor}`}
        style={{ width: containerSize, height: containerSize }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 0, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut'
        }}
      />
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${ringColor}`}
        style={{ width: containerSize, height: containerSize }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.5
        }}
      />
      <div
        className={`bg-yellow-400 rounded-full flex items-center justify-center relative z-10`}
        style={{ width: containerSize, height: containerSize }}
      >
        <Icon className={`text-black ${className}`} size={size} />
      </div>
    </motion.div>
  );
}

// Icon with number badge
interface BadgeIconProps {
  icon: LucideIcon;
  badge: number | string;
  size?: number;
  className?: string;
  delay?: number;
}

export function BadgeIcon({
  icon: Icon,
  badge,
  size = 24,
  className = '',
  delay = 0
}: BadgeIconProps) {
  const containerSize = size * 2.5;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className="bg-yellow-400 rounded-full flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >
        <Icon className={`text-black ${className}`} size={size} />
      </div>
      <motion.div
        className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: delay + 0.3,
          type: 'spring',
          stiffness: 500,
          damping: 15
        }}
      >
        {badge}
      </motion.div>
    </motion.div>
  );
}

// Morphing icon container
interface MorphingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  delay?: number;
}

export function MorphingIcon({
  icon: Icon,
  size = 24,
  className = '',
  delay = 0
}: MorphingIconProps) {
  const containerSize = size * 2.5;

  return (
    <motion.div
      className="bg-yellow-400 flex items-center justify-center"
      style={{ width: containerSize, height: containerSize }}
      initial={{ opacity: 0, borderRadius: '30%' }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      animate={{
        borderRadius: ['30%', '50%', '40%', '50%', '30%'],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      whileHover={{ scale: 1.1 }}
    >
      <Icon className={`text-black ${className}`} size={size} />
    </motion.div>
  );
}
