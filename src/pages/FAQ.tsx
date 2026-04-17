import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Booking',
    question: 'How do I book a taxi?',
    answer: 'You can book through our website booking form, call us directly at 07470 856699, or message us on WhatsApp. For airport transfers, we recommend booking at least 24 hours in advance to guarantee availability.'
  },
  {
    category: 'Booking',
    question: 'Can I book for someone else?',
    answer: 'Yes, absolutely. Just provide the passenger\'s name and contact details when booking. We\'ll send all confirmations to your email, and the driver will have the passenger\'s details.'
  },
  {
    category: 'Booking',
    question: 'Do you accept last-minute bookings?',
    answer: 'We try to accommodate last-minute bookings when possible, but availability isn\'t guaranteed. For airport transfers and early morning journeys, advance booking is strongly recommended.'
  },
  {
    category: 'Pricing & Payment',
    question: 'Are your prices fixed or estimates?',
    answer: 'Prices on our website are estimates based on standard routes. Your final quote may vary depending on specific pickup/dropoff locations, time of day, additional stops, waiting time, and seasonal demand. You\'ll receive a confirmed price before booking.'
  },
  {
    category: 'Pricing & Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, card payments in the vehicle, and bank transfers. For corporate accounts, we offer invoice payment terms. Please let us know your preferred payment method when booking.'
  },
  {
    category: 'Pricing & Payment',
    question: 'Do you offer student discounts?',
    answer: 'Yes! Students with valid ID receive 10% off our standard fares. Just mention you\'re a student when booking and show your student ID to the driver.'
  },
  {
    category: 'Airport Transfers',
    question: 'What happens if my flight is delayed?',
    answer: 'We monitor flight arrivals in real-time. If your flight is delayed, we\'ll adjust your pickup time accordingly at no extra charge for delays up to 1 hour. For longer delays, please contact us as soon as possible.'
  },
  {
    category: 'Airport Transfers',
    question: 'Where will I meet my driver at the airport?',
    answer: 'Your driver will meet you in the arrivals hall with a name board. For Edinburgh Airport, this is usually near the main exit. For Glasgow and Dundee airports, we\'ll confirm the specific meeting point when you book. We also offer a meet-and-greet service where the driver will help with luggage.'
  },
  {
    category: 'Airport Transfers',
    question: 'How much luggage can I bring?',
    answer: 'Our standard vehicle comfortably fits 3-4 large suitcases plus hand luggage. If you have excess luggage or large items (golf bags, skis, etc.), please let us know when booking so we can arrange appropriate transport.'
  },
  {
    category: 'Services',
    question: 'Do you provide child seats?',
    answer: 'Yes, child seats are available on request at no extra charge. Please specify the age/weight of your child when booking so we can provide the appropriate seat.'
  },
  {
    category: 'Services',
    question: 'Can I bring pets?',
    answer: 'Yes, we welcome well-behaved pets. Please mention this when booking so we can prepare the vehicle. Pet carriers are recommended for smaller animals.'
  },
  {
    category: 'Services',
    question: 'Do you do long-distance journeys beyond Scotland?',
    answer: 'Yes, we provide long-distance taxi services throughout the UK. Popular destinations include Newcastle, Manchester, and London. Contact us for a custom quote.'
  },
  {
    category: 'Services',
    question: 'Can I make multiple stops?',
    answer: 'Yes, multiple stops are possible. Additional charges may apply depending on distance and time. Let us know your full itinerary when booking for an accurate quote.'
  },
  {
    category: 'Cancellations',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made more than 24 hours before pickup are fully refundable. Cancellations within 24 hours may incur a charge depending on the circumstances. No-shows without notice will be charged the full fare.'
  },
  {
    category: 'Cancellations',
    question: 'Can I modify my booking?',
    answer: 'Yes, you can modify your booking time or destination. Please contact us as soon as possible. Changes made less than 4 hours before pickup may not be possible depending on availability.'
  }
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFAQs = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <div>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Everything you need to know about our taxi service
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Filter */}
            <AnimatedSection>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    activeCategory === 'All'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      activeCategory === category
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={`${activeCategory}-${index}`}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0">
                          <div className="pl-8 border-l-2 border-yellow-400">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Still Have Questions */}
            <motion.div
              className="mt-12 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                Can\'t find the answer you\'re looking for? Reach out to us directly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton href="tel:+447470856699" variant="secondary">
                  Call: 07470 856699
                </AnimatedButton>
                <AnimatedButton href="https://wa.me/447470856699" variant="secondary">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
