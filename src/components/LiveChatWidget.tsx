import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock } from 'lucide-react';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    // Hide tooltip after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleChatOpen = () => {
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    setIsOpen(false);
    setShowTooltip(false);
  };

  if (dismissed) return null;

  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in booking a taxi. Can you help me?"
  );

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-lg shadow-xl p-4 border border-gray-100"
            >
              <div className="relative">
                <p className="text-sm text-gray-700 font-medium">
                  Need help? Chat with us on WhatsApp!
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Usually responds in minutes</span>
                </div>
                {/* Arrow */}
                <div className="absolute -bottom-6 right-4 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Drive Taxi</h4>
                      <div className="flex items-center text-sm text-green-100">
                        <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse" />
                        Online
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-4 bg-gray-50">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                  <p className="text-gray-700 text-sm">
                    Hello! 👋 How can we help you today? We're available for quick quotes, bookings, and any questions about our taxi service.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Typically replies in minutes
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mb-4">
                  <a
                    href={`https://wa.me/447470856699?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start WhatsApp Chat
                  </a>
                  <a
                    href="tel:+447470856699"
                    className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call: 07470 856699
                  </a>
                </div>

                {/* Quick Questions */}
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/447470856699?text=${encodeURIComponent("Hi! What's the price from St Andrews to Edinburgh Airport?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Edinburgh Airport price?
                    </a>
                    <a
                      href={`https://wa.me/447470856699?text=${encodeURIComponent("Hi! I need a taxi urgently. Are you available?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Urgent booking
                    </a>
                    <a
                      href={`https://wa.me/447470856699?text=${encodeURIComponent("Hi! Do you offer student discounts?")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 px-3 py-1.5 rounded-full transition-colors"
                    >
                      Student discount
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button + Dismiss X */}
        <div className="relative">
          {/* Small X to dismiss entirely */}
          {!isOpen && (
            <motion.button
              onClick={handleDismiss}
              className="absolute -top-1 -right-1 z-10 w-5 h-5 bg-gray-600 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6 }}
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        <motion.button
          onClick={handleChatOpen}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isOpen ? 'bg-gray-700 hover:bg-gray-800' : 'bg-green-500 hover:bg-green-600'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            !isOpen
              ? {
                  y: [0, -5, 0],
                }
              : {}
          }
          transition={
            !isOpen
              ? {
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
              : {}
          }
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </div>
    </>
  );
}
