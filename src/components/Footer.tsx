import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowUp, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const linkHoverVariants = {
    hover: {
      x: 5,
      color: '#FACC15',
      transition: { duration: 0.2 }
    }
  };

  const quickLinks = [
    { name: 'Book Now', path: '/book' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Airport Transfers', path: '/airport-transfers' },
    { name: 'Student Discount', path: '/student-discount' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceAreas = [
    'St Andrews',
    'Leuchars Train Station',
    'Dundee',
    'Edinburgh Airport',
    'Glasgow Airport',
    'Dundee Airport',
    'Across Scotland'
  ];

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-block mb-6">
              <motion.h3 
                className="text-2xl font-bold"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-yellow-400">Drive</span> Taxi
              </motion.h3>
            </Link>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Airport Transfers & Taxi Services serving St Andrews, Fife, and across Scotland.
            </p>
            <motion.div
              className="inline-block bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-4 py-2"
              whileHover={{ scale: 1.05, borderColor: 'rgba(250, 204, 21, 0.6)' }}
            >
              <p className="text-yellow-400 font-semibold text-sm">
                10% Student Discount Available
              </p>
            </motion.div>
            <p className="text-gray-500 text-xs mt-4">
              Pre-Booked • Reliable • Professional
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-6 text-lg relative inline-block">
              Quick Links
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.div
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm flex items-center group"
                    >
                      <motion.span
                        className="w-0 h-0.5 bg-yellow-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"
                      />
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-6 text-lg relative inline-block">
              Service Areas
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area, index) => (
                <motion.li
                  key={area}
                  className="text-gray-400 text-sm flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ x: 5, color: '#9CA3AF' }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 bg-yellow-400/50 rounded-full mr-2"
                    whileHover={{ scale: 1.5, backgroundColor: '#FACC15' }}
                  />
                  {area}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-6 text-lg relative inline-block">
              Contact Us
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
            </h4>
            <ul className="space-y-4">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="tel:+447470856699"
                  className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors group"
                >
                  <motion.div
                    className="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Phone className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  <span className="text-sm font-medium">07470 856699</span>
                </a>
              </motion.li>
              
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="https://wa.me/447470856699"
                  className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors group"
                >
                  <motion.div
                    className="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <MessageCircle className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </motion.li>
              
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href="mailto:haje2065@gmail.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors group"
                >
                  <motion.div
                    className="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                  <span className="text-sm font-medium">Email Us</span>
                </a>
              </motion.li>
              
              <motion.li className="flex items-start space-x-3 text-gray-400">
                <motion.div
                  className="w-10 h-10 bg-yellow-400/10 rounded-lg flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <MapPin className="h-5 w-5 text-yellow-400" />
                </motion.div>
                <span className="text-sm">
                  St Andrews, Fife<br />Scotland
                </span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 pt-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © {new Date().getFullYear()} Drive Taxi. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500 inline" fill="currentColor" />
            </motion.span>
            in St Andrews
          </p>
          
          <p className="text-sm text-gray-500">
            Available 24/7 by advance booking
          </p>
          
          <Link
            to="/admin/login"
            className="text-xs text-gray-700 hover:text-gray-500 transition-colors"
          >
            Admin
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-400 text-black rounded-full shadow-lg flex items-center justify-center z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)'
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </footer>
  );
}
