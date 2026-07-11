import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function StickyBookingCTA() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const inner = (
    <div className="flex items-center justify-center space-x-4">
      <Link
        to="/book"
        className="flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold"
      >
        <Calendar className="w-5 h-5" />
        <span>Book Now</span>
      </Link>
      <a
        href="tel:+447470856699"
        className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-bold"
      >
        <Phone className="w-5 h-5" />
        <span>Call</span>
      </a>
    </div>
  );

  // Respect reduced-motion: still render the bar (it's a key mobile conversion
  // and accessibility aid), just without the slide-in spring animation.
  if (prefersReducedMotion) {
    return visible ? (
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-3 md:hidden z-50">
        {inner}
      </div>
    ) : null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-3 md:hidden z-50"
        >
          {inner}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
