import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
  delay = 0
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals);
  });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      });

      const unsubscribe = rounded.on('change', (v) => {
        setDisplayValue(v);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, duration, delay, count, rounded]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  );
}

// Stat Card with animated counter
interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  prefix = '',
  suffix = '',
  delay = 0,
  className = ''
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      <motion.div
        className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 360 }}
      >
        <Icon className="h-8 w-8 text-black" />
      </motion.div>
      
      <div className="text-4xl font-bold text-gray-900 mb-2">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          delay={delay + 0.3}
        />
      </div>
      
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

// Progress bar with animation
interface AnimatedProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  delay?: number;
  color?: string;
}

export function AnimatedProgress({
  value,
  max = 100,
  label,
  showValue = true,
  className = '',
  delay = 0,
  color = 'bg-yellow-400'
}: AnimatedProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const percentage = (value / max) * 100;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {(label || showValue) && (
        <div className="flex justify-between mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-sm font-bold text-gray-900">
              <AnimatedCounter value={value} delay={delay + 0.2} />/{max}
            </span>
          )}
        </div>
      )}
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

// Circular progress
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  label?: string;
  className?: string;
  delay?: number;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showValue = true,
  label,
  className = '',
  delay = 0
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / max) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FACC15"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span className="text-2xl font-bold text-gray-900">
            <AnimatedCounter value={value} delay={delay + 0.3} suffix="%" />
          </span>
        )}
        {label && (
          <span className="text-xs text-gray-500 mt-1">{label}</span>
        )}
      </div>
    </motion.div>
  );
}

// Stats row component
interface StatsRowProps {
  stats: {
    icon: LucideIcon;
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
  className?: string;
}

export function StatsRow({ stats, className = '' }: StatsRowProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          prefix={stat.prefix}
          suffix={stat.suffix}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

// Animated number ticker
interface NumberTickerProps {
  value: number;
  className?: string;
}

export function NumberTicker({ value, className = '' }: NumberTickerProps) {
  const digits = value.toString().split('');
  
  return (
    <div className={`flex overflow-hidden ${className}`}>
      {digits.map((digit, index) => (
        <motion.div
          key={index}
          className="relative h-[1.2em] overflow-hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.span
            className="block"
            animate={{ y: ['-100%', '0%'] }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {digit}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}
