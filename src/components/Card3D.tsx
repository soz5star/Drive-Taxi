import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEffect?: boolean;
  floatEffect?: boolean;
  delay?: number;
}

export default function Card3D({
  children,
  className = '',
  tiltStrength = 15,
  glareEffect = true,
  floatEffect = false,
  delay = 0
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);
  
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(normalizedX * 0.5);
    y.set(normalizedY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative bg-white rounded-xl shadow-xl overflow-hidden ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
      }}
      animate={floatEffect ? {
        y: [0, -10, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      } : {}}
    >
      {/* Glare effect */}
      {glareEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
            opacity: 0
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

// Flip Card Component
interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  flipOnHover?: boolean;
  delay?: number;
}

export function FlipCard({
  front,
  back,
  className = '',
  flipOnHover = true,
  delay = 0
}: FlipCardProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={flipOnHover ? { rotateY: 180 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-white shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>
        
        {/* Back */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl bg-yellow-400 shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Stacked Cards Component
interface StackedCardsProps {
  cards: ReactNode[];
  className?: string;
}

export function StackedCards({ cards, className = '' }: StackedCardsProps) {
  return (
    <div className={`relative ${className}`}>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ 
            opacity: 0, 
            y: 50,
            rotate: (index - Math.floor(cards.length / 2)) * 5
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            rotate: (index - Math.floor(cards.length / 2)) * 3
          }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          whileHover={{
            y: -20,
            rotate: 0,
            zIndex: 10,
            scale: 1.05
          }}
          style={{
            zIndex: cards.length - index,
            transformOrigin: 'center bottom'
          }}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
}

// Glassmorphism Card
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: number;
  delay?: number;
}

export function GlassCard({
  children,
  className = '',
  blur = 10,
  delay = 0
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative rounded-xl overflow-hidden
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-xl
        ${className}
      `}
      style={{ backdropFilter: `blur(${blur}px)` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        borderColor: 'rgba(255,255,255,0.4)'
      }}
    >
      {children}
    </motion.div>
  );
}

// Gradient Border Card
interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  delay?: number;
}

export function GradientBorderCard({
  children,
  className = '',
  borderWidth = 2,
  delay = 0
}: GradientBorderCardProps) {
  return (
    <motion.div
      className={`relative rounded-xl p-[${borderWidth}px] ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Content */}
      <div className="relative bg-white rounded-lg p-6">
        {children}
      </div>
    </motion.div>
  );
}

// Hover Reveal Card
interface HoverRevealCardProps {
  image?: string;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function HoverRevealCard({
  image,
  title,
  description,
  className = '',
  delay = 0
}: HoverRevealCardProps) {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      
      {/* Image if provided */}
      {image && (
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 0.9 }}
      />
      
      {/* Content */}
      <div className="relative p-6 h-full flex flex-col justify-end min-h-[200px]">
        <motion.h3
          className="text-xl font-bold text-white mb-2"
          initial={{ y: 20 }}
          whileHover={{ y: 0 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-300 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Hover indicator */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        whileHover={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
