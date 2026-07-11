import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Phone } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div>
      <SEO
        title="404 - Page Not Found | Drive Taxi"
        description="The page you're looking for doesn't exist. Return to Drive Taxi homepage to book your airport transfer."
        canonical="https://drivetaxi.co.uk"
      />
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.h1
                className="text-9xl font-bold text-yellow-400"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                404
              </motion.h1>
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              className="text-gray-400 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              The page you're looking for doesn't exist or has been moved.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <AnimatedButton to="/" glowColor="rgba(250, 204, 21, 0.5)">
                <Home className="h-5 w-5 mr-2" />
                Return to Home
              </AnimatedButton>
              
              <motion.a
                href="tel:+447470856699"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5" />
                <span>Call Us</span>
              </motion.a>
            </motion.div>
            
            <motion.div
              className="mt-12 pt-8 border-t border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Book Now', path: '/book' },
                  { name: 'Pricing', path: '/pricing' },
                  { name: 'Airport Transfers', path: '/airport-transfers' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
