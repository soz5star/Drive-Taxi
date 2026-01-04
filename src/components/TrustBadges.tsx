import { motion, useInView } from 'framer-motion';
import { Shield, Clock, MapPin, Users, Award, Star, CheckCircle, Zap } from 'lucide-react';
import { useRef } from 'react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'detailed' | 'floating';
}

export default function TrustBadges({ variant = 'default' }: TrustBadgesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const badges = [
    { icon: Shield, text: 'Fully Licensed & Insured', subtext: 'Complete peace of mind' },
    { icon: Clock, text: '24/7 Advance Booking', subtext: 'Always available' },
    { icon: MapPin, text: 'Local St Andrews Service', subtext: 'Know every route' },
    { icon: Users, text: 'Professional Drivers', subtext: 'Experienced team' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        className="flex flex-wrap justify-center gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100"
            variants={badgeVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <motion.div
              className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <badge.icon className="h-4 w-4 text-black" />
            </motion.div>
            <span className="text-sm font-medium text-gray-900">{badge.text}</span>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'detailed') {
    return (
      <motion.div
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group"
            variants={badgeVariants}
            whileHover={{ 
              y: -10, 
              boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
              borderColor: 'rgba(250, 204, 21, 0.5)'
            }}
          >
            <motion.div
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <badge.icon className="h-8 w-8 text-black" />
              
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-yellow-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              />
            </motion.div>
            
            <h3 className="font-bold text-gray-900 mb-1">{badge.text}</h3>
            <p className="text-sm text-gray-500">{badge.subtext}</p>
            
            {/* Checkmark */}
            <motion.div
              className="mt-4 flex justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
            >
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.div
        ref={ref}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="relative"
            variants={badgeVariants}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center relative z-10"
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
              }}
            >
              <motion.div
                className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <badge.icon className="h-7 w-7 text-black" />
              </motion.div>
              <p className="font-semibold text-gray-900 text-sm">{badge.text}</p>
            </motion.div>
            
            {/* Shadow element */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 rounded-full blur-md"
              animate={{
                scale: [1, 0.9, 1],
                opacity: [0.3, 0.2, 0.3]
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-lg group cursor-pointer"
          variants={badgeVariants}
          whileHover={{ 
            y: -8, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            borderColor: 'rgba(250, 204, 21, 0.5)'
          }}
        >
          <motion.div
            className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />
            
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: index * 0.5
              }}
            >
              <badge.icon className="h-7 w-7 text-black relative z-10" />
            </motion.div>
          </motion.div>
          
          <p className="text-sm font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
            {badge.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Stats badges component
interface StatsBadgesProps {
  className?: string;
}

export function StatsBadges({ className = '' }: StatsBadgesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { icon: Star, value: '5.0', label: 'Rating' },
    { icon: Users, value: '1000+', label: 'Happy Customers' },
    { icon: Clock, value: '24/7', label: 'Availability' },
    { icon: Award, value: '10+', label: 'Years Experience' }
  ];

  return (
    <motion.div
      ref={ref}
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
          }}
          whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        >
          <motion.div
            className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <stat.icon className="h-6 w-6 text-black" />
          </motion.div>
          <motion.p
            className="text-3xl font-bold text-gray-900 mb-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {stat.value}
          </motion.p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Feature list component
interface FeatureListProps {
  features: string[];
  className?: string;
}

export function FeatureList({ features, className = '' }: FeatureListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`space-y-3 ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 }
        }
      }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ x: 5 }}
        >
          <motion.div
            className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="h-4 w-4 text-black" />
          </motion.div>
          <span className="text-gray-700">{feature}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
