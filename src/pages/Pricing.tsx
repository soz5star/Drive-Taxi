import { motion } from 'framer-motion';
import { Clock, MapPin, AlertCircle, GraduationCap } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedLink from '../components/AnimatedLink';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import PriceCalculator from '../components/PriceCalculator';

export default function Pricing() {
  const routes = [
    {
      category: 'St Andrews ↔ Edinburgh Airport',
      journeys: [
        { from: 'St Andrews', to: 'Edinburgh Airport', time: '80 mins', price: '£120' },
        { from: 'Edinburgh Airport', to: 'St Andrews', time: '80 mins', price: '£130' },
      ],
    },
    {
      category: 'St Andrews ↔ Dundee Airport',
      journeys: [
        { from: 'St Andrews', to: 'Dundee Airport', time: '30 mins', price: '£50' },
        { from: 'Dundee Airport', to: 'St Andrews', time: '30 mins', price: '£50' },
      ],
    },
    {
      category: 'Dundee ↔ Edinburgh Airport',
      journeys: [
        { from: 'Dundee', to: 'Edinburgh Airport', time: '80 mins', price: '£130' },
        { from: 'Edinburgh Airport', to: 'Dundee', time: '80 mins', price: '£140' },
      ],
    },
    {
      category: 'Dundee ↔ Glasgow Airport',
      journeys: [
        { from: 'Dundee', to: 'Glasgow Airport', time: '120 mins', price: '£190' },
        { from: 'Glasgow Airport', to: 'Dundee', time: '120 mins', price: '£170' },
      ],
    },
  ];

  return (
    <div>
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
              Pricing Estimates
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Transparent, competitive pricing for airport transfers and long-distance journeys
            </motion.p>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="py-4 bg-yellow-400">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex items-center justify-center space-x-3 text-black"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <AlertCircle className="h-6 w-6" />
              </motion.div>
              <p className="text-lg font-semibold text-center">
                All prices are estimates. Final prices are confirmed at booking and may vary based on time, distance, stops, and demand.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <PriceCalculator />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {routes.map((route, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="overflow-hidden p-0 border border-gray-200 shadow-sm">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold">{route.category}</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {route.journeys.map((journey, jIndex) => (
                      <motion.div
                        key={jIndex}
                        className="p-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: jIndex * 0.1 }}
                      >
                        <div className="grid md:grid-cols-4 gap-4 items-center">
                          <div className="md:col-span-2">
                            <div className="flex items-center space-x-3">
                              <motion.div whileHover={{ scale: 1.2, rotate: 15 }} transition={{ duration: 0.3 }}>
                                <MapPin className="h-5 w-5 text-yellow-400" />
                              </motion.div>
                              <div>
                                <p className="font-semibold text-lg">{journey.from}</p>
                                <p className="text-gray-500 text-sm">to {journey.to}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                              <Clock className="h-5 w-5" />
                            </motion.div>
                            <span>{journey.time}</span>
                          </div>
                          <div className="text-right md:text-left">
                            <motion.p
                              className="text-3xl font-bold text-yellow-400"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {journey.price}
                            </motion.p>
                            <p className="text-sm text-gray-500">estimated</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedCard delay={0.5} className="mt-12 bg-yellow-50 border-2 border-yellow-400 p-8" hoverEffect={false}>
              <div className="flex items-start space-x-4">
                <motion.div whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.6 }}>
                  <GraduationCap className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Student Discount</h3>
                  <p className="text-gray-700 text-lg mb-2">
                    Students receive <strong>10% off these estimated fares</strong> with valid student ID.
                  </p>
                  <AnimatedLink to="/student-discount" className="text-yellow-600 font-semibold hover:text-yellow-700">
                    Learn more about student discounts →
                  </AnimatedLink>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.6} className="mt-12 bg-gray-50 p-8 border border-gray-100" hoverEffect={false}>
              <h3 className="text-2xl font-bold mb-6 text-center">Pricing Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h4 className="font-bold mb-3">What's Included:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Door-to-door service</li>
                    <li>• Professional driver</li>
                    <li>• Comfortable vehicle</li>
                    <li>• Standard luggage allowance</li>
                    <li>• Meet and greet for airport pickups</li>
                    <li>• Flight tracking</li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h4 className="font-bold mb-3">Price Variations:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Time of day (peak hours)</li>
                    <li>• Additional stops en route</li>
                    <li>• Extra waiting time</li>
                    <li>• Seasonal demand</li>
                    <li>• Custom routes</li>
                    <li>• Special requirements</li>
                  </ul>
                </motion.div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.7} className="mt-8 p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Need a Custom Quote?</h3>
              <p className="text-gray-600 mb-6">
                For routes not listed, multiple stops, or special requirements, please request a personalized quote. We service all of Scotland.
              </p>
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Get a Custom Quote
              </AnimatedButton>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-6">
                Ready to Book?
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-gray-300 mb-8">
                Pre-book your journey and get your final price confirmed
              </p>
            </AnimatedSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Book Your Journey
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
