import { motion } from 'framer-motion';
import { Shield, Clock, MapPin, Users } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: Shield, text: 'Fully Licensed & Insured' },
    { icon: Clock, text: '24/7 Advance Booking' },
    { icon: MapPin, text: 'Local St Andrews Service' },
    { icon: Users, text: 'Professional Drivers' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        >
          <motion.div
            className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mb-3"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <badge.icon className="h-6 w-6 text-black" />
          </motion.div>
          <p className="text-sm font-semibold text-gray-900">{badge.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
