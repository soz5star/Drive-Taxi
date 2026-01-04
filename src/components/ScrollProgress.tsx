import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  variant?: 'bar' | 'circle' | 'dots' | 'line';
  position?: 'top' | 'bottom' | 'left' | 'right';
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export default function ScrollProgress({
  variant = 'bar',
  position = 'top',
  color = 'bg-yellow-400',
  height = 4,
  showPercentage = false
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  if (variant === 'circle') {
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = useTransform(
      scrollYProgress,
      [0, 1],
      [circumference, 0]
    );

    return (
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="4"
          />
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#FACC15"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            transform="rotate(-90 25 25)"
          />
        </svg>
        {showPercentage && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {percentage}%
          </span>
        )}
      </motion.div>
    );
  }

  if (variant === 'dots') {
    const dots = 10;
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {Array.from({ length: dots }).map((_, i) => {
          const threshold = (i + 1) / dots;
          return (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300"
              animate={{
                backgroundColor: percentage / 100 >= threshold ? '#FACC15' : '#D1D5DB',
                scale: percentage / 100 >= threshold ? 1.2 : 1
              }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
      </div>
    );
  }

  if (variant === 'line') {
    const positionClasses = {
      top: 'top-0 left-0 right-0',
      bottom: 'bottom-0 left-0 right-0',
      left: 'left-0 top-0 bottom-0',
      right: 'right-0 top-0 bottom-0'
    };

    const isVertical = position === 'left' || position === 'right';

    return (
      <div
        className={`fixed ${positionClasses[position]} z-50`}
        style={{
          width: isVertical ? height : '100%',
          height: isVertical ? '100%' : height
        }}
      >
        <motion.div
          className={`${color} origin-left`}
          style={{
            scaleX: isVertical ? 1 : scaleX,
            scaleY: isVertical ? scaleX : 1,
            width: '100%',
            height: '100%',
            transformOrigin: isVertical ? 'top' : 'left'
          }}
        />
        {showPercentage && (
          <motion.span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-black bg-yellow-400 px-2 py-1 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: percentage > 5 ? 1 : 0 }}
          >
            {percentage}%
          </motion.span>
        )}
      </div>
    );
  }

  // Default: bar
  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0'
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-50 ${color}`}
      style={{
        scaleX,
        height,
        transformOrigin: 'left'
      }}
    />
  );
}

// Scroll to top button with progress
interface ScrollToTopProps {
  showAfter?: number;
}

export function ScrollToTop({ showAfter = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-black shadow-lg flex items-center justify-center"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" className="absolute">
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="3"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          fill="none"
          stroke="#FACC15"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <path d="M18 15l-6-6-6 6" />
      </motion.svg>
    </motion.button>
  );
}

// Section indicator
interface SectionIndicatorProps {
  sections: string[];
  activeSection: number;
}

export function SectionIndicator({ sections, activeSection }: SectionIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
              index === activeSection
                ? 'bg-yellow-400 border-yellow-400'
                : 'bg-transparent border-gray-400'
            }`}
            animate={{
              scale: index === activeSection ? 1.2 : 1
            }}
          />
          <motion.span
            className={`text-sm font-medium transition-colors duration-300 ${
              index === activeSection ? 'text-yellow-400' : 'text-gray-400'
            }`}
            animate={{
              opacity: index === activeSection ? 1 : 0.5
            }}
          >
            {section}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
