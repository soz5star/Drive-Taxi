import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle, Car } from 'lucide-react';

interface HowItWorksProps {
  variant?: 'default' | 'compact';
}

export default function HowItWorks({ variant = 'default' }: HowItWorksProps) {
  const steps = [
    {
      icon: MessageCircle,
      title: 'Book Your Journey',
      description: 'Call, WhatsApp, or book online with your travel details'
    },
    {
      icon: CheckCircle,
      title: 'Get Confirmed',
      description: 'Receive instant confirmation with your final price'
    },
    {
      icon: Car,
      title: 'Travel in Comfort',
      description: 'Relax as we get you there on time, every time'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={itemVariants}
            >
              <motion.div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <step.icon className="h-8 w-8 text-black" />
                <motion.div 
                  className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
              <motion.h4 
                className="font-bold text-lg mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {step.title}
              </motion.h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.div 
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            variants={itemVariants}
          >
            <motion.div
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 text-center h-full"
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
                transition: { duration: 0.4 }
              }}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <step.icon className="h-10 w-10 text-black" />
                <motion.div 
                  className="absolute -top-2 -right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
              <motion.h3 
                className="text-xl font-bold mb-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {step.description}
              </motion.p>
            </motion.div>

            {/* Animated connector line */}
            {index < steps.length - 1 && (
              <motion.div 
                className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Animated background elements */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-5 blur-3xl"
        animate={{ 
          x: [0, 20, -20, 0],
          y: [0, 30, -10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-5 blur-3xl"
        animate={{ 
          x: [0, -20, 20, 0],
          y: [0, -30, 10, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
