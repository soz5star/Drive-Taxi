import { motion } from 'framer-motion';
import { Shield, Clock, Award, ThumbsUp } from 'lucide-react';

export default function Testimonials() {
  const highlights = [
    {
      icon: Shield,
      title: 'Reliable Service',
      text: 'Punctual pickups and professional drivers for stress-free travel'
    },
    {
      icon: Clock,
      title: 'Early Morning Specialists',
      text: 'Experienced in dawn departures and tight airport schedules'
    },
    {
      icon: Award,
      title: 'Quality Vehicles',
      text: 'Clean, comfortable, and well-maintained fleet'
    },
    {
      icon: ThumbsUp,
      title: 'Local Knowledge',
      text: 'Serving St Andrews and Fife with expertise'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {highlights.map((highlight, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
        >
          <motion.div
            className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <highlight.icon className="h-6 w-6 text-black" />
          </motion.div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">{highlight.title}</h3>
          <p className="text-gray-600 text-sm">{highlight.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
