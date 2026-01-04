import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverEffect?: boolean | 'lift' | 'glow' | 'tilt' | 'scale' | 'border';
  variant?: 'default' | 'glass' | 'gradient' | 'outline';
  glowColor?: string;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  hoverEffect = true,
  variant = 'default',
  glowColor = 'rgba(250, 204, 21, 0.3)'
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // For tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || hoverEffect !== 'tilt') return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / (rect.width / 2) * 0.5);
    y.set((e.clientY - centerY) / (rect.height / 2) * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getHoverAnimation = () => {
    if (!hoverEffect) return {};
    
    switch (hoverEffect) {
      case 'lift':
        return {
          y: -12,
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'glow':
        return {
          y: -8,
          boxShadow: `0 20px 40px ${glowColor}`,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'scale':
        return {
          scale: 1.03,
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'border':
        return {
          borderColor: '#FACC15',
          boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.3)',
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'tilt':
        return {};
      case true:
      default:
        return {
          y: -8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          transition: { duration: 0.3, ease: 'easeOut' }
        };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border border-white/20';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 border border-gray-100';
      case 'outline':
        return 'bg-transparent border-2 border-gray-200';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const tiltStyle = hoverEffect === 'tilt' ? {
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d' as const,
    perspective: 1000
  } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={getHoverAnimation()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`rounded-xl shadow-lg ${getVariantClasses()} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Feature card with icon
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  className = ''
}: FeatureCardProps) {
  return (
    <AnimatedCard delay={delay} hoverEffect="lift" className={`p-6 ${className}`}>
      <motion.div
        className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </AnimatedCard>
  );
}

// Service card with hover reveal
interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features?: string[];
  delay?: number;
  className?: string;
  popular?: boolean;
}

export function ServiceCard({
  icon,
  title,
  description,
  features = [],
  delay = 0,
  className = '',
  popular = false
}: ServiceCardProps) {
  return (
    <AnimatedCard 
      delay={delay} 
      hoverEffect="glow" 
      className={`p-8 relative overflow-hidden ${className}`}
    >
      {popular && (
        <motion.div
          className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold"
          initial={{ scale: 0, rotate: -12 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, type: 'spring', stiffness: 300 }}
        >
          Most Popular
        </motion.div>
      )}
      
      <motion.div
        className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center text-sm text-gray-600"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.4 + index * 0.1 }}
            >
              <motion.span
                className="w-5 h-5 bg-yellow-400/20 rounded-full flex items-center justify-center mr-2"
                whileHover={{ scale: 1.2 }}
              >
                <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.span>
              {feature}
            </motion.li>
          ))}
        </ul>
      )}
    </AnimatedCard>
  );
}

// Pricing card
interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  onCtaClick?: () => void;
  delay?: number;
  highlighted?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  period = '',
  features,
  cta,
  onCtaClick,
  delay = 0,
  highlighted = false,
  className = ''
}: PricingCardProps) {
  return (
    <AnimatedCard
      delay={delay}
      hoverEffect="lift"
      className={`p-8 relative ${highlighted ? 'border-2 border-yellow-400' : ''} ${className}`}
    >
      {highlighted && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2 }}
        >
          Recommended
        </motion.div>
      )}
      
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <div className="mb-6">
        <motion.span
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, type: 'spring' }}
        >
          {price}
        </motion.span>
        {period && <span className="text-gray-500 ml-1">{period}</span>}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-center text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.4 + index * 0.05 }}
          >
            <svg className="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </motion.li>
        ))}
      </ul>
      
      <motion.button
        onClick={onCtaClick}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          highlighted
            ? 'bg-yellow-400 text-black hover:bg-yellow-500'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {cta}
      </motion.button>
    </AnimatedCard>
  );
}

// Testimonial card
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
  delay?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  delay = 0,
  className = ''
}: TestimonialCardProps) {
  return (
    <AnimatedCard delay={delay} hoverEffect="lift" className={`p-6 ${className}`}>
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.1 + i * 0.05 }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      
      {/* Author */}
      <div className="flex items-center">
        {avatar ? (
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mr-4">
            <span className="text-black font-bold text-lg">
              {author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-bold text-gray-900">{author}</p>
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      </div>
    </AnimatedCard>
  );
}
