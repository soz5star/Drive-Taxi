import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Car, Plane, MapPin, Star, Clock, Shield } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

interface FloatingElementsProps {
  variant?: 'circles' | 'icons' | 'dots' | 'lines' | 'mixed';
  count?: number;
  className?: string;
  color?: string;
}

export default function FloatingElements({
  variant = 'circles',
  count = 15,
  className = '',
  color = 'yellow-400'
}: FloatingElementsProps) {
  const elements = useMemo<FloatingElement[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      rotation: Math.random() * 360
    }));
  }, [count]);

  const icons = [Car, Plane, MapPin, Star, Clock, Shield];

  if (variant === 'icons') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {elements.slice(0, 8).map((el, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={el.id}
              className={`absolute text-${color}/20`}
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: el.delay
              }}
            >
              <Icon size={el.size} />
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {elements.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute rounded-full bg-${color}`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size / 3,
              height: el.size / 3,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: el.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'lines') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {elements.slice(0, 10).map((el) => (
          <motion.div
            key={el.id}
            className={`absolute bg-${color}/10`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size * 3,
              height: 2,
              transformOrigin: 'left center'
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              rotate: el.rotation
            }}
            transition={{
              duration: el.duration / 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'mixed') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Circles */}
        {elements.slice(0, 5).map((el) => (
          <motion.div
            key={`circle-${el.id}`}
            className={`absolute rounded-full border-2 border-${color}/20`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size,
              height: el.size,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay
            }}
          />
        ))}
        
        {/* Dots */}
        {elements.slice(5, 10).map((el) => (
          <motion.div
            key={`dot-${el.id}`}
            className={`absolute rounded-full bg-${color}/30`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size / 4,
              height: el.size / 4,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: el.duration / 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay
            }}
          />
        ))}
        
        {/* Squares */}
        {elements.slice(10, 15).map((el) => (
          <motion.div
            key={`square-${el.id}`}
            className={`absolute bg-${color}/10`}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: el.size / 2,
              height: el.size / 2,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: el.duration * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: el.delay
            }}
          />
        ))}
      </div>
    );
  }

  // Default: circles
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute rounded-full border border-${color}/20`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size,
            height: el.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay
          }}
        />
      ))}
    </div>
  );
}

// Animated decorative shapes
interface DecorativeShapesProps {
  className?: string;
}

export function DecorativeShapes({ className = '' }: DecorativeShapesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large gradient circle */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Medium circle */}
      <motion.div
        className="absolute top-1/2 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl"
        animate={{
          y: [0, 50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Small floating circles */}
      <motion.div
        className="absolute bottom-20 right-1/4 w-20 h-20 bg-yellow-400/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Decorative lines */}
      <motion.div
        className="absolute top-1/3 right-10 w-32 h-0.5 bg-gradient-to-r from-yellow-400/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

// Animated grid pattern
interface GridPatternProps {
  className?: string;
  size?: number;
  color?: string;
}

export function GridPattern({
  className = '',
  size = 40,
  color = 'rgba(250, 204, 21, 0.1)'
}: GridPatternProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size}px ${size}px`
      }}
    />
  );
}

// Animated noise texture
interface NoiseTextureProps {
  className?: string;
  opacity?: number;
}

export function NoiseTexture({
  className = '',
  opacity = 0.03
}: NoiseTextureProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }}
    />
  );
}

// Animated spotlight effect
interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className = '' }: SpotlightProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute w-96 h-96 bg-gradient-radial from-yellow-400/20 to-transparent rounded-full blur-3xl"
        animate={{
          x: ['-50%', '150%', '-50%'],
          y: ['-20%', '120%', '-20%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </motion.div>
  );
}
