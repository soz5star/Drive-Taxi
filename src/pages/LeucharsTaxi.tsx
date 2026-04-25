import { motion } from 'framer-motion';
import { Train, Clock, MapPin, CheckCircle, Phone, ArrowRight, Users, Luggage } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCard from '../components/AnimatedCard';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedBackground3D from '../components/AnimatedBackground3D';
import ParticleBackground from '../components/ParticleBackground';
import SEO from '../components/SEO';

export default function LeucharsTaxi() {
  const features = [
    { icon: Clock, text: '5 min from St Andrews' },
    { icon: Train, text: 'Train station pickup' },
    { icon: Luggage, text: 'Help with luggage' },
    { icon: Users, text: 'Meet arriving guests' },
  ];

  const destinations = [
    { name: 'St Andrews', price: '£15', time: '10 mins' },
    { name: 'Dundee', price: '£35', time: '20 mins' },
    { name: 'Edinburgh Airport', price: '£110', time: '75 mins' },
    { name: 'Glasgow Airport', price: '£180', time: '110 mins' },
  ];

  const faqs = [
    {
      q: 'Where is Leuchars Station?',
      a: 'Leuchars railway station is located just 5 miles from St Andrews, serving as the main train station for the town.'
    },
    {
      q: 'How much is a taxi from Leuchars to St Andrews?',
      a: 'A taxi from Leuchars Station to St Andrews town centre is £15. We meet you at the station with a name board.'
    },
    {
      q: 'Do you meet trains from London?',
      a: 'Yes, we monitor train arrivals and adjust pickup times for delays. Perfect for the LNER service from London Kings Cross.'
    },
  ];

  return (
    <div>
      <SEO
        title="Leuchars Station Taxi | St Andrews Train Transfer | £15"
        description="Taxi from Leuchars Station to St Andrews £15, 10 minutes. We meet all trains, help with luggage. Book: 07470 856699"
        canonical="https://drivetaxi.co.uk/leuchars-taxi"
        keywords="Leuchars taxi, Leuchars station transfer, St Andrews train station, Leuchars to St Andrews, train station taxi Fife"
      />
      
      <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 md:py-24 relative overflow-hidden">
        <ParticleBackground />
        <AnimatedBackground3D />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              St Andrews' Local Station
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Leuchars Station <span className="text-yellow-400">Taxi Service</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              We meet every train. Just £15 to St Andrews. Train monitored for delays.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton to="/book?pickup=Leuchars%20Station&dropoff=St%20Andrews">
                Book Station Pickup
              </AnimatedButton>
              <AnimatedButton href="tel:+447470856699" variant="secondary">
                <Phone className="w-5 h-5 mr-2" />
                Call 07470 856699
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose Our Leuchars Station Service?
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <AnimatedCard key={i} delay={i * 0.1} className="p-6 text-center">
                  <div className="bg-yellow-400 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-black" />
                  </div>
                  <p className="font-semibold">{feature.text}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations from Leuchars</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {destinations.map((dest, i) => (
                <AnimatedCard key={i} delay={i * 0.1} className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{dest.name}</h3>
                    <p className="text-gray-600">{dest.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-400">{dest.price}</p>
                    <AnimatedButton 
                      to={`/book?pickup=Leuchars%20Station&dropoff=${encodeURIComponent(dest.name)}`}
                      className="text-sm mt-2"
                    >
                      Book
                    </AnimatedButton>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <AnimatedCard key={i} delay={i * 0.1} className="p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Airport Transfers</h2>
            <p className="text-gray-600 mb-8">
              Catching a train to Leuchars and need an airport transfer? We can take you directly 
              from the station to any Scottish airport.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedButton to="/st-andrews-to-edinburgh-airport" variant="outline">
                Edinburgh Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
              <AnimatedButton to="/st-andrews-to-glasgow-airport" variant="outline">
                Glasgow Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
              <AnimatedButton to="/st-andrews-to-dundee-airport" variant="outline">
                Dundee Airport
                <ArrowRight className="w-4 h-4 ml-2" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
