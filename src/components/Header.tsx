import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Airport Transfers', path: '/airport-transfers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Student Discount', path: '/student-discount' },
    { name: 'Book Now', path: '/book' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      className={`bg-black text-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-2xl backdrop-blur-sm bg-black/95' : 'shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              className="bg-yellow-400 p-2 rounded"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Phone className="h-6 w-6 text-black" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold">Drive Taxi</h1>
              <p className="text-xs text-gray-400">St Andrews & Fife</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-yellow-400 text-black font-semibold'
                      : 'text-white hover:bg-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.a
            href="tel:+447470856699"
            className="hidden lg:flex items-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="h-5 w-5" />
            <span>Call Now</span>
          </motion.a>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="lg:hidden pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-yellow-400 text-black font-semibold'
                        : 'text-white hover:bg-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="tel:+447470856699"
                className="flex items-center justify-center space-x-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.05 }}
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </motion.a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
