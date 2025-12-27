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

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <step.icon className="h-8 w-8 text-black" />
              </motion.div>
              <h4 className="font-bold text-lg mb-2">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 text-center"
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
            >
              <motion.div
                className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <step.icon className="h-10 w-10 text-black" />
                <div className="absolute -top-2 -right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-yellow-400 z-10" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
