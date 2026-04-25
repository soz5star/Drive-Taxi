import type { Variants } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform header background opacity based on scroll
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.98)']
  );
  
  // Scroll progress bar - computed at component level
  const scrollProgress = useTransform(
    scrollY,
    [0, typeof window !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 1000],
    [0, 1]
  );

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Airport Transfers', path: '/airport-transfers' },
    { name: 'To Edinburgh Airport', path: '/st-andrews-to-edinburgh-airport' },
    { name: 'To Glasgow Airport', path: '/st-andrews-to-glasgow-airport' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Student Discount', path: '/student-discount' },
    { name: 'Leuchars Taxi', path: '/leuchars-taxi' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Book Now', path: '/book' },
    { name: 'Contact', path: '/contact' },
  ];

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number): { opacity: number; y: number; transition: { delay: number; duration: number; ease: readonly [number, number, number, number] } } => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    })
  };

  const mobileMenuVariants: Variants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <motion.header
      className={`text-white sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'shadow-2xl backdrop-blur-md' : 'shadow-lg'
      }`}
      style={{ backgroundColor: headerBg }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="bg-yellow-400 p-2 rounded-lg relative overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Shimmer effect on logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Phone className="h-6 w-6 text-black relative z-10" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-yellow-400">Drive</span> Taxi
              </motion.h1>
              <motion.p 
                className="text-xs text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                St Andrews & Fife
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.path}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-black font-semibold'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {/* Active background */}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute inset-0 bg-yellow-400 rounded-lg -z-10"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover underline */}
                  {!isActive(item.path) && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-yellow-400 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '80%' }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.a
            href="tel:+447470856699"
            className="hidden lg:flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Phone className="h-5 w-5" />
            </motion.div>
            <span className="relative z-10">Call Now</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="lg:hidden pb-6 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="space-y-1">
                {navigation.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={mobileItemVariants}
                  >
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-yellow-400 text-black font-semibold'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <motion.span
                        className="flex items-center justify-between"
                        whileHover={{ x: 5 }}
                      >
                        {item.name}
                        {isActive(item.path) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-black rounded-full"
                          />
                        )}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.a
                href="tel:+447470856699"
                className="flex items-center justify-center space-x-2 bg-yellow-400 text-black px-6 py-4 rounded-lg font-semibold mt-4"
                variants={mobileItemVariants}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Phone className="h-5 w-5" />
                </motion.div>
                <span>Call Now: 07470 856699</span>
              </motion.a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
        style={{
          scaleX: scrollProgress,
          transformOrigin: 'left'
        }}
      />
    </motion.header>
  );
}
