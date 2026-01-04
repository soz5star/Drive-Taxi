import { motion, useInView } from 'framer-motion';
import { MessageCircle, CheckCircle, Car, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface HowItWorksProps {
  variant?: 'default' | 'compact' | 'vertical' | 'timeline';
}

export default function HowItWorks({ variant = 'default' }: HowItWorksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: MessageCircle,
      title: 'Book Your Journey',
      description: 'Call, WhatsApp, or book online with your travel details',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      icon: CheckCircle,
      title: 'Get Confirmed',
      description: 'Receive instant confirmation with your final price',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Car,
      title: 'Travel in Comfort',
      description: 'Relax as we get you there on time, every time',
      color: 'from-yellow-600 to-yellow-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5
      }
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        className="bg-gray-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={stepVariants}
            >
              <motion.div
                className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <step.icon className="h-8 w-8 text-black" />
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
              <h4 className="font-bold text-lg mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'vertical') {
    return (
      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex gap-6 mb-8 last:mb-0"
            variants={stepVariants}
          >
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <motion.div
                className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <step.icon className="h-7 w-7 text-black" />
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className="w-0.5 h-full bg-yellow-400/30 my-2"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  style={{ originY: 0 }}
                />
              )}
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              whileHover={{ x: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (variant === 'timeline') {
    return (
      <motion.div
        ref={ref}
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Timeline line */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 -translate-y-1/2 hidden md:block"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={stepVariants}
            >
              {/* Connector dot */}
              <motion.div
                className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-yellow-400 rounded-full z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
              />

              <motion.div
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center relative"
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)' 
                }}
              >
                {/* Step number badge */}
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                >
                  {index + 1}
                </motion.div>

                <motion.div
                  className={`bg-gradient-to-br ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon className="h-10 w-10 text-black" />
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            variants={stepVariants}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center relative overflow-hidden group"
              whileHover={{ 
                y: -12, 
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)' 
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Icon container */}
              <motion.div
                className="bg-yellow-400 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: index * 0.5
                  }}
                >
                  <step.icon className="h-12 w-12 text-black" />
                </motion.div>

                {/* Step number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    delay: 0.4 + index * 0.15, 
                    type: 'spring',
                    stiffness: 300
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-400 rounded-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 relative z-10">{step.title}</h3>
              <p className="text-gray-600 relative z-10">{step.description}</p>
            </motion.div>

            {/* Connector arrow */}
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:flex absolute top-1/2 -right-4 w-8 items-center justify-center z-10"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-6 h-6 text-yellow-400" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Connecting line (desktop) */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-yellow-400/50 via-yellow-400 to-yellow-400/50 -translate-y-1/2 -z-10"
        variants={lineVariants}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
