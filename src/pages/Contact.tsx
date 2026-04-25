import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div>
      <SEO
        title="Contact Drive Taxi St Andrews | Book Airport Transfer"
        description="Contact Drive Taxi for airport transfers, local journeys & student discounts. WhatsApp, phone, or email. 24/7 service. Call 07470 856699"
        canonical="https://drivetaxi.co.uk/contact"
        keywords="contact St Andrews taxi, book airport transfer, taxi phone number, WhatsApp taxi booking"
      />
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
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Get in touch to book your journey or ask any questions
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <AnimatedCard delay={0} className="p-8 group cursor-pointer border border-gray-200 shadow-sm" hoverEffect={true}>
                <a href="tel:+447470856699" className="block">
                  <motion.div
                    className="bg-yellow-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Phone className="h-8 w-8 text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-3">Speak directly with our team</p>
                  <p className="text-2xl font-bold text-yellow-400">07470 856699</p>
                </a>
              </AnimatedCard>

              <AnimatedCard delay={0.1} className="p-8 group cursor-pointer border border-gray-200 shadow-sm" hoverEffect={true}>
                <a href="https://wa.me/447470856699" className="block">
                  <motion.div
                    className="bg-yellow-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MessageCircle className="h-8 w-8 text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
                  <p className="text-gray-600 mb-3">Message us anytime</p>
                  <p className="text-xl font-bold text-yellow-400">Send Message</p>
                </a>
              </AnimatedCard>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <AnimatedCard delay={0.2} className="p-8 group cursor-pointer border border-gray-200 shadow-sm" hoverEffect={true}>
                <a href="mailto:haje2065@gmail.com" className="block">
                  <motion.div
                    className="bg-yellow-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mail className="h-8 w-8 text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Email</h3>
                  <p className="text-gray-600 mb-3">Send us your enquiry</p>
                  <p className="text-lg font-semibold text-yellow-400">haje2065@gmail.com</p>
                </a>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="p-8 bg-gray-50 border border-gray-100" hoverEffect={false}>
                <motion.div
                  className="bg-yellow-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Clock className="h-8 w-8 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Availability</h3>
                <p className="text-gray-600 mb-3">Service hours</p>
                <p className="text-lg font-semibold">24/7 by Advance Booking</p>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.4} className="bg-yellow-50 border-2 border-yellow-400 p-8 mb-12" hoverEffect={false}>
              <h3 className="text-2xl font-bold mb-4 text-center">Prefer to Book Online?</h3>
              <p className="text-center text-gray-700 mb-6">
                Fill out our booking form and we'll get back to you with a confirmed quote
              </p>
              <div className="text-center">
                <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                  Book Online
                </AnimatedButton>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.5} className="p-8 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-4 mb-6">
                <motion.div whileHover={{ scale: 1.2, y: -5 }} transition={{ duration: 0.3 }}>
                  <MapPin className="h-8 w-8 text-yellow-400 flex-shrink-0" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Service Areas</h3>
                  <p className="text-gray-600">
                    We provide taxi and airport transfer services throughout Fife and across Scotland
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Main Locations', items: ['St Andrews', 'Leuchars', 'Dundee', 'Fife Region'] },
                  { title: 'Airport Services', items: ['Edinburgh Airport', 'Glasgow Airport', 'Dundee Airport', 'Aberdeen Airport'] },
                  { title: 'Train Stations', items: ['Leuchars Station', 'Dundee Station', 'Edinburgh Waverley', 'Glasgow Central'] }
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <h4 className="font-bold mb-3">{section.title}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {section.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="space-y-6">
              {[
                { q: 'How far in advance should I book?', a: 'We recommend booking as early as possible, especially for airport transfers and early morning journeys. However, we accept bookings at any time subject to availability.' },
                { q: 'Do you track flights for airport pickups?', a: 'Yes, we track all incoming flights to ensure we\'re there when you land, even if your flight is delayed.' },
                { q: 'What payment methods do you accept?', a: 'We accept cash and all major cards. Payment details will be confirmed when you book.' },
                { q: 'Are your vehicles suitable for luggage?', a: 'Yes, all our vehicles have ample space for passengers and luggage. Please let us know your luggage requirements when booking.' },
                { q: 'How does the student discount work?', a: 'Students receive 10% off with valid student ID. Simply mention you\'re a student when booking and show your ID at pickup.' }
              ].map((faq, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="bg-gray-900 p-6" hoverEffect={false}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                    <p className="text-gray-300">{faq.a}</p>
                  </motion.div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
