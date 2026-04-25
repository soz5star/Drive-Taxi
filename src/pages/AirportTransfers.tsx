import { motion } from 'framer-motion';
import { Plane, Clock, Shield, MapPin, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import SEO from '../components/SEO';

export default function AirportTransfers() {
  const airports = [
    {
      name: 'Edinburgh Airport',
      distance: 'From St Andrews',
      time: '80 minutes',
      description: 'Most popular route for international and domestic flights',
    },
    {
      name: 'Glasgow Airport',
      distance: 'From St Andrews',
      time: '120 minutes',
      description: 'Major international hub with extensive connections',
    },
    {
      name: 'Dundee Airport',
      distance: 'From St Andrews',
      time: '30 minutes',
      description: 'Convenient local airport for select destinations',
    },
  ];

  const features = [
    'Flight tracking for arrival pickups',
    'Meet and greet service',
    'Spacious vehicles for luggage',
    'Professional, licensed drivers',
    'Child seats available on request',
    'Fixed pricing confirmed at booking',
  ];

  return (
    <div>
      <SEO
        title="Airport Transfers St Andrews | Edinburgh & Glasgow | Drive Taxi"
        description="Reliable airport transfers from St Andrews to Edinburgh, Glasgow & Dundee airports. Flight tracking, meet & greet, 24/7 service. Book now: 07470 856699"
        canonical="https://drivetaxi.co.uk/airport-transfers"
        keywords="St Andrews airport transfer, Edinburgh airport taxi, Glasgow airport transfer, Dundee airport taxi, airport taxi Fife"
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
              Airport Transfer Services
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Reliable, punctual airport transfers from St Andrews, Leuchars, and Dundee to all major Scottish airports
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Book Your Transfer
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Airport Transfer Service?</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Clock, title: 'Punctual & Reliable', text: 'We understand the importance of catching your flight. Our drivers arrive early and track your flight for pickups.' },
                { icon: Shield, title: 'Professional Service', text: 'Fully licensed, experienced drivers committed to providing safe, comfortable journeys.' },
                { icon: Plane, title: 'Early Morning Specialists', text: 'Catch those early flights with confidence. We specialize in early morning airport transfers.' },
                { icon: MapPin, title: 'Door-to-Door Service', text: 'We pick you up from your exact location and drop you at your terminal or destination.' }
              ].map((item, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="p-6 border border-gray-200 shadow-sm">
                  <motion.div
                    className="bg-yellow-400 p-3 rounded-lg flex-shrink-0 inline-block mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="h-6 w-6 text-black" />
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedCard delay={0.5} className="bg-gray-50 p-8 border border-gray-100" hoverEffect={false}>
              <h3 className="font-bold text-xl mb-4">Service Includes:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.4 }}>
                      <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-8 text-center">Popular Airport Routes</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {airports.map((airport, index) => (
                <AnimatedCard key={index} delay={index * 0.1} className="p-6 border border-gray-200 shadow-sm">
                  <motion.div
                    className="bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Plane className="h-6 w-6 text-black" />
                  </motion.div>
                  <h3 className="font-bold text-xl mb-2">{airport.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{airport.distance}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4" />
                    <span>{airport.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{airport.description}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-8 text-center">From & To</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatedCard delay={0.2} className="p-6 bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-xl mb-4">Pickup Locations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>St Andrews (all areas)</li>
                  <li>Leuchars Train Station</li>
                  <li>Dundee (all areas)</li>
                  <li>Surrounding Fife villages</li>
                  <li>Custom pickup locations</li>
                </ul>
              </AnimatedCard>

              <AnimatedCard delay={0.3} className="p-6 bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-xl mb-4">Airport Destinations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Edinburgh Airport (EDI)</li>
                  <li>Glasgow Airport (GLA)</li>
                  <li>Glasgow Prestwick (PIK)</li>
                  <li>Dundee Airport (DND)</li>
                  <li>Aberdeen Airport (ABZ)</li>
                  <li>Other Scottish airports</li>
                </ul>
              </AnimatedCard>
            </div>
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
                Book Your Airport Transfer Today
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-gray-300 mb-8">
                Advance booking recommended, especially for early morning flights
              </p>
            </AnimatedSection>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AnimatedButton to="/book" glowColor="rgba(250, 204, 21, 0.5)">
                Book Now
              </AnimatedButton>
              <AnimatedButton to="/pricing" variant="outline" glowColor="rgba(250, 204, 21, 0.3)">
                View Pricing
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
